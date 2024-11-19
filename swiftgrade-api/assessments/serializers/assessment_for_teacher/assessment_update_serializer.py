from .base_assessment_serializer import BaseAssessmentSerializer
from assessments.services import UpdateAssessmentService
from rest_framework import serializers


class AssessmentUpdateSerializer(BaseAssessmentSerializer):
    assessment_items = serializers.ListField(required=False)
    name = serializers.CharField(required=False, allow_blank=False, max_length=50)
    remark_type = serializers.CharField(required=False, allow_blank=False, allow_null=True, max_length=50)
    status = serializers.CharField(required=False)

    def update(self, instance, validated_data):
        return UpdateAssessmentService(instance).call(validated_data)
