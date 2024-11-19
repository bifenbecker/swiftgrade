from decimal import Decimal
from rest_framework import serializers

from assessments.models import AssessmentResultItem, AssessmentItem

from .base_assessment_result_serializer import BaseAssessmentResultSerializer

MARK = Decimal('0.00')


class AssessmentResultItemSerializer(serializers.ModelSerializer, BaseAssessmentResultSerializer):
    answers = serializers.SerializerMethodField()
    assessment_result_id = serializers.IntegerField(source="assessment_result.id")
    assessment_item_id = serializers.IntegerField(source="assessment_item.id")
    correct_answer = serializers.SerializerMethodField()
    kind = serializers.CharField(source="assessment_item.kind")
    is_ac_applied = serializers.SerializerMethodField()
    is_manually_graded = serializers.SerializerMethodField()
    need_grading = serializers.SerializerMethodField()
    number = serializers.CharField(source="assessment_item.number")
    mark = serializers.SerializerMethodField()
    marks = serializers.SerializerMethodField()
    multiple_answer = serializers.SerializerMethodField()
    setting = serializers.ListField(source="assessment_item.setting")
    student_answer = serializers.SerializerMethodField()
    student_image = serializers.SerializerMethodField()

    class Meta:
        model = AssessmentResultItem
        fields = ('id', 'answers', 'assessment_item_id', 'assessment_result_id', 'correct_answer',
                  'is_ac_applied', 'is_manually_graded', 'kind', 'need_grading', 'number', 'setting', 'mark', 'marks',
                  'multiple_answer', 'student_answer', 'student_image')

    def _get_assessment_item(self, result_item):
        return self.context.get('assessment_data', {}).get(result_item.assessment_item.id, {})

    def get_answers(self, result_item):
        assessment_item = self._get_assessment_item(result_item)
        return assessment_item.get('answers', {}).values()

    def get_correct_answer(self, result_item):
        assessment_item = self._get_assessment_item(result_item)
        answers = assessment_item.get('answers', {})
        if result_item.correct_answer:
            return answers.get(result_item.correct_answer.id, None)
        return list(answers.values())[0]

    def get_is_ac_applied(self, result_item):
        return result_item.body.get('is_ac_applied', False)

    def get_is_manually_graded(self, result_item):
        return result_item.is_manually_graded

    def get_mark(self, result_item):
        assessment_item = self._get_assessment_item(result_item)
        max_mark = assessment_item.get('max_marks', {}).get('total', 0)
        return self._get_mark(result_item, max_mark)

    def get_marks(self, result_item):
        assessment_item = self._get_assessment_item(result_item)
        max_marks = assessment_item.get('max_marks', {})
        return self._get_marks(assessment_item.get('mark_kinds', []), max_marks, result_item)

    def get_multiple_answer(self, result_item):
        assessment_item = self._get_assessment_item(result_item)
        return assessment_item.get('multiple_answer', False)

    def get_need_grading(self, result_item):
        kind = result_item.assessment_item.kind
        return result_item.need_grading or result_item.need_grading_for_units \
            if kind in [AssessmentItem.NUMERIC, AssessmentItem.MF] else result_item.need_grading

    def get_student_answer(self, result_item):
        setting = result_item.assessment_item.setting if result_item.assessment_item else []
        with_sf = 'significant_figure' in setting
        return self._get_student_answer(result_item, with_sf, is_real_answer=with_sf)

    def get_student_image(self, result_item):
        return self._get_student_image(result_item)
