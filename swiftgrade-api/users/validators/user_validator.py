import re
from swiftgrade_api.settings.common import CLIENT_ID

from api.core.logger.custom_logger import CustomLogger

from django.conf import settings
from django.utils.translation import ugettext as _

from rest_framework import serializers

from google.oauth2 import id_token
from google.auth.transport import requests


from users.services import UserService
from .base_validator import BaseValidator

logger = CustomLogger.get_logger(__name__, 'user_validator.log')

PASSWORD_MIN_LENGTH = 8
VALIDATION_ERRORS = {
    "password_length": _("Password must be at least 8 characters"),
    "password_number": _("Password must contain at least 1 number"),
    "password_special_character": _("Password must contain at least 1 special character"),
    "password_uppercase": _("Password must contain at least 1 uppercase letter"),
    "password_lowercase": _("Password must contain at least 1 lowercase letter"),
}


class UserValidator(BaseValidator):
    @staticmethod
    def validate_password(value):
        if len(value) < PASSWORD_MIN_LENGTH:
            raise serializers.ValidationError(VALIDATION_ERRORS["password_length"])
        elif not re.findall('\d', value):
            raise serializers.ValidationError(VALIDATION_ERRORS["password_number"])
        elif not re.findall('[A-Z]', value):
            raise serializers.ValidationError(VALIDATION_ERRORS["password_uppercase"])
        elif not re.findall('[a-z]', value):
            raise serializers.ValidationError(VALIDATION_ERRORS["password_lowercase"])
        elif not re.findall('[()[\]{}|\\`~!@#$%^&*_\-+=;:\'",<>./?]', value):
            raise serializers.ValidationError(VALIDATION_ERRORS["password_special_character"])

        return value

    @staticmethod
    def validate_prev_password(instance, password):
        if not UserService.is_password_valid(instance, password):
            raise serializers.ValidationError(_("Incorrect current password"))
        return password

    @staticmethod
    def validate_token(value, kind):
        try:
            client_ids = { 'web': settings.CLIENT_ID,
                           'ios': settings.IOS_CLIENT_ID }
            user = id_token.verify_oauth2_token(value, requests.Request(), client_ids.get(kind))
            return user
        except ValueError as e:
            logger.error(e)
            return None
