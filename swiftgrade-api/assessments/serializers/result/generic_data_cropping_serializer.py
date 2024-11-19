from rest_framework import serializers


class GenericDataCroppingSerializer(serializers.Serializer):
    answer_sheet_scan_id = serializers.IntegerField(required=True)
    results = serializers.JSONField()
