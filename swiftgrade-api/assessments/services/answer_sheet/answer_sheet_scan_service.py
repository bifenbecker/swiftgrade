from assessments.models import Assessment, AnswerSheetScan, AssessmentResult, CompletedAssessment
from assessments.models.recognition_batch import RecognitionBatch as RB

from assessments.services.assessment_cv_service import AssessmentCVService
from assessments.services.base_assessment_service import BaseAssessmentService

from users.models import Checklist
from users.services.user_checklist_service import UserChecklistService

from rest_framework.status import HTTP_204_NO_CONTENT


class AnswerSheetScanService(BaseAssessmentService):
    @classmethod
    def answer_sheet_item_scan(cls, assessment_id, scan, scan_item):
        scan_id = scan['scan_id']
        student_id = scan['student_id']
        if not scan_id:
            scan.pop('scan_id', None)

            scan = cls._create('scan', scan)
            cls._create_result(assessment_id, scan)
            if student_id:
                CompletedAssessment.manager.create(
                    assessment_id=assessment_id,
                    student_id=student_id,
                    result_id=scan.assessment_result.id,
                )

            scan_id = scan.id

        scan_item.update({'answer_sheet_scan_id': scan_id})
        return cls._create('scan_item', scan_item)

    @classmethod
    def answer_sheet_scan(cls, assessment_id, scans):
        data = []

        scans_ids = [scan.id for scan in scans]
        item_scans = cls._filter("scan_item", {"answer_sheet_scan_id__in": scans_ids})

        for scan in scans:
            answer_sheet, result = scan.answer_sheet, scan.assessment_result
            scan_items = list(filter(lambda i: i.answer_sheet_scan_id == scan.id, item_scans))
            scan_items = sorted(scan_items, key=lambda scan_item: scan_item.page)

            data.append({
                "answer_sheet_scan_id": scan.id,
                "global_id": answer_sheet.coordinate_id if scan.named else answer_sheet.unnamed_coordinate_id,
                "urls": [i.image.url for i in scan_items],
            })

        batch = cls._create_batch(assessment_id, scans)
        response, status_code = AssessmentCVService.scan({'answer_sheet_kind': 'custom', 'scans': data}, batch.id)

        status = Assessment.SCANNING
        if status_code != HTTP_204_NO_CONTENT:
            status = Assessment.SCANNED

            cls._update_status(batch)
            cls._update_incorrect_scans(scans)

        cls._update_assessment_status_by_id(assessment_id, status)
        return response, status_code

    @classmethod
    def generic_answer_sheet_scan(cls, assessment, scans):
        data_for_recognition, data_for_cropping = [], {'answers_count': assessment.assessment_items.count(), 'scans': []}

        for scan in scans:
            answer_sheet_scan_item = scan.scan_items.first()

            global_id = scan.answer_sheet.coordinate_id if scan.named else scan.answer_sheet.unnamed_coordinate_id
            url = answer_sheet_scan_item.image.url if answer_sheet_scan_item else None

            item = {
                'answer_sheet_scan_id': scan.id,
                'global_id': global_id,
                'named': scan.named,
                'url': url
            }
            if not scan.named:
                data_for_recognition.append(item)
            data_for_cropping['scans'].append(item)

        batch = cls._create_batch(assessment.id, scans)
        status = cls._cropping_and_recognition_for_scans(data_for_cropping, data_for_recognition, batch)

        if status in [Assessment.CROPPING, Assessment.SCANNED]:
            batch_status = RB.RECOGNITION_COMPLETED if Assessment.CROPPING else RB.COMPLETED
            cls._update_status(batch, batch_status)
            if status == Assessment.SCANNED:
                cls._update_incorrect_scans(scans)
        return cls._update_status(assessment, status)

    @staticmethod
    def _create_batch(assessment_id, scans):
        batch = RB(assessment_id=assessment_id, status=RB.PROCESSING)
        batch.save()
        batch.scans.set(scans)
        return batch

    @classmethod
    def _create_result(cls, assessment_id, scan):
        result = cls._create('result', {
            'assessment_id': assessment_id,
            'answer_sheet_scan_id': scan.id,
            'status': AssessmentResult.READY_FOR_RECOGNITION
        })
        # add new checklist entry or update existing one to store last created result date
        if result:
            user = Assessment.objects.get(id=assessment_id).group.user
            UserChecklistService.create_or_update(user, Checklist.RESULT_CREATED)

        scan.assessment_result = result
        scan.save()

    @staticmethod
    def _update_incorrect_scans(scans):
        results = []
        for scan in scans:
            if scan.assessment_result:
                result = scan.assessment_result
                result.status = AssessmentResult.RECOGNITION_ERROR
                results.append(result)
        return AssessmentResult.manager.bulk_update(results, ['status'])

    @staticmethod
    def _update_status(obj, status = RB.COMPLETED):
        obj.status = status
        obj.save()

        return obj

    @staticmethod
    def _update_assessment_status_by_id(assessment_id, status):
        Assessment.manager.filter(id=assessment_id).update(status=status)

    @staticmethod
    def delete_answer_sheet_scans_for_student(group_id, students_ids):
        answer_sheet_scans = AnswerSheetScan.manager.filter(
            student_id__in=students_ids,
            assessment_result__assessment__group_id=group_id
        )
        answer_sheet_scans.delete()

    @staticmethod
    def _cropping_and_recognition_for_scans(data_for_cropping, data_for_recognition, batch, status = Assessment.SCANNED):
        response, status_code = AssessmentCVService.cropping_answer_images(data_for_cropping, batch.id)
        if status_code == HTTP_204_NO_CONTENT:
            status = Assessment.CROPPING
            if data_for_recognition:
                response, status_code = AssessmentCVService.generic_scan(data_for_recognition, batch.id)
                status = Assessment.SCANNING if status_code == HTTP_204_NO_CONTENT else Assessment.SCANNED
        return status
