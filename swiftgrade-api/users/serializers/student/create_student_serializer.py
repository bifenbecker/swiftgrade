from rest_framework import serializers

from users.validators import ListUniqueValidator, StudentValidator 
from users.services import StudentService


class CreateStudentListSerializer(serializers.ListSerializer):
    validators = [ListUniqueValidator(unique_field_names=['username'])]


class CreateStudentSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=30)
    username = serializers.CharField(max_length=30)
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)

    class Meta:
        list_serializer_class = CreateStudentListSerializer

    def validate_username(self, value):
        return StudentValidator.validate_username(value)

    def create(self, validated_data):
        student = StudentService.create_student(validated_data)
        return student
