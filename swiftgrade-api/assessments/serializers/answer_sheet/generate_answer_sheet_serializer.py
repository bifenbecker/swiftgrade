from rest_framework import serializers


class GenerateAnswerSheetSerializer(serializers.Serializer):
    amount_of_empty = serializers.IntegerField(required=True)
    assessment_id = serializers.IntegerField(required=True)
    answer_sheet_id = serializers.IntegerField(required=True)
