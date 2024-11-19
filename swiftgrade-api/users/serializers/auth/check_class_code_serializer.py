from django.utils.translation import ugettext as _

from rest_framework import serializers

from groups.models import Group
from users.validators import StudentValidator


class CheckClassCodeSerializer(serializers.Serializer):
    code = serializers.CharField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for key in ['blank', 'null', 'required']:
            self.fields['code'].error_messages[key] = _('This field is required')

    @staticmethod
    def _get_group(code):
        return Group.manager.filter(code=code).first()

    def validate_code(self, value):
        group = self._get_group(value)
        return StudentValidator.validate_code(group)
