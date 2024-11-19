from decimal import Decimal
from functools import reduce

from api.core.logger.custom_logger import CustomLogger

from .compare_fib_answer_service import CompareFibAnswerService
from .compare_mf_answer_service import CompareMFAnswerService
from .compare_numeric_answer_service import CompareNumericAnswerService
from ...helpers import RecognitionHelper
from ...models import Assessment, AssessmentItem

ACCURACY, MARK = 0.00000001, Decimal('0.00')


logger = CustomLogger.get_logger(__name__, 'recognition_process.log')


class CompareResultsService:
    def __init__(self, *args, **kwargs):
        self.handle_compare_methods = {
            AssessmentItem.FIB: self._handle_fib_comparison,
            AssessmentItem.MC: self._handle_mc_comparison,
            AssessmentItem.MF: self._handle_mf_comparison,
            AssessmentItem.NUMERIC: self._handle_numeric_comparison,
        }

    @classmethod
    def _handle_fib_comparison(cls, real, expected):
        marks_map, setting = {}, expected['setting']

        for answer in expected['answers']:
            mark = answer['marks'].get('answer', MARK)
            teacher_answer, student_answer = answer.get('value', ''), real.get('answer', '')
            student_answer = student_answer if student_answer is not None else ''
            is_valid, is_ac_applied = CompareFibAnswerService(teacher_answer, student_answer).call(setting)
            total_mark = mark if is_valid else MARK
            marks_map[total_mark] = {
                'answer_id': answer['id'],
                'is_ac_applied': is_ac_applied,
                'marks': [{'kind': 'answer', 'value': total_mark}]
            }

        max_mark = max(marks_map.keys())
        return {
            'answer_id': marks_map[max_mark]['answer_id'],
            'is_ac_applied': marks_map[max_mark]['is_ac_applied'],
            'marks': marks_map[max_mark]['marks'],
        }

    @classmethod
    def _handle_mc_comparison(cls, real, expected):
        answers, mark = expected['answers'], {'kind': 'answer', 'value': MARK}
        answer_id = expected['answers'][0]['id'] if expected['answers'] else None
        for answer in answers:
            if RecognitionHelper.compare_mc_answer(answer['value'], real['answer']):
                answer_id = answer['id']
                mark['value'] = answer['marks'].get('answer', MARK)
                break
        return {'answer_id': answer_id, 'marks': [mark]}

    @classmethod
    def _handle_mf_comparison(cls, real, expected, assessment_type):
        answer_id, marks_map, setting = None, {}, expected['setting']

        for answer in expected['answers']:
            answer_id, answer_marks, need_grading = cls._get_marks_for_mf_answers(answer, real,
                                                                                  setting, assessment_type)
            total_mark = reduce(lambda x, y: x + y['value'], answer_marks, 0)
            marks_map[total_mark] = {
                'answer_id': answer_id,
                'marks': answer_marks,
                'need_grading': need_grading,
            }

        max_mark = max(marks_map.keys())
        return {
            'answer_id': marks_map[max_mark]['answer_id'],
            'marks': marks_map[max_mark]['marks'],
            'need_grading': marks_map[max_mark]['need_grading'],
        }

    @classmethod
    def _handle_numeric_comparison(cls, real, expected):
        answer_id, marks_map, setting = None, {},  expected['setting']
        for answer in expected['answers']:
            answer_id, answer_marks = cls._get_marks_for_numeric_answers(answer, real, setting)
            total_mark = reduce(lambda x, y: x + y['value'], answer_marks, 0)
            marks_map[total_mark] = {'answer_id': answer_id, 'marks': answer_marks}
        max_mark = max(marks_map.keys())
        return {
            'answer_id': marks_map[max_mark]['answer_id'],
            'marks': marks_map[max_mark]['marks']
        }

    @staticmethod
    def _get_math_answer_with_units_marks(expected, real, is_valid_answer, setting):
        marks = [{
            'kind': 'answer',
            'value': expected['marks'].get('answer', MARK) if is_valid_answer else MARK}]

        if 'unit' in setting and 'unit' in real:
            is_valid_units = RecognitionHelper.compare_units(expected['unit'], real['unit'])
            marks.append({
                'kind': 'unit',
                'value': expected['marks'].get('unit', MARK) if is_valid_units else MARK,
            })
        return marks

    @classmethod
    def _get_marks_for_mf_answers(cls, expected, real, setting, assessment_type):
        try:
            expected_answer = RecognitionHelper.prepare_answer(expected['value'])
            real_answer = RecognitionHelper.prepare_answer(real.get('answer', ''))
            is_valid_answer, need_grading = \
                CompareMFAnswerService(expected_answer, real_answer, expected['valid'], assessment_type).call()
            marks = cls._get_math_answer_with_units_marks(expected, real, is_valid_answer, setting)
            return expected['id'], marks, need_grading
        except Exception as e:
            cls._logger_exception(e, expected, real, setting)

            marks = [{'kind': 'answer', 'value': MARK}]
            marks.extend([{'kind': kind, 'value': MARK} for kind in setting])
            return None, marks, False

    @classmethod
    def _get_marks_for_numeric_answers(cls, expected, real, setting):
        try:
            answer, value, sn = expected['answer'], expected['value'], expected['scientific_notation']
            raw_real_answer = real.get('answer', '')

            if sn:
                answer = str(answer * 10**int(sn))
                value = f'{value}\\cdot 10^{{{sn}}}'

            real_answer = RecognitionHelper.prepare_answer(raw_real_answer)
            answer = RecognitionHelper.prepare_answer(str(answer))
            tolerance = {'data': expected['tolerance_data'], 'value': expected['tolerance']}
            is_valid_answer = CompareNumericAnswerService(value, answer, real_answer, tolerance).call()

            marks = cls._get_math_answer_with_units_marks(expected, real, is_valid_answer, setting)

            if 'significant_figure' in setting and real_answer:
                sf_mark = expected['marks'].get('significant_figure', MARK)
                value = sf_mark if RecognitionHelper.compare_sig_fig(expected['significant_figure'], raw_real_answer) else MARK
                marks.append({'kind': 'significant_figure', 'value': value})
            return expected['id'], marks
        except Exception as e:
            cls._logger_exception(e, expected, real, setting)

            marks = [{'kind': 'answer', 'value': MARK}]
            for kind in setting:
                if kind != 'scientific_notation':
                    marks.append({'kind': kind, 'value': MARK})
            return None, marks

    @staticmethod
    def _logger_exception(e, expected, real, setting):
        logger.info(f'Exception: {e}')
        logger.info(f'Expected: {expected}')
        logger.info(f'Real: {real}')
        logger.info(f'Setting: {setting}')

    def compare(self, real, expected, assessment_type=Assessment.PAPER):
        kind = expected.get('kind')
        handle_method = self.handle_compare_methods.get(kind, None)
        if handle_method:
            return handle_method(real, expected, assessment_type) \
                if kind == AssessmentItem.MF else handle_method(real, expected)
        return []
