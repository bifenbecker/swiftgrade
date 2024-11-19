from rest_framework import serializers

from assessments.constants import DEFAULT_FILE_FORMAT, DEFAULT_NUMBER_OF_ANSWERS, DEFAULT_NUMBER_OF_LETTERS, DEFAULT_SHEETS_PER_PAGE


class GenerateGenericAnswerSheetSerializer(serializers.Serializer):
    class_names = serializers.ListField(required=True)
    file_format = serializers.ChoiceField(required=False, choices=['PDF', 'PNG'], default=DEFAULT_FILE_FORMAT)
    number_of_answers = serializers.IntegerField(required=False, default=DEFAULT_NUMBER_OF_ANSWERS)
    number_of_letters = serializers.IntegerField(required=False, default=DEFAULT_NUMBER_OF_LETTERS)
    sheets_per_page = serializers.ChoiceField(required=False, choices=[1, 2, 4, 6] ,default=DEFAULT_SHEETS_PER_PAGE)
