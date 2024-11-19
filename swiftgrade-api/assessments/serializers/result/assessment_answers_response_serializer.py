from assessments.models import AssessmentResultItem
from decimal import Decimal
from rest_framework import serializers

from .assessment_result_item_serializer import AssessmentResultItemSerializer

MARK = Decimal('0.00')


class AssessmentAnswersResponseSerializer(AssessmentResultItemSerializer):
    answers = serializers.SerializerMethodField()
    assessment_result_id = serializers.IntegerField(source="assessment_result.id")
    correct_answer = serializers.SerializerMethodField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    student_image = serializers.SerializerMethodField()

    class Meta:
        model = AssessmentResultItem
        fields = ('id', 'answers', 'assessment_result_id', 'correct_answer', 'first_name', 'is_ac_applied', 'last_name',
                  'kind', 'mark', 'marks', 'multiple_answer', 'need_grading', 'setting', 'student_answer',
                  'student_image')
