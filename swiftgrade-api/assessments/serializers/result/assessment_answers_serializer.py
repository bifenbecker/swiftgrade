from rest_framework import serializers


class AssessmentAnswersSerializer(serializers.Serializer):
    ordering = serializers.CharField(required=True)
    filters = serializers.ListField(required=True)
    number = serializers.IntegerField(required=True)
