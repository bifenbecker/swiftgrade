from api.core.logger.custom_logger import CustomLogger

from assessments.helpers import RecognitionHelper
from assessments.models import Assessment, AnswerSheetScan, AssessmentResult, \
    AssessmentResultItem, AssessmentResultItemMark, RecognitionBatch

from ..answer_sheet.answer_sheet_scan_service import AnswerSheetScanService
from .base_parse_batch_service import BaseParseBatchService
from .compare_results_service import CompareResultsService

from decimal import Decimal

logger = CustomLogger.get_logger(__name__, 'recognition_process.log')


class ParseGenericBatchService(BaseParseBatchService):
    @staticmethod
    def get_batch_status(batch, key='cropping'):
        if batch.status in [RecognitionBatch.RECOGNITION_COMPLETED, RecognitionBatch.CROPPING_COMPLETED]:
            return RecognitionBatch.COMPLETED
        return {
            'cropping': RecognitionBatch.CROPPING_COMPLETED,
            'recognition': RecognitionBatch.RECOGNITION_COMPLETED,
        }[key]

    @classmethod
    def compare_results(cls, assessment, data):
        assessment_items = cls.map_assessment_items(
            assessment.assessment_items.prefetch_related('answer', 'answer__mark').all())

        results_data = {
            'batch_result_items_for_create': [],
            'batch_result_items_marks_for_create': [],
            'results_for_update': [],
            'scans': [],
        }
        for scan_results in data['results']:
            results_data = cls._compare_result(assessment_items, scan_results, results_data)

        assessment = AnswerSheetScanService.generic_answer_sheet_scan(assessment, results_data['scans'])
        if assessment.status == Assessment.SCANNED:
            results_for_update = []
            for result in results_data['results_for_update']:
                result.status = AssessmentResult.RECOGNITION_ERROR
                results_for_update.append(result)
            cls._bulk_update(results_for_update, AssessmentResult, ['status'])
        else:
            cls._create_result_items(
                results_data['batch_result_items_for_create'], results_data['batch_result_items_marks_for_create'])
            cls._bulk_update(results_data['results_for_update'], AssessmentResult, ['mark', 'status'])

    @classmethod
    def _compare_result(cls, assessment_items, scan_results, data):
        scan = AnswerSheetScan.manager.filter(id=scan_results['scan_id']).first()
        mark, result = Decimal('0.00'), scan.assessment_result
        try:
            for number, answer in scan_results['answers'].items():
                assessment_item = cls._get_assessment_item(assessment_items, number)
                if assessment_item:
                    mark, data = cls._calculate_mark(assessment_item, answer, mark, result, data)

            result.mark = mark
            result.status = AssessmentResult.PROCESSING
        except Exception as e:
            cls._log_scan_exception(e, scan)

            # update result status
            result.status = AssessmentResult.RECOGNITION_ERROR

        data['results_for_update'].append(result)
        if result.status != AssessmentResult.RECOGNITION_ERROR:
            data['scans'].append(scan)
        return data

    @classmethod
    def _calculate_mark(cls, assessment_item, answer, mark, result, data):
        compare_data = CompareResultsService().compare({'answer': answer}, assessment_item)

        # build marks for each result item
        item_marks, item_total_mark = cls._build_result_item_marks(compare_data['marks'])
        data['batch_result_items_marks_for_create'].append(item_marks)

        # update mark for result
        mark += item_total_mark

        data['batch_result_items_for_create'].append(
            cls._build_result_item(answer, compare_data['answer_id'], assessment_item['id'], result))

        return mark, data

    @classmethod
    def match_results(cls, batch_id, data):
        batch_result_items_for_update = []
        for scan_results in data:
            scan = AnswerSheetScan.manager.filter(id=scan_results['answer_sheet_scan_id']).first()
            if cls._is_valid_scan(scan):
                try:
                    batch_result_items_for_update += cls._download_images(scan.assessment_result, scan_results['results'])
                except Exception as e:
                    cls._log_scan_exception(e, scan)

        cls._bulk_update(batch_result_items_for_update, AssessmentResultItem, ['image'])

        batch = RecognitionBatch.manager.get(id=batch_id)
        batch_status = cls.get_batch_status(batch)
        cls._update_status(batch, batch_status)

        if batch_status == RecognitionBatch.COMPLETED:
            cls._update_status(batch.assessment, Assessment.SCANNED)
            cls._mark_recognized_results(batch)

    @classmethod
    def match_students(cls, batch_id, data):
        batch_results_for_update, batch_recognized_persons_for_create = [], []
        for scan_results in data:
            scan = AnswerSheetScan.manager.filter(id=scan_results['answer_sheet_scan_id']).first()
            if cls._is_valid_scan(scan):
                try:
                    recognized_person = cls._build_recognized_person(scan_results)
                    recognized_person.assessmentresult = scan.assessment_result
                    batch_recognized_persons_for_create.append(recognized_person)
                except Exception as e:
                    scan.assessment_result.status = AssessmentResult.RECOGNITION_ERROR
                    batch_results_for_update.append(scan.assessment_result)
                    cls._log_scan_exception(e, scan)

        cls._create_recognized_persons(batch_recognized_persons_for_create)
        cls._bulk_update(batch_results_for_update, AssessmentResult, ['status'])

        batch = RecognitionBatch.manager.get(id=batch_id)
        batch_status = cls.get_batch_status(batch, 'recognition')
        assessment_status = \
            Assessment.CROPPING if batch_status == RecognitionBatch.RECOGNITION_COMPLETED else Assessment.SCANNED

        cls._update_status(batch, batch_status)
        cls._update_status(batch.assessment, assessment_status)

        if assessment_status == Assessment.SCANNED:
            cls._mark_recognized_results(batch)

    @staticmethod
    def _create_result(assessment, scan):
        return AssessmentResult.manager.create(answer_sheet_scan_id=scan.id, assessment_id=assessment.id)

    @classmethod
    def _create_result_items(cls, batch, result_items_marks):
        batch_for_create = []
        result_items = cls._bulk_create(batch, AssessmentResultItem)
        for i in range(len(result_items)):
            for j in range(len(result_items_marks[i])):
                result_items_marks[i][j].assessment_result_item_id = result_items[i].id
                batch_for_create.append(result_items_marks[i][j])
        return cls._bulk_create(batch_for_create, AssessmentResultItemMark)

    @classmethod
    def _create_recognized_persons(cls, recognized_persons):
        batch_result_for_update = []
        recognized_persons = cls._bulk_create(recognized_persons)
        for recognized_person in recognized_persons:
            assessment_result = recognized_person.assessmentresult
            assessment_result.recognized_person = recognized_person
            batch_result_for_update.append(assessment_result)
        cls._bulk_update(batch_result_for_update, AssessmentResult, ['recognized_person'])

    @staticmethod
    def _build_result_item(answer, correct_answer_id, assessment_item_id, result):
        return AssessmentResultItem(**{
            'assessment_item_id': assessment_item_id,
            'assessment_result_id': result.id,
            'body': {key: answer for key in ['answer', 'unit', 'real_answer', 'real_unit']},
            'correct_answer_id': correct_answer_id,
        })

    @staticmethod
    def _build_result_item_marks(marks):
        item_marks, total = [], Decimal('0.00')
        for mark in marks:
            total += mark['value']
            item_marks.append(AssessmentResultItemMark(**mark))
        return item_marks, total

    @staticmethod
    def _get_assessment_item(assessment_items, number):
        return next((i for i in assessment_items if str(i['number']) == str(number)), None)

    @staticmethod
    def _delete_results(results_ids):
        return AssessmentResult.manager.filter(id__in=results_ids).delete()

    @staticmethod
    def _download_images(assessment_result, results):
        batch_result_items_for_update = []
        for result_item in assessment_result.result_items.all():
            result_data = results.get(str(result_item.assessment_item.number), {})
            path = result_data.get('path', None)
            item = RecognitionHelper.set_image('answer', result_item, path)
            batch_result_items_for_update.append(item)
        return batch_result_items_for_update

    @classmethod
    def _mark_recognized_results(cls, batch):
        results = [scan.assessment_result for scan in batch.scans.all() if scan.assessment_result]
        for result in results:
            if result.status == AssessmentResult.PROCESSING:
                result.status = AssessmentResult.RECOGNIZED
        cls._bulk_update(results, AssessmentResult, ['status'])

    @staticmethod
    def _is_valid_scan(scan):
        if scan and scan.assessment_result:
            return scan.assessment_result.status != AssessmentResult.RECOGNITION_ERROR
        return False

    @staticmethod
    def _log_scan_exception(e, scan):
        logger.info(f'Exception: {e}')
        logger.info(f'Scan: {scan}')
