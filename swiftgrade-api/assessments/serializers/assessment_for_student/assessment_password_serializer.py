from django.utils.translation import ugettext as _
from rest_framework import serializers

from assessments.helpers import AssessmentHelper


class AssessmentPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for key in ['null', 'blank']:
            self.fields['password'].error_messages[key] = _("Password required")

    def validate_password(self, value):
        assessment = self.context.get('assessment', None)
        is_password_valid = AssessmentHelper.is_password_valid(assessment, value)
        if not is_password_valid:
            raise serializers.ValidationError(_('Incorrect password'))
        return value
