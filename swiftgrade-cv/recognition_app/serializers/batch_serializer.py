from rest_framework import serializers


class BatchSerializer(serializers.Serializer):
    global_id = serializers.CharField(max_length=255, required=True)
    answer_sheet_scan_id = serializers.IntegerField(required=True, allow_null=False)
    urls = serializers.ListField(child=serializers.URLField(), required=True, allow_empty=False)
