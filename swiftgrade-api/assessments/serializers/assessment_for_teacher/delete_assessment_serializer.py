from rest_framework import serializers


class DeleteAssessmentSerializer(serializers.Serializer):
    assessments_ids = serializers.ListField(required=True)
    group_id = serializers.IntegerField(required=True)