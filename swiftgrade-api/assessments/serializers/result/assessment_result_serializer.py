from assessments.models import AssessmentResult
from rest_framework import serializers


class AssessmentResultSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    kind = serializers.CharField(source="assessment.kind")
    named = serializers.BooleanField(source="answer_sheet_scan.named")

    class Meta:
        model = AssessmentResult
        fields = ('id', 'first_name', 'last_name', 'username', 'kind', 'named', )

    @staticmethod
    def _is_named(result):
        return result.answer_sheet_scan.named and result.answer_sheet_scan.student

    def get_first_name(self, result):
        if self._is_named(result):
            return result.answer_sheet_scan.student.first_name
        return result.recognized_person.first_name if result.recognized_person else None

    def get_last_name(self, result):
        if self._is_named(result):
            return result.answer_sheet_scan.student.last_name
        return result.recognized_person.last_name if result.recognized_person else None

    def get_username(self, result):
        if self._is_named(result):
            return result.answer_sheet_scan.student.username
        return result.recognized_person.username if result.recognized_person else None
