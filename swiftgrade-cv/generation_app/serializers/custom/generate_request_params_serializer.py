from rest_framework import serializers
from .question_serializer import QuestionSerializer
from .student_serializer import StudentSerializer
from .assessment_serializier import AssessmentSerializer


class GenerateRequestParamsSerializer(serializers.Serializer):
    assessment = AssessmentSerializer()
    questions = QuestionSerializer(many=True)
    students = StudentSerializer(many=True)
    class_name = serializers.CharField(max_length=255, required=True)
    amount_of_empty = serializers.IntegerField(required=True)
