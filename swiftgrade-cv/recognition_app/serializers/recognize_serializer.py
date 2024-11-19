from rest_framework import serializers
from .batch_serializer import BatchSerializer


class RecognizeSerializer(serializers.Serializer):
    CUSTOM = 'custom'
    GENERIC = 'generic'

    answer_sheet_kind = serializers.ChoiceField(choices=[CUSTOM, GENERIC], required=True)
    scans = serializers.ListField(child=BatchSerializer(), required=True, allow_empty=False)
