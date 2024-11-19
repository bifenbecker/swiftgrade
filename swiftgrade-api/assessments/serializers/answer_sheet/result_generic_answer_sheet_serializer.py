from rest_framework import serializers


class ResultGenericAnswerSheetSerializer(serializers.Serializer):
    uuid = serializers.CharField(required=True)
    results = serializers.ListField(required=True)
