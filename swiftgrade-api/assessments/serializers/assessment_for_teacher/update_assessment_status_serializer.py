from rest_framework import serializers


class UpdateAssessmentStatusSerializer(serializers.Serializer):
    key = serializers.ChoiceField(choices=['prev_status', 'next_status'])
