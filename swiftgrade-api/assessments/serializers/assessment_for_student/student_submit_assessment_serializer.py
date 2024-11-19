from django.utils.translation import ugettext as _
from rest_framework import serializers
from assessments.models import AssessmentItem


class AnswerField(serializers.Field):
    def to_internal_value(self, value):
        return value


class StudentSubmitAssessmentSerializer(serializers.Serializer):
    assessment_id = serializers.IntegerField(required=True)
    body = AnswerField()
    kind = serializers.CharField(required=True)
    is_flag_checked = serializers.BooleanField(required=False)

    def validate(self, attrs):
        body = attrs.get('body', None)
        kind = attrs.get('kind', None)

        if kind == AssessmentItem.MC and isinstance(body, list):
            body = [1 if item in body else 0 for item in ['A', 'B', 'C', 'D', 'E']]
            attrs.update({'body': {'answer': body}})
            return attrs

        if kind == AssessmentItem.FIB and isinstance(body, str):
            attrs.update({'body': {'answer': body.strip()}})
            return attrs

        if kind in [AssessmentItem.MF, AssessmentItem.NUMERIC] and isinstance(body, dict):
            return attrs

        raise serializers.ValidationError({"error": _("Incorrect answer")})
