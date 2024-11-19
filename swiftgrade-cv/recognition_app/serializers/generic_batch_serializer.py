from rest_framework import serializers


class GenericBatchSerializer(serializers.Serializer):
    answer_sheet_scan_id = serializers.IntegerField(required=True, allow_null=False)
    global_id = serializers.CharField(max_length=255, required=True)
    named = serializers.BooleanField(required=True)
    url = serializers.CharField(max_length=500, required=True)
