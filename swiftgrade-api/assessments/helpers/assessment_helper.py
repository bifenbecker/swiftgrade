from django.contrib.auth.hashers import check_password
from django.db.models.functions import Coalesce
from django.db.models import Sum, Q
from django.utils import timezone

from decimal import Decimal
from re import match, search, sub
from sympy.parsing.latex import parse_latex

import sympy as sp

from ..constants import DOT_SYMBOL
from ..models import Assessment, AssessmentSettings, AnswerSheet, AssessmentItem, RecognitionBatch
from ..utils import filter_end_dot


BASE_ANSWER_REGEX = r'[+|-]?\d*[.,]?\d*'
BASE_SN_REGEX = r'10\*\*\(?\-?\d+\)?'
ANSWER_REGEX = rf'^{BASE_ANSWER_REGEX}$'
ANSWER_WITH_SN_REGEX = rf'^\(?({BASE_ANSWER_REGEX})\)?\*{BASE_SN_REGEX}$'
SN_WITH_ANSWER_REGEX = rf'^{BASE_SN_REGEX}\*\(?({BASE_ANSWER_REGEX})\)?$'
TIMER_DATA = {
    AssessmentSettings.MINUTES: 60,
    AssessmentSettings.HOURS: 3600,
    AssessmentSettings.DAYS: 86400,
}
SN_REGEX = '^10\\*\\*\({0,1}\-{0,1}\\d+\){0,1}$'
NEGATIVE_NUMBER_SN_REGEX = '^-?10\\*\\*\({0,1}\-{0,1}\\d+\){0,1}$'
# NEW_SN_REGEX = r'10\\*\\*\({0,1}\-{0,1}\d+\){0,1}'
NEW_SN_REGEX = '\\*10\\*\\*\\(?\\-?\\d+\\)?'


