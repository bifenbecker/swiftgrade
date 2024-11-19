from django.contrib.auth.hashers import make_password
from django.utils.translation import ugettext as _
from rest_framework import serializers
from users.helpers.user_helper import FIELD_REQUIRED_ERRORS
from users.services import UserService
from users.validators import UserValidator
from users.models import User
from .field_choices import GENDER_CHOICES, SCHOOL_TYPE_CHOICES


class UserUpdateSerializer(serializers.Serializer):
    enabled_popups = serializers.JSONField(required=False)
    enabled_tutorials = serializers.JSONField(required=False)
    enabled_pulse_buttons = serializers.JSONField(required=False)
    gender = serializers.ChoiceField(required=False, choices=GENDER_CHOICES)
    phone = serializers.CharField(required=False, allow_blank=False, max_length=15)
    first_name = serializers.CharField(required=False, max_length=30)
    last_name = serializers.CharField(required=False, max_length=30)
    password = serializers.CharField(write_only=True, required=False)
    prev_password = serializers.CharField(write_only=True, required=False)
    school_type = serializers.ChoiceField(required=False, choices=SCHOOL_TYPE_CHOICES)
    subjects = serializers.ListField(required=False)
    tutorials_progress = serializers.JSONField(required=False)
    is_any_password = serializers.BooleanField(default=False, required=False)
    username = serializers.CharField(required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for key in ["blank", "null"]:
            for field_name in self.fields.keys():
                error_message = FIELD_REQUIRED_ERRORS["password"] \
                    if field_name in ["prev_password", "password"] else _("This field is required")
                self.fields[field_name].error_messages[key] = error_message

    def validate_prev_password(self, value):
        return UserValidator.validate_prev_password(self.instance, value)

    def validate_password(self, value):
        is_any_password = self.initial_data.get('is_any_password', False)
        return value if is_any_password else UserValidator.validate_password(value)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        for key in ['prev_password']:
            validated_data.pop(key, None)
        return UserService.update_user(instance, validated_data)
