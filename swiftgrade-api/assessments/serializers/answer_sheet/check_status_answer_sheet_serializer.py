from rest_framework import serializers


class CheckStatusAnswerSheetSerializer(serializers.Serializer):
    uuid = serializers.CharField(required=True)
