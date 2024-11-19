from celery.exceptions import TimeoutError as CeleryTimoutError
from celery.result import allow_join_result
from contextlib import suppress

import re
import sympy as sp

from assessments.models import Assessment
from assessments.helpers import RecognitionHelper

from swiftgrade_api import celery_app

ACCURACY = 0.00000000000001
GEQ = r'\\geq'
GT = r'\\gt'
LEQ = r'\\leq'
LT = r'\\lt'

INEQUALITY_SIGNS_MAP = {
    GEQ: sp.GreaterThan,
    GT: sp.StrictGreaterThan,
    LEQ: sp.LessThan,
    LT: sp.StrictLessThan,
}
INEQUALITY_SIGNS_PATTERN = f'{GEQ}|{GT}|{LEQ}|{LT}'

# TODO: change limit ???
TIME_LIMIT_FOR_DOIT = 2


@celery_app.task
def evaluate_math_formula(expr: str):
    formula = RecognitionHelper.parse_mf_to_latex(expr)
    formula = formula.doit()
    return str(formula)


class CompareMFAnswerService:
    def __init__(self, teacher_answer, student_answer, is_valid=True, assessment_type=Assessment.ONLINE):
        self.teacher_answer = teacher_answer
        self.student_answer = student_answer
        self.is_valid = is_valid
        self.assessment_type = assessment_type

    def call(self):
        if not self.is_valid:
            return self._compare_mf_by_characters(self.student_answer, self.teacher_answer), True
        simplified_student_answer, student_answer_need_grading = self._simplify_mf_answer(self.student_answer)
        simplified_teacher_answer, teacher_answer_need_grading = self._simplify_mf_answer(self.teacher_answer)
        need_grading = any((student_answer_need_grading, teacher_answer_need_grading))
        return self._compare_mf_results(simplified_student_answer, simplified_teacher_answer, need_grading)

    @staticmethod
    def _clear_recognized_answer(answer, invalid_symbols):
        for symbol in invalid_symbols:
            answer = answer.replace(symbol, '')
        return answer

    @staticmethod
    def _compare_mf_results(student_answer, teacher_answer, need_grading):
        if isinstance(student_answer, sp.Eq) and isinstance(teacher_answer, sp.Eq):
            with suppress():
                return student_answer.args[0] / teacher_answer.args[0] == student_answer.args[1] / teacher_answer.args[1], False

        if not student_answer == teacher_answer:
            try:
                result = (student_answer - teacher_answer) == 0
                return (result, not result) if need_grading else (result, False)
            except TypeError:
                return False, True
        return True, False

    def _compare_mf_by_characters(self, student_answer, teacher_answer):
        prepared_student_answer = self._prepare_mf_answer(student_answer)
        prepared_teacher_answer = self._prepare_mf_answer(teacher_answer)
        return prepared_teacher_answer == prepared_student_answer

    def _handle_mf_inequality(self, inequality_parts: list, str_expr: str):
        group = re.findall(INEQUALITY_SIGNS_PATTERN, str_expr)
        simplified_answers = [self._simplify_mf_answer(inequality_pt) for inequality_pt in inequality_parts]
        new_expressions, need_gradings = zip(*simplified_answers)
        new_expressions = list(new_expressions)
        expr = new_expressions.pop(0)

        for gr_item, new_expr in zip(group, new_expressions):
            if isinstance(expr, str) or isinstance(expr, sp.Integer) and isinstance(new_expr, sp.Integer):
                expr = f'{expr}\\{gr_item}{new_expr}'
            else:
                expr = INEQUALITY_SIGNS_MAP[f'\\{gr_item}'](expr, new_expr)

        return expr, any(need_gradings)

    def _prepare_mf_answer(self, answer):
        cleared_answer = self._clear_recognized_answer(answer, [' ', '{', '}', '\\', '^']) \
            if self.assessment_type else answer.replace(' ', '')
        return cleared_answer.lower()

    def _simplify_mf_answer(self, str_expr: str):
        inequality_parts = re.split(INEQUALITY_SIGNS_PATTERN, str_expr)
        need_grading = False

        if len(inequality_parts) > 1:
            return self._handle_mf_inequality(inequality_parts, str_expr)

        task = evaluate_math_formula.apply_async(args=(str_expr,))

        try:
            with allow_join_result():
                expr = task.get(timeout=TIME_LIMIT_FOR_DOIT)
        except CeleryTimoutError:
            # logger.info(f'Evaluation timed out ({TIME_LIMIT_FOR_DOIT} seconds passed) for expression {str_expr}')
            task.revoke(terminate=True)
            expr = RecognitionHelper.parse_mf_to_latex(str_expr)
            need_grading = True
        return sp.simplify(expr, doit=False), need_grading
