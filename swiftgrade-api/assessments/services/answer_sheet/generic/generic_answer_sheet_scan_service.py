from assessments.models.assessment import Assessment
from assessments.services.answer_sheet.answer_sheet_scan_service import AnswerSheetScanService
from assessments.services.recognition.compare_results_service import CompareResultsService
from assessments.services.recognition.base_parse_batch_service import BaseParseBatchService

from assessments.helpers import AssessmentHelper
from assessments.models import AnswerSheetScan, AssessmentResult
from users.models import Checklist
from users.services.user_checklist_service import UserChecklistService

from decimal import Decimal
from uuid import uuid4

MARK = Decimal("0.00")


class GenericAnswerSheetScanService(AnswerSheetScanService):
    @classmethod
    def create_scans(cls, assessment_id, data):
        scans, results = [], []
        session_id = uuid4().__str__()

        for item in data:
            global_id = item.get('barcode', '')
            scans.append(cls._build_scan(global_id, session_id))
        scans = cls._bulk_create('scan', scans)

        results = [cls._build_result(assessment_id, scan.id) for scan in scans]
        cls._bulk_create('result', results)

        # add new checklist entry or update existing one to store last created result date
        if results:
            user = Assessment.objects.get(id=assessment_id).group.user
            UserChecklistService.create_or_update(user, Checklist.RESULT_CREATED)

        return cls._create_batch(assessment_id, scans), cls._build_generic_data_for_results(data, scans)

    @classmethod
    def _calculate_result(cls, assessment_id, result):
        assessment_items = cls._filter("item", {"assessment_id": assessment_id}).all()
        data = BaseParseBatchService.map_assessment_items(assessment_items)

        mark, total = MARK, MARK
        for item in data:
            answers = item.get("answers", [])
            answer = answers[0] if answers else {}
            marks_of_answer = answer.get("marks", {})
            mark_of_answer, value = marks_of_answer.get("answer", MARK), result.get(item["number"], None)

            if mark_of_answer and value:
                data = CompareResultsService().compare({"answer": value}, item)
                mark += data['marks'][0].get("value", MARK) if data['marks'] else MARK
                total += mark_of_answer
        return AssessmentHelper.get_result(mark, total)

    @classmethod
    def _build_scan(cls, global_id, session_id):
        ids = cls._parse_barcode(global_id)
        scan = {
            'answer_sheet_id': ids['answer_sheet_id'],
            'named': True if ids['student_id'] else False,
            'session_id': session_id,
            'student_id': ids['student_id'],
        }
        return AnswerSheetScan(**scan)

    @classmethod
    def _build_result(cls, assessment_id, scan_id):
        scan = {
            'assessment_id': assessment_id,
            'status': AssessmentResult.PROCESSING,
            'scan_id': scan_id,
        }
        return AssessmentResult(**scan)

    @staticmethod
    def _build_generic_data_for_results(data, scans):
        for item, scan in zip(data, scans):
            item.update({
                'answer_sheet_scan_id': scan.id,
                'global_id': item['barcode'],
                'error': False,
            })
        return data

    @classmethod
    def _parse_barcode(cls, barcode):
        ids = barcode.split('.')

        answer_sheet = cls.__get_item_by_index(ids, 0)
        answer_sheet_id = answer_sheet[1:] if answer_sheet else answer_sheet

        return {
            'answer_sheet_id': answer_sheet_id,
            'student_id': cls.__get_item_by_index(ids, 2),
        }

    @staticmethod
    def __get_item_by_index(data, index):
        try:
            item = data[index]
            return None if item == '0' else item
        except IndexError:
            return None
