from rest_framework import serializers
from .student_generic_serializer import StudentGenericSerializer
from .class_name_generic_serializer import ClassNameGenericSerializer


class PreviewGenericRequestParamsSerializer(serializers.Serializer):
    student = StudentGenericSerializer(allow_null=True, many=True, required=False)
    class_name = ClassNameGenericSerializer(allow_null=True, required=False)
    answer_sheet_for_blank = serializers.BooleanField(required=True, allow_null=False)
    number_of_answers = serializers.ChoiceField(required=True, choices=range(1, 101))
    number_of_letters = serializers.ChoiceField(required=True, choices=range(2, 6))
    sheets_per_page = serializers.ChoiceField(required=True, choices=[1, 2, 4, 6])
