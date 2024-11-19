from django.core.files import File
from django.core.files.temp import NamedTemporaryFile

import re
import sympy as sp

from api.core.logger.custom_logger import CustomLogger
from sympy.parsing.latex import parse_latex

from .assessment_helper import AssessmentHelper
from ..utils import filter_end_dot


MATH_CONSTANTS = dict(pi=sp.pi, e=sp.E)

GEQ, LEQ = r'\\geq', r'\\leq'
logger = CustomLogger.get_logger(__name__, 'recognition_helper.log')


class RecognitionHelper:
    @classmethod
    def compare_mc_answer(cls, teacher_answer, student_answer):
        if not teacher_answer:
            return False
        teacher_answer = [1 if item in teacher_answer else 0 for item in ['A', 'B', 'C', 'D', 'E'][:len(student_answer)]]
        return student_answer == teacher_answer

    @classmethod
    def compare_sig_fig(cls, teacher_sf, student_answer):
        try:
            sf = AssessmentHelper.get_sig_fig(str(student_answer))
            return teacher_sf == sf
        except Exception:
            return False

    @classmethod
    def compare_units(cls, teacher_unit, student_unit):
        expected_unit, real_unit = cls._clean_unit(teacher_unit), cls._clean_unit(student_unit)
        return expected_unit == real_unit

    @classmethod
    def prepare_answer(cls, answer: str) -> str:
        answer = filter_end_dot(answer)
        answer = cls._fix_latex(answer)
        return answer

    @staticmethod
    def parse_mf_to_latex(expr: str):
        formula = parse_latex(expr)
        return formula.subs(MATH_CONSTANTS)

    @staticmethod
    def _fix_latex(latex: str) -> str:
        latex = re.sub(r"\\left\(", '(', latex)  # remove all \left keywords not supported by parse_latex
        latex = re.sub(r"\\right\)", ')', latex)  # remove all \right keywords not supported by parse_latex
        latex = re.sub(r"\\left\|", '|', latex)  # remove all \left keywords not supported by parse_latex
        latex = re.sub(r"\\right\|", '|', latex)  # remove all \right keywords not supported by parse_latex
        latex = re.sub(r'\\log_(\d)', r'\\log_{\1}', latex)  # add braces surrond digit
        latex = re.sub(r'\\le([^q].*)', fr'{LEQ}\1', latex) # add less or equal sign support
        latex = re.sub(r'\\leqslant', LEQ, latex)
        latex = re.sub(r'\\ge([^q].*)', fr'{GEQ}\1', latex) # add greater or equal sign support
        latex = re.sub(r'\\geqslant', GEQ, latex)
        return latex

    @classmethod
    def set_images_for_result_item(cls, answer, result_item):
        for key in ['answer', 'unit']:
            url = answer.get(f'{key}_url', None)
            if url:
                result_item = cls.set_image(key, result_item, url)
        return result_item

    @staticmethod
    def set_image(key, result_item, url):
        if key == 'answer':
            result_item.image = url
        else:
            result_item.unit_image = url

        return result_item

    @staticmethod
    def _clean_unit(unit: str) -> str:
        for i in [' ', '{', '}', '\\mathrm', '\\mathbf', '\\operatorname', '\\text', '\\mathrm', '\\']:
            unit = unit.replace(i, '')
        return unit.lower()
