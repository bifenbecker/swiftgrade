from rest_framework import serializers

from .base_assessment_serializer import BaseAssessmentSerializer
from assessments.services import CopyAssessmentService


class CopyAssessmentSerializer(BaseAssessmentSerializer):
    assessment_id = serializers.IntegerField(required=True)
    group_id = serializers.IntegerField(required=True)
    name = serializers.CharField(allow_blank=False, max_length=50)
    type = serializers.CharField(allow_blank=False, max_length=255)

    def create(self, validated_data):
        return CopyAssessmentService().call(validated_data)
