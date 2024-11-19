from assessments.helpers import AssessmentHelper
from assessments.models import Assessment
from django.utils.translation import ugettext as _

from rest_framework import serializers

NAME_ERRORS = {
    "default": _("An assessment with this name already exists"),
    "create_assessment": _("An assessment with this name already exists."),
}

SETTING_ERRORS = {
    "answer": "Answer #%(number)d is blank",
    "answer_format": "The format of answer #%(number)d is incorrect",
    "significant_figure": "Answer #%(number)d has the significant figures toggle on but your answer "
                          "is not in a decimal format.",
    "unit": "The units for answer #%(number)d is blank",
    "scientific_notation": "The scientific notation value for answer #%(number)d is blank.",
    "scientific_notation_format": "The scientific notation value for answer #%(number)d is not in the correct format.",
}


class AssessmentValidator:
    @staticmethod
    def validate_name(value, assessment_id, name_validation_type, group_id):
        if AssessmentHelper.is_assessment_name_exists(assessment_id, group_id, value):
            raise serializers.ValidationError(_(NAME_ERRORS[name_validation_type]))
        return value

    @classmethod
    def validate_assessment_items(cls, assessment_item, compare_by_characters):
        errors = []
        compare_by_character_indexes = []

        assessment_kind, is_generic_blank_assessment = \
            AssessmentHelper.check_is_generic_blank_assessment(assessment_item)
        if is_generic_blank_assessment:
            answers_errors = [{"answers": [{"body": _("No answers found. Please input at least one answer.")}]}]
            raise serializers.ValidationError(answers_errors)

        for i, item in enumerate(assessment_item):
            answers, kind, setting = item.get("answers", []), item.get("kind", None), item.get("setting")
            answers_errors, compare_by_character_indexes = \
                cls.validate_assessment_item(assessment_kind, answers, kind, setting, i, compare_by_character_indexes)

            errors.append(answers_errors)

        if not all(i is None for i in errors):
            raise serializers.ValidationError(errors)

        if not compare_by_characters and len(compare_by_character_indexes) > 0:
            formatted_answer = cls._get_formatted_answer(compare_by_character_indexes)
            raise serializers.ValidationError([{'compare_by_characters': formatted_answer}])

        return assessment_item

    @classmethod
    def validate_assessment_item(cls, assessment_kind, answers, kind, setting, index, compare_by_character_indexes):
        errors = []

        for answer in answers:
            body = answer.get("body", {})
            number = {"number": index + 1}
            scientific_notation = answer.get("scientific_notation", None)
            significant_figure = answer.get("significant_figure", None)
            unit = answer.get("unit", None)
            value = body.get("value", None)

            if (not value and assessment_kind != Assessment.GENERIC) or (isinstance(value, str) and not value.strip()):
                errors.append({"body": _(SETTING_ERRORS["answer"]) % number})
            elif kind == 'numeric':
                if not cls._is_valid_answer(body):
                    errors.append({"body": _(SETTING_ERRORS["answer_format"]) % number})
                if setting:
                    if "unit" in setting and not unit:
                        errors.append({"body": _(SETTING_ERRORS["unit"]) % number})
                    elif "significant_figure" in setting and \
                            (significant_figure is None or not cls._is_number(significant_figure)):
                        errors.append({"body": [_(SETTING_ERRORS["significant_figure"]) % number,
                                                _("Either change your answer or turn the SF toggle off.")]})
                    elif "scientific_notation" in setting:
                        if scientific_notation is None:
                            errors.append({"body": _(SETTING_ERRORS["scientific_notation"]) % number})
                        elif scientific_notation and not cls._is_number(scientific_notation):
                            errors.append({"body": _(SETTING_ERRORS["scientific_notation_format"]) % number})
            elif kind == 'mf':
                if not cls._is_valid_answer(body) and str(index + 1) not in compare_by_character_indexes:
                    compare_by_character_indexes.append(index)

                if setting and "unit" in setting and not unit:
                    errors.append({"body": _(SETTING_ERRORS["unit"]) % number})
            else:
                errors.append(None)

        return (None, compare_by_character_indexes) \
            if all(i is None for i in errors) else ({"answers": errors}, compare_by_character_indexes)

    @staticmethod
    def _get_formatted_answer(assessment_item_indexes):
        answer = ''
        assessment_item_indexes = set(assessment_item_indexes)
        for index, element in enumerate(assessment_item_indexes):
            assessment_item_number = element + 1
            if index == 0:
                answer += f'Answer #{assessment_item_number}'
            elif index == len(assessment_item_indexes) - 1 and len(assessment_item_indexes) > 1:
                answer += f' and {assessment_item_number}'
            else:
                answer += f', {assessment_item_number}'
        return answer

    @classmethod
    def _is_valid_answer(cls, body):
        return not ("valid" in body and not body["valid"])

    @staticmethod
    def _is_number(string):
        try:
            int(string)
            return True
        except ValueError:
            try:
                float(string)
                return True
            except ValueError:
                return False
