from assessments.models import AssessmentResult
from rest_framework import serializers

from .base_assessment_results_list_serializer import BaseAssessmentResultsListSerializer


class AssessmentResultsListForMobileSerializer(BaseAssessmentResultsListSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()
    username = serializers.CharField()
    created_at = serializers.DateTimeField()
    kind = serializers.CharField(source="assessment.kind")
    named = serializers.SerializerMethodField()
    need_grading = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    personal_data_image = serializers.SerializerMethodField()

    class Meta:
        model = AssessmentResult
        fields = ('id', 'created_at', 'first_name', 'last_name', 'email', 'username', 'total', 'kind',
                  'named', 'need_grading', 'personal_data_image')