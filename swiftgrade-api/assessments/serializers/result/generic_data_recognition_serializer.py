from rest_framework import serializers

class PersonItemSerializer(serializers.Serializer):
    url = serializers.CharField(required=True, allow_blank=True)
    value = serializers.CharField(required=True, allow_blank=True)
    error_message = serializers.CharField(required=True, allow_blank=True)
    error = serializers.BooleanField()


class GenericDataRecognitionSerializer(serializers.Serializer):
    answer_sheet_scan_id = serializers.IntegerField(required=True)
    first_name = PersonItemSerializer()
    last_name = PersonItemSerializer()
    email = PersonItemSerializer()
