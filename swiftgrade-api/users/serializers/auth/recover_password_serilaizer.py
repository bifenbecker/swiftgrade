from django.utils.translation import ugettext as _
from rest_framework import serializers

from users.services import UserService


class RecoverPasswordSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)

    def validate_email(self, value):
        user = UserService.get_user_by_email(value)
        if not user:
            raise serializers.ValidationError(_('Email not found'))
        return value.lower()
