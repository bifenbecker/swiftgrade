from django.db.models import Q
from rest_framework import serializers

from assessments.helpers import AssessmentHelper


class BaseAssessmentResultsListSerializer(serializers.ModelSerializer):
    def get_named(self, result):
        return result.answer_sheet_scan.named if result.answer_sheet_scan else True

    def get_need_grading(self, result):
        return result.result_items.filter(Q(need_grading=True) | Q(need_grading_for_units=True)).count() > 0

    def get_personal_data_image(self, result):
        if result.recognized_person:
            return {
                'first_name_url': result.recognized_person.first_name_url,
                'last_name_url': result.recognized_person.last_name_url,
                'email_url': result.recognized_person.email_url
            }
        return {f'{k}_url': None for k in ['first_name', 'last_name', 'email']}

    def get_total(self, result):
        mark, total = result.mark, self.context['total']
        return AssessmentHelper.get_result(mark, total)

    def get_mark(self, result):
        return AssessmentHelper.normalize_number(result.mark)

    def get_mark_percentage(self, result):
        mark, total = result.mark, self.context['total']
        return AssessmentHelper.get_mark_percentage(mark, total)
