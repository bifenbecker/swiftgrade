from .base_assessment_serializer import BaseAssessmentSerializer

from assessments.services import CreateAssessmentService
from rest_framework import serializers


class AssessmentCreateSerializer(BaseAssessmentSerializer):
    group_id = serializers.IntegerField(required=True)
    name = serializers.CharField(required=True)
    assessment_items = serializers.ListField(required=True)
    compare_by_characters = serializers.BooleanField(allow_null=True, required=False)
    type = serializers.CharField(required=True)

    def create(self, validated_data):
        group_id = validated_data.pop('group_id', None)
        return CreateAssessmentService(group_id).call(validated_data)
