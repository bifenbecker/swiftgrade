from rest_framework import serializers


class ResultAnswerSheetSerializer(serializers.Serializer):
    named_coordinates_id = serializers.CharField(required=True, allow_null=True)
    unnamed_coordinates_id = serializers.CharField(required=True, allow_null=True)
    named_page_count = serializers.CharField(required=True)
    success = serializers.BooleanField(required=True)
    unnamed_page_count = serializers.CharField(required=True)
    url = serializers.CharField(required=True)
