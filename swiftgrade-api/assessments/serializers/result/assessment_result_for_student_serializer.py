from rest_framework import serializers

from assessments.models import AssessmentResultItem
from .assessment_result_item_serializer import AssessmentResultItemSerializer


class AssessmentResultForStudentSerializer(AssessmentResultItemSerializer):
    assessment_item_id = serializers.IntegerField(source="assessment_item.id")
    correct_answer = serializers.SerializerMethodField()
    number = serializers.IntegerField(source="assessment_item.number")

    class Meta:
        model = AssessmentResultItem
        fields = ('id', 'assessment_item_id', 'correct_answer', 'kind', 'is_ac_applied', 'mark', 'marks',
                  'multiple_answer', 'number', 'setting', 'student_answer', 'student_image', )

    def get_correct_answer(self, instance):
        answers = self._get_answers(instance.assessment_item)
        return self._get_correct_answer(answers, instance.correct_answer, instance.assessment_item)
