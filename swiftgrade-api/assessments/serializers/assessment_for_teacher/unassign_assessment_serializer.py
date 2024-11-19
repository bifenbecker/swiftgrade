from rest_framework import serializers

from assessments.services import AssessmentService


class UnassignAssessmentSerializer(serializers.Serializer):
    group_id = serializers.IntegerField(required=True)
