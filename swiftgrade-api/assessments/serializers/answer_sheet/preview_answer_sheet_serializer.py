from rest_framework import serializers


class PreviewAnswerSheetSerializer(serializers.Serializer):
    assessment_id = serializers.IntegerField(required=True)
