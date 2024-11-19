from rest_framework import serializers
from assessments.models import AssessmentResultItem

from .assessment_result_item_serializer import AssessmentResultItemSerializer


class AssessmentResultForStudentWithAnswersSerializer(AssessmentResultItemSerializer):
    answers = serializers.SerializerMethodField()
    assessment_item_id = serializers.IntegerField(source="assessment_item.id")
    correct_answer = serializers.SerializerMethodField()
    number = serializers.IntegerField(source="assessment_item.number")

    class Meta:
        model = AssessmentResultItem
        fields = ('id', 'answers', 'assessment_item_id', 'correct_answer', 'kind', 'number', 'mark', 'marks',
                  'multiple_answer', 'setting', 'student_answer', 'is_ac_applied', 'student_image', )

    def get_answers(self, instance):
        return self._get_answers(instance.assessment_item)

    def get_correct_answer(self, instance):
        answers = self._get_answers(instance.assessment_item)
        return self._get_correct_answer(answers, instance.correct_answer, instance.assessment_item)