class AssessmentHelper:
    @staticmethod
    def check_is_generic_blank_assessment(assessment_items):
        mc_blank = 0
        mc_count = 0

        for item in assessment_items:
            if item['kind'] == 'mc':
                mc_count += 1
                if not item['answers'][0]['body']['value']:
                    mc_blank += 1
            else:
                break
        if mc_blank == len(assessment_items):
            return Assessment.GENERIC, True
        elif mc_count == len(assessment_items):
            return Assessment.GENERIC, False
        return Assessment.CUSTOM, False

    @classmethod
    def change_marks_order(cls, marks):
        ordered_marks = []
        for mark in marks:
            kind = mark.get('kind', None)
            if kind == 'significant_figure' or len(ordered_marks) == 0:
                ordered_marks.append(mark)
            elif ordered_marks[0].get('kind', None) == 'answer':
                ordered_marks.insert(1, mark)
            else:
                ordered_marks.insert(0, mark)
        return ordered_marks

    @classmethod
    def check_batch_existence(cls, assessments):
        batches = RecognitionBatch.manager.filter(assessment__in=assessments)
        if batches.exists():
            batches.delete()

    @staticmethod
    def get_assessment_kind(assessment_items):
        mc_count = 0

        for item in assessment_items:
            kind = item['kind'] if isinstance(item, dict) else item.kind
            if kind == 'mc':
                mc_count += 1

        return Assessment.GENERIC if mc_count == len(assessment_items) else Assessment.CUSTOM

    @classmethod
    def get_assessment_status(cls, kind, assessment_type):
        if assessment_type == Assessment.ONLINE:
            return Assessment.READY_FOR_ASSIGNMENT
        if kind == Assessment.CUSTOM:
            return Assessment.READY_FOR_GENERATION
        return Assessment.READY_FOR_SCAN

    @staticmethod
    def get_prev_assessment_status(assessment_id, batches):
        if batches:
            return "scanned"
        answer_sheets = AnswerSheet.objects.filter(
            assessments__id=assessment_id, kind=AnswerSheet.CUSTOM,
        ).exclude(document_file__isnull=True).all()
        return "ready_for_scan" if answer_sheets else "ready_for_generation"

    @classmethod
    def get_result(cls, mark, total):
        # ratio = Decimal((mark / total * 100).quantize(Decimal('.1'), rounding=ROUND_HALF_UP))
        ratio = round(Decimal((mark / total * 100)))
        return f'{cls.normalize_number(mark)}/{cls.normalize_number(total)} ({ratio}%)'

    @classmethod
    def get_mark_percentage(cls, mark, total):
        return f'{round(Decimal((mark / total * 100)))}'

    @classmethod
    def get_sig_fig(cls, latex):
        filtered_latex = filter_end_dot(latex)
        with_dot = filtered_latex != latex
        value = cls._get_value_for_sig_fig(filtered_latex)

        if with_dot:
            value = f'{value}{DOT_SYMBOL}'

        first_symbol = value[0] if value and len(value) > 0 else None
        if first_symbol in ['+', '-']:
            value = value.replace(first_symbol, '')

        if value == '0':
            return 0

        if not value:
            return None

        sig_figs_number, zeros_within_number, point_found = 0, 0, False
        for i in range(len(value)):
            if value[i] == DOT_SYMBOL:
                point_found = True
                if zeros_within_number > 0:
                    sig_figs_number += zeros_within_number
                    zeros_within_number = 0
            elif value[i] != '0' and value[i] != DOT_SYMBOL:
                sig_figs_number += 1
                if zeros_within_number > 0:
                    sig_figs_number += zeros_within_number
                    zeros_within_number = 0
            elif value[i] == '0' and point_found and sig_figs_number > 0:
                sig_figs_number += 1
            elif value[i] == '0' and not point_found and sig_figs_number > 0:
                zeros_within_number += 1
        return sig_figs_number

    @staticmethod
    def get_value_body(body, key, kind):
        default = {AssessmentItem.FIB: None, AssessmentItem.MC: [], AssessmentItem.NUMERIC: 0}.get(kind)
        value = body.get(key, default)

        if key == 'value' and isinstance(value, str):
            value = value.replace("\\left(", "(")
            value = value.replace("\\right)", ")")
        return value

    @staticmethod
    def get_actions_for_updating_assessment_items(items, new_items):
        items = items.values_list('number', flat=True).order_by('number')
        new_items = set(map(lambda x: x['number'], new_items))
        return {
            'creating': list(new_items.difference(set(items))),
            'updating': list(new_items.intersection(set(items))),
            'deleting': list(set(items).difference(new_items))
        }

    @classmethod
    def get_items_for_actions(cls, actions, data):
        items_for_updating = list(filter(lambda x: x['number'] in actions['updating'], data))
        items_for_updating.sort(key=lambda x: x['number'])

        return {
            'creating': list(filter(lambda x: x['number'] in actions['creating'], data)),
            'updating': items_for_updating}

    @staticmethod
    def get_max_mark(answers):
        max_mark = 0
        for answer in answers:
            mark = sum(i['value'] for i in answer['marks'])
            if mark > max_mark:
                max_mark = mark
        return max_mark

    @staticmethod
    def get_max_marks(answers):
        answer = answers.annotate(total_mark=Coalesce(Sum('mark__value'), 0)).order_by('-total_mark').first()
        marks = {mark.kind: mark.value for mark in answer.mark.all()}
        marks['total'] = answer.total_mark
        return marks

    @staticmethod
    def get_updated_assessment_status(kind, new_kind, status):
        if kind != new_kind and status != Assessment.READY_FOR_ASSIGNMENT:
            return Assessment.READY_FOR_SCAN if new_kind == Assessment.GENERIC else Assessment.READY_FOR_GENERATION
        if kind == Assessment.CUSTOM and status == Assessment.READY_FOR_SCAN:
            return Assessment.READY_FOR_GENERATION
        return status

    @classmethod
    def get_remaining_time_limit(cls, completed_assessment, setting):
        """
        Gets the remaining time for a student to fill the assessment

        Parameters:
            completed_assessment: CompletedAssessment object
            setting: AssessmentSettings object

        Returns:
            Remaining time limit (int)
        """
        if completed_assessment and setting:
            initial_time_limit = cls.get_time_limit(setting)
            if initial_time_limit:
                time_used = (timezone.now() - completed_assessment.created_at).seconds
                remaining_time = initial_time_limit - time_used
                return remaining_time if remaining_time > 0 else 0
            return 0
        return 0

    @staticmethod
    def get_time_limit(setting):
        if setting and setting.timer_value and setting.timer_unit:
            return setting.timer_value * TIMER_DATA[setting.timer_unit]
        return 0

    @classmethod
    def get_is_timer(cls, assessment):
        settings = cls._get_assessment_settings(assessment.id)
        return settings.timer_unit is not None and isinstance(settings.timer_value, int)

    @classmethod
    def is_assessment_name_exists(cls, assessment_id, group_id, name):
        return Assessment.manager.filter(Q(group_id=group_id) & Q(name=name)) \
            .exclude(id=assessment_id).exists()

    @staticmethod
    def is_marks_changed(answer, marks):
        current_marks = [{'kind': mark.kind, 'value': mark.value} for mark in answer.mark.all()]
        current_marks.sort(key=lambda x: x['kind'])
        marks = [{'kind': mark['kind'], 'value': round(Decimal(mark['value']), 2)} for mark in marks]
        marks.sort(key=lambda x: x['kind'])
        return not current_marks == marks

    @classmethod
    def is_password_valid(cls, assessment, student_password):
        """
        Compares passwords:
        - the password entered by the teacher for the current assessment
        - the password that the student entered to get access to the assessment.

        Parameters:
            assessment: Assessment object
            student_password (str): The password value entered by the student

        Returns:
            Passwords comparison result (bool)
        """
        settings = cls._get_assessment_settings(assessment.id)
        assessment_password = settings.password if assessment and settings else None
        return assessment_password and student_password and check_password(student_password, assessment_password)

    @staticmethod
    def normalize_number(number):
        normalized = number.normalize()
        sign, digit, exponent = normalized.as_tuple()
        return normalized if exponent <= 0 else normalized.quantize(1)

    @staticmethod
    def _get_assessment_settings(assessment_id):
        return AssessmentSettings.manager.filter(assessment_id=assessment_id, is_released=True).last()

    @classmethod
    def _get_value_for_sig_fig(cls, latex):
        answer = parse_latex(latex)

        if answer.is_Number or (isinstance(answer, sp.Mul) and (-answer).is_Number):
            return None if cls._is_with_letters(latex) else latex

        answer = answer.__str__()
        if match(ANSWER_REGEX, answer):
            return match(ANSWER_REGEX, answer).group()
        elif match(ANSWER_WITH_SN_REGEX, answer) or match(SN_WITH_ANSWER_REGEX, answer):
            latex_sn_start, latex_sn_end = search(r'10\^\{?\s?\-?\d+\s?\}?', latex).span()

            if latex_sn_start == 0:
                latex_answer_without_sn = latex[latex_sn_end:]
            else:
                latex_answer_without_sn = latex[:latex_sn_start]

            latex_answer_without_sn = sub(r'\s*\\cdot\s*', '', latex_answer_without_sn)
            latex_answer_without_sn = sub(r'^\s*\(?\s*|\s*\)?\s*', '', latex_answer_without_sn)

            if search(r'\.\d*0*$', latex_answer_without_sn):
                return latex_answer_without_sn

            if match(ANSWER_WITH_SN_REGEX, answer):
                return sub(ANSWER_WITH_SN_REGEX, r'\1', answer)
            elif match(SN_WITH_ANSWER_REGEX, answer):
                return sub(SN_WITH_ANSWER_REGEX, r'\1', answer)
        elif match(SN_REGEX, answer):
            return '1'
        elif match(NEGATIVE_NUMBER_SN_REGEX, answer):
            return '-1'
        return None

    @staticmethod
    def _is_with_letters(value: str) -> bool:
        value = value.lower()
        return value.islower()
