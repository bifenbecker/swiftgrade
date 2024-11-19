from django.utils.translation import ugettext as _
from rest_framework import serializers

from groups.validators import GroupValidator


class GroupJoinSerializer(serializers.Serializer):
    code = serializers.CharField(required=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for key in ['blank', 'null', 'required']:
            self.fields['code'].error_messages[key] = _('This field is required')

    def validate(self, data):
        code = data.get('code', None)
        user = self.context.get('user')
        return GroupValidator.validate_code(code, user)

    def create(self, validated_data):
        user = self.context.get('user')
        validated_data['group'].students.add(user.student)
        return validated_data['group']
