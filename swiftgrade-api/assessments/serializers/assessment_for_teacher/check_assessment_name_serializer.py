from rest_framework import serializers
from .base_assessment_serializer import BaseAssessmentSerializer

class CheckAssessmentNameSerializer(BaseAssessmentSerializer, serializers.Serializer):
    group_id = serializers.IntegerField(required=True)
    name = serializers.CharField(required=True, allow_blank=False, max_length=50)
