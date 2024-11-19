from django.db.models import Max
from django.conf import settings

from assessments.models import Assessment, AnswerSheet, RecognitionBatch, AnswerSheetZip
from assessments.helpers import AssessmentHelper, AnswerSheetHelper

from assessments.services.assessment_cv_service import AssessmentCVService
from assessments.services.base_assessment_service import BaseAssessmentService

from assessments.utils import get_storage

from users.models import Student

from ..answer_sheet_file_service import AnswerSheetFileService


class CustomAnswerSheetService(BaseAssessmentService):
    @classmethod
    def get_result_answer_sheet(cls, assessment, answer_sheet_id, data):
        if assessment:
            if data["success"]:
                params = {
                    "document_file": data["url"],
                    "named_page_count": data["named_page_count"],
                    "unnamed_page_count": data["unnamed_page_count"],
                    "coordinate_id": data["named_coordinates_id"],
                    "unnamed_coordinate_id": data["unnamed_coordinates_id"],
                }

                answer_sheet = AnswerSheet.objects.filter(id=answer_sheet_id).first()
                cls._update(answer_sheet, params)

                user = assessment.group.user
                accuracy_tips = AnswerSheetZip.objects.filter(kind=AnswerSheetZip.CUSTOM, user=user).first()
                if not accuracy_tips:
                    name = "{} - {}.zip".format(assessment.group.name, assessment.name)
                    document = AnswerSheetFileService.generate_accuracy_tips_zip_file(
                        name,
                        answer_sheet.document_url if answer_sheet else None,
                        cls._get_accuracy_tips_file_url(),
                    )
                    cls._create("zip", {"document": document, "kind": AnswerSheetZip.CUSTOM, "user": user})
            else:
                AnswerSheet.objects.filter(id=answer_sheet_id).delete()
            status = cls._get_assessment_status(assessment, data["success"])
            cls._update(assessment, {"status": status})

    @classmethod
    def generate_answer_sheet(cls, assessment, data):
        answer_sheet_data = cls._get_data_for_generate_answer_sheet(assessment, data["answer_sheet_id"], False)
        answer_sheet_data.update({"amount_of_empty": data["amount_of_empty"]})
        cls._update(assessment, {"status": "generating"})

        AssessmentCVService.generate_answer_sheet(answer_sheet_data)

    @classmethod
    def preview_answer_sheet(cls, assessment):
        answer_sheet = cls._create("answer_sheet", {})
        answer_sheet.assessments.add(assessment)

        answer_sheet_data = cls._get_data_for_generate_answer_sheet(assessment, answer_sheet.id, True)
        response_data, status_code = AssessmentCVService.preview_answer_sheet(answer_sheet_data)

        url = response_data.get("url", None)
        return cls._update(answer_sheet, {"preview_document_file": url})

    @classmethod
    def check_answer_sheet(cls, assessment):
        answer_sheet = cls._filter("answer_sheet", {
            "assessments__id": assessment.id, "document_file__isnull": True, "kind": AnswerSheet.CUSTOM,
        }).exclude(preview_document_file__isnull=True).last()

        if answer_sheet:
            answer_sheet_data = cls._get_data_for_generate_answer_sheet(assessment, answer_sheet.id, True)
            response_data, status_code = AssessmentCVService.preview_answer_sheet(answer_sheet_data)

            url = response_data.get("url", None)
            AnswerSheet.objects.filter(id=answer_sheet.id).update(preview_document_file=url)

    @classmethod
    def _get_data_for_generate_answer_sheet(cls, assessment, answer_sheet_id, is_preview):
        group = assessment.group
        data = {
            "amount_of_empty": 0,
            "assessment": {
                "id": assessment.id,
                "kind": assessment.kind,
                "name": assessment.name,
                "answer_sheet_id": answer_sheet_id,
            },
            "class_name": group.name,
            "questions": cls._get_questions_for_generate_answer_sheet(assessment.id),
        }

        key = "student" if is_preview else "students"
        data.update({key: AnswerSheetHelper.get_students(group.id, is_preview)})

        return data

    @classmethod
    def _get_questions_for_generate_answer_sheet(cls, assessment_id):
        assessment_items = cls._filter("item", {"assessment_id": assessment_id}).order_by("created_at").values()
        answers = cls._filter("answer", {"assessment_item_id__in": cls._get_ids(assessment_items)}).values()

        questions = []
        for item in assessment_items:
            answers_for_item = cls._filter_data_by_id("assessment_item_id", item["id"], answers)
            kind = AnswerSheetHelper.get_answer_kind(item)

            if kind == "mc":
                body = {"width": 0, "height": 0, "kind": kind}
            else:
                widths, heights = AnswerSheetHelper.get_answer_params(answers_for_item, kind, item.get("setting", []))
                body = {"width": max(widths), "height": max(heights), "kind": kind}
            questions.append(body)
        return questions

    @classmethod
    def _get_assessment_status(cls, assessment, success):
        if assessment.status == Assessment.GENERATING and success:
            return "ready_for_download"
        batches = RecognitionBatch.manager.filter(assessment_id=assessment.id).all()
        return AssessmentHelper.get_prev_assessment_status(assessment.id, batches)

    @staticmethod
    def _get_accuracy_tips_file_url():
        file_name, storage = settings.ACCURACY_TIPS_FILE_NAME, get_storage()
        if storage.exists(file_name):
            return storage.url(file_name)
        return None

    @classmethod
    def prepare_to_regeneration_after_changing_assessment(cls, assessment):
        answer_sheet = AnswerSheet.objects.filter(assessments=assessment).last()
        if answer_sheet and not answer_sheet.changed and assessment.updated_at > answer_sheet.created_at:
            answer_sheet.changed = True
            answer_sheet.save()

    @classmethod
    def prepare_to_regeneration_after_changing_students(cls, group_id, student_id):
        student = Student.objects.filter(group__id=group_id).order_by('user__last_name').first()
        if student and student.id == student_id:
            cls.prepare_answer_sheets_to_be_regenerated(group_id)

    @classmethod
    def prepare_answer_sheets_to_be_regenerated(cls, group_id):
        assessments_ids = Assessment.manager.filter(group__id=group_id).values_list('id', flat=True)
        last_answer_sheets_ids = AnswerSheet.objects \
            .filter(assessments__id__in=assessments_ids, kind=AnswerSheet.CUSTOM) \
            .values('assessments').annotate(id=Max('id')).values_list('id')

        AnswerSheet.objects \
            .filter(id__in=last_answer_sheets_ids, changed=False) \
            .update(changed=True)
