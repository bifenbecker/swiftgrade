from rest_framework import serializers


class RecognitionSerializer(serializers.Serializer):
    answer_sheet_scan_id = serializers.IntegerField(required=True)
    global_id = serializers.CharField(required=True, allow_blank=False, max_length=50)
    results = serializers.JSONField()
    error = serializers.BooleanField(required=True)
    error_message = serializers.CharField(required=False, allow_blank=True, max_length=50)
