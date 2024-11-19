from rest_framework import serializers


class AnswerSheetZipSerializer(serializers.Serializer):
    is_download = serializers.BooleanField(required=False, default=False)
    kind = serializers.CharField(required=False)
    uuid = serializers.CharField(required=False)
