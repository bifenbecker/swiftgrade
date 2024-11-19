from sympy.parsing.latex import parse_latex

import sympy as sp


FUNCS = [sp.sin, sp.asin, sp.sec, sp.asec, sp.cos, sp.acos, sp.csc, sp.acsc, sp.tan, sp.atan, sp.cot, sp.acot]

ACCURACY = 0.00000000000001


class CompareNumericAnswerService:
    def __init__(self, teacher_value, teacher_answer, student_answer, tolerance):
        self.teacher_value = teacher_value
        self.teacher_answer = teacher_answer
        self.student_answer = student_answer
        self.tolerance = tolerance

    def call(self):
        return self.student_answer and (
            self.student_answer == self.teacher_answer or self._compare_latex(self.teacher_value) or
            self._compare_latex(self.teacher_answer) or
            self._compare_by_tolerance()
        )

    def _get_tolerance_range(self):
        try:
            answer = self._convert_radians_to_degrees(self.teacher_answer)

            start = (100 - self.tolerance['value']) / 100
            end = (100 + self.tolerance['value']) / 100
            return {'start': float(start * answer), 'end': float(end * answer)}
        except Exception:
            return None

    def _compare_latex(self, teacher_answer):
        try:
            real = self._convert_radians_to_degrees(self.student_answer)
            expected = self._convert_radians_to_degrees(teacher_answer)
            is_valid = abs(sp.simplify(real - expected)) <= ACCURACY
            return is_valid and is_valid.is_Boolean
        except Exception:
            return False

    def _compare_by_tolerance(self):
        try:
            real = self._convert_radians_to_degrees(self.student_answer)
            tolerance_range = self._get_tolerance_range()

            if isinstance(tolerance_range, dict) and real is not None:
                start, end = tolerance_range['start'], tolerance_range['end']
                return end <= real <= start if start > end else start <= real <= end
            return False
        except Exception:
            return False

    @staticmethod
    def _convert_radians_to_degrees(ltx):
        try:
            ltx = ltx.replace(' ', '')
            expr = parse_latex(ltx)
            for func in FUNCS:
                if expr.has(func):
                    expr = expr.replace(func, lambda arg: func(arg * sp.pi / 180), map=False)
            return expr.subs({'pi': sp.pi}).evalf()
        except Exception:
            return None
