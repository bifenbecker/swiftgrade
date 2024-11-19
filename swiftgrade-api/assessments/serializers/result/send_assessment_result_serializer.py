from rest_framework import serializers


class SendAssessmentResultSerializer(serializers.Serializer):
    type = serializers.CharField(required=True)
    ids = serializers.ListField(child=serializers.IntegerField())
