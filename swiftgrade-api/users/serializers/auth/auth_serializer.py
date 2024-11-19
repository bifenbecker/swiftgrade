from rest_framework import serializers

from users.helpers.user_helper import FIELD_REQUIRED_ERRORS
from users.models import User
from users.validators import UserValidator

PASSWORD_MIN_LENGTH = 6


class AuthSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    class Meta:
        model = User

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for key in ['required', 'blank', 'null']:
            for field_name in ['email', 'password']:
                self.fields[field_name].error_messages[key] = FIELD_REQUIRED_ERRORS[field_name]

    def validate_email(self, value):
        return UserValidator.validate_email(value, None)

    def validate_password(self, value):
        return UserValidator.validate_password(value)
