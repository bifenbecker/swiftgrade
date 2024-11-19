from api.core.logger.custom_logger import CustomLogger
from assessments.helpers import RecognitionHelper
from assessments.models import AssessmentItem, AssessmentResultItem, AssessmentResult, AssessmentResultItemMark

from decimal import Decimal

from assessments.services.recognition.clean_answer_service import CleanAnswerService
from assessments.services.recognition.compare_results_service import CompareResultsService

logger = CustomLogger.get_logger(__name__, 'recognition_process.log')


class CalculateResultService:
    @staticmethod
    def _get_predict_value(answer_item, kind, setting):
        predict_value = dict(**answer_item)

        if 'unit' in setting:
            predict_value.update({'unit': CleanAnswerService.call(predict_value.get('unit', ''), kind)})
        if kind != AssessmentItem.MC:
            predict_value.update({
                'answer': CleanAnswerService.call(
                    predict_value.get('answer', ''), kind, with_sn='scientific_notation' in setting,
                ),
            })

        return predict_value

    @staticmethod
    def _create_results_marks(assessment_results, assessment_results_marks):
        batch_for_create = []

        for i in range(len(assessment_results_marks)):
            marks, result = assessment_results_marks[i], assessment_results[i]
            for mark in marks:
                mark.assessment_result_item_id = result.id
                batch_for_create.append(mark)
        AssessmentResultItemMark.manager.bulk_create(batch_for_create)

    @staticmethod
    def _build_result_item_marks(marks):
        item_marks, total = [], Decimal('0.00')
        for mark in marks:
            total += mark['value']
            item_marks.append(AssessmentResultItemMark(**mark))
        return total, item_marks

    @staticmethod
    def _build_assessment_result_item(correct_answer, item, real_predict_value, predict_value, scan):
        default_value = [] if item['kind'] == AssessmentItem.MC else ''
        body = {
            'real_answer': real_predict_value.get('answer', default_value),
            'real_unit': real_predict_value.get('unit', ''),
            'answer': predict_value.get('answer', default_value),
            'unit': predict_value.get('unit', ''),
        }
        if item['kind'] == AssessmentItem.FIB:
            body.update({'is_ac_applied': correct_answer.get('is_ac_applied', False)})

        params = {
            'assessment_item_id': item['id'],
            'assessment_result_id': scan['assessment_result_id'],
            'body': body,
            'correct_answer_id': correct_answer.get('answer_id', None),
            'need_grading': predict_value.get('need_grading', False),
            'need_grading_for_units': predict_value.get('need_grading_for_units', False),
        }
        return AssessmentResultItem(**params)

    @classmethod
    def _process_scan(cls, scan):
        assessment_items, results = scan['assessment_items'], scan['results']
        assessment_results_marks, batch_for_create, mark = [], [], Decimal('0.00')

        for item in assessment_items:
            kind, number, setting = item['kind'], item['number'], item['setting']
            answer = results.get(number, {})
            raw_answer = answer.get('answer', answer)
            error = answer.get('error', False)

            if not error:
                predict_value = cls._get_predict_value(answer, kind, setting)
                data = CompareResultsService().compare(predict_value, item)
                predict_value['need_grading'] = \
                    predict_value.get('need_grading', False) or data.get('need_grading', False)
                answer['answer'] = raw_answer

                result_item = cls._build_assessment_result_item(data, item, answer, predict_value, scan)
                result_item = RecognitionHelper.set_images_for_result_item(answer, result_item)

                total, item_marks = cls._build_result_item_marks(data['marks'])
                mark += total
            else:
                error_message = answer.get('error_message', None)
                logger.info(f'Scan: {scan}')
                logger.info(f'Exception: {error_message}')

                # create empty result item for incorrect answer
                data, predict_value = {}, {}
                result_item = cls._build_assessment_result_item(data, item, answer, predict_value, scan)

                mark_kinds = list(filter(lambda s: s != 'scientific_notation', setting))
                mark_kinds.append('answer')

                item_marks = [AssessmentResultItemMark(**{'kind': kind, 'value': Decimal('0.00')}) for kind in mark_kinds]

            assessment_results_marks.append(item_marks)
            batch_for_create.append(result_item)

        assessment_results = AssessmentResultItem.manager.bulk_create(batch_for_create)
        cls._create_results_marks(assessment_results, assessment_results_marks)
        return mark

    @classmethod
    def calculate_scan_results(cls, data, results):
        marks = {}
        for scan in data:
            assessment_result_id = scan.get('assessment_result_id', None)
            try:
                marks[assessment_result_id] = cls._process_scan(scan)
            except Exception as e:
                index = next((i for i in range(len(results)) if results[i] == assessment_result_id), None)
                if index:
                    results[index].status = AssessmentResult.RECOGNITION_ERROR
                logger.info(f'Exception: {e}')
                logger.info(f'Scan: {scan}')
        return marks, results
