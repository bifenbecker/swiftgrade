from assessments.models import AssessmentResult
from rest_framework import serializers

from .base_assessment_results_list_serializer import BaseAssessmentResultsListSerializer


class AssessmentResultsListForDownloadSerializer(BaseAssessmentResultsListSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()
    mark = serializers.SerializerMethodField()
    mark_percentage = serializers.SerializerMethodField()    

    class Meta:
        model = AssessmentResult
        fields = ('first_name', 'last_name', 'email', 'mark', 'mark_percentage')