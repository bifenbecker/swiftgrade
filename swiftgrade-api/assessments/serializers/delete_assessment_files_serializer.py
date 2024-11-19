from rest_framework import serializers


class DeleteAssessmentFilesSerializer(serializers.Serializer):
    files_ids = serializers.ListField(required=True)
