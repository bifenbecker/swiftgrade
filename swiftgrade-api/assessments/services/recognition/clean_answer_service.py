import re

from ...models.assessment_item import AssessmentItem

from api.core.services import ParenthesesCleaner


DATA = (
    ('\\(', '('),
    ('\\)', ')'),
    ('\\[', '['),
    ('\\]', ']'),
    ('\\text', ''),
    ('\\operatorname', ''),
    ('\\mathrm', ''),
    ('~', ''),
    # (',', '.'),
)

LATEX_SUB_DATA = (
    (r'[ ]?\\#[ ]?', '#'),
    (r'[ ]?\\in\b[ ]?', '∈'),
    (r'[ ]?\\mathbb{Q}[ ]?', 'ℚ'),
    (r'[ ]?\\mathbb{R}[ ]?', 'ℝ'),
    (r'[ ]?\\mathbb{N}[ ]?', 'ℕ'),
    (r'[ ]?\\mathbb{Z}[ ]?', 'ℤ'),
    (r'[ ]?\\mathbb{C}[ ]?', 'ℂ'),
    (r'[ ]?\\cup[ ]?', '∪'),
    (r'[ ]?\\cap[ ]?', '∩'),
    (r'[ ]?\\supseteq[ ]?', '⊇'),
    (r'[ ]?\\subseteq[ ]?', '⊆'),
    (r'[ ]?\\subset[ ]?', '⊂'),
    (r'[ ]?\\supset[ ]?', '⊃'),
    (r'[ ]?\\nsubseteq[ ]?', '⊄'),
    (r'[ ]?\\nsupseteq[ ]?', '⊅'),
    (r'[ ]?\\varnothing[ ]?', 'Ø'),
    (r'[ ]?\\therefore[ ]?', '∴'),
    (r'[ ]?\\exists[ ]?', '∃'),
    (r'[ ]?\\notin[ ]?', '∉'),
    (r'[ ]?\\varepsilon[ ]?', 'ε'),
    (r'[ ]?\\prime \\prime[ ]?', '"'),
    (r'[ ]?\\prime[ ]?', "'"),
    (r'[ ]?\\mid[ ]?', '|'),
    (r'[ ]?,[ ]?', ','),
    (r'\\leqslant', r'\\le'),
    (r'\\geqslant', r'\\ge'),
    (r'\\leq', r'\\le'),
    (r'\\geq', r'\\ge'),
    (r'(?<!left)\\{', r'\\left\{'),
    (r'(?<!right)\\}', r'\\right\}'),
)

EULER_NUMER_REGEX = '\\{{0,1}\\s*\\-{0,1}\\s*\\d+\\s*\\}{0,1}'
EULER_REGEX = '[\{\s]*[e|E][\}\s]*[\{\},\s]*([\d]+)[\s\{\}]*$'
MATH_EXPRESSIONS = (
    (' loge', '\\\\log e'),
    (' lne', '\\\\ln e'),
    (' logpi', '\\\\log pi'),
    (' lnpi', '\\\\ln pi'),
)

class CleanAnswerService:
    @staticmethod
    def _filter_ending(value: str) -> str:
        if len(value) > 0 and value[-1] == '\\':
            return value[:-1]
        return value

    @staticmethod
    def _filter_spacing(value: str) -> str:
        return value.replace('\n', '')

    @staticmethod
    def _modify_numeric_for_sn(answer: str) -> str:
        answer_search = re.search(EULER_REGEX, answer)
        if answer_search:
            indexes = answer_search.span()
            answer = f'{answer[0:indexes[0]]}\\cdot 10^{{{answer_search.groups()[0]}}}'

        euler_part_search = re.search(f'\\\\cdot\\s*10\\^{EULER_NUMER_REGEX}', answer)
        if euler_part_search:
            start_pos, _ = euler_part_search.span()
            answer = f'({answer[:start_pos]}){answer[start_pos:]}'
        return answer

    @classmethod
    def _parsing_numeric(cls, value: str):
        if re.search('[a-zA-Z]', value):
            return value

        filtered_value = re.sub(r'\{|\}', '', value)
        filtered_value = re.sub(r'\.\.|\,', '.', filtered_value)

        try:
            return filtered_value if filtered_value.isnumeric() else str(filtered_value)
        except ValueError:
            return value

    @staticmethod
    def _parsing_email(value: str) -> str:
        return re.sub(r' |\{|\}', '', value)

    @staticmethod
    def _parsing_names(value: str) -> str:
        value = re.sub(r'[^A-Za-z\'\s\"]', '', value)
        return value.capitalize()

    @staticmethod
    def _remove_parentheses(value):
        for i, j in DATA:
            value = value.replace(i, j)

        for i, j in MATH_EXPRESSIONS:
            expression = re.compile(re.escape(i), re.IGNORECASE)
            value = expression.sub(j, value)

        if value[:2] == '( ' and value[-2:] == ' )':
            value = value[2:len(value)-2]

        value = ParenthesesCleaner().removeInvalidParentheses(value, "()")
        value = ParenthesesCleaner().removeInvalidParentheses(value[0], "[]")
        return ParenthesesCleaner().removeInvalidParentheses(value[0], "{}")[0]
    
    @staticmethod
    def _parsing_latex_math_expressions(value: str) -> str:
        for pattern, sub in LATEX_SUB_DATA:
            value = re.sub(pattern, sub, value)
        return value

    @classmethod
    def call(cls, value: str, kind: str, with_sn=False) -> str:
        if kind == AssessmentItem.MC:
            return value
        value = ' ' if not value else value

        value = cls._filter_ending(value)
        value = cls._filter_spacing(value)
        value = cls._remove_parentheses(value)

        if kind == AssessmentItem.NUMERIC:
            value = cls._parsing_numeric(value)
            if with_sn:
                value = cls._modify_numeric_for_sn(value)
        elif kind in ['first_name', 'last_name']:
            value = cls._parsing_names(value)
        elif kind == 'email':
            value = cls._parsing_email(value)
        if kind in [AssessmentItem.MF, AssessmentItem.NUMERIC]:
            value = cls._parsing_latex_math_expressions(value)
        value = value.strip()
        return value
