from rest_framework import serializers
from .generic_batch_serializer import GenericBatchSerializer


class GenericAnswersCroppingSerializer(serializers.Serializer):
    answers_count = serializers.IntegerField(required=True)
    scans = serializers.ListField(child=GenericBatchSerializer(), required=True, allow_empty=False)
