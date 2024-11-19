from rest_framework import serializers

from generation_app.services.service_constants import PDF_FORMAT, PNG_FORMAT
from .student_generic_serializer import StudentGenericSerializer
from .class_name_generic_serializer import ClassNameGenericSerializer


class GenerateGenericRequestParamsSerializer(serializers.Serializer):
    uuid = serializers.CharField(required=True, allow_null=False)
    students = StudentGenericSerializer(many=True)
    class_names = ClassNameGenericSerializer(many=True)
    answer_sheet_id_for_blank = serializers.IntegerField(required=False, allow_null=True)
    file_format = serializers.ChoiceField(required=True, choices=[PDF_FORMAT, PNG_FORMAT])
    number_of_answers = serializers.ChoiceField(required=True, choices=range(1, 101))
    number_of_letters = serializers.ChoiceField(required=True, choices=range(2, 6))
    sheets_per_page = serializers.ChoiceField(required=True, choices=[1, 2, 4, 6])
