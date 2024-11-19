from django.utils.translation import ugettext as _
from rest_framework import serializers
from users.models import User

from .base_validator import BaseValidator
from users.helpers import UserHelper
from users.services import UserService

EMAIL_VALID_FORMAT = "^[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,4}$"
VALIDATION_ERRORS = {
    "code": _("Class code not found. Please check with your teacher and enter a new code"),
    "username": _("Invalid username"),
    "email": _("Invalid email address"),
    "username_or_email": _("Username is already taken"),
}


class StudentValidator(BaseValidator):
    @staticmethod
    def validate_code(group):
        if not group:
            raise serializers.ValidationError(VALIDATION_ERRORS["code"])
        return group.code

    @staticmethod
    def validate_username(value):
        if value.find('@') > 0:
            if not UserHelper.check_email(value):
                raise serializers.ValidationError(VALIDATION_ERRORS['email'])
        else:
            if not UserHelper.check_username(value):
                raise serializers.ValidationError(VALIDATION_ERRORS['username'])
        user_by_email = UserService.get_user_by_email(value, statuses=[User.ACTIVE, User.EMAIL_VERIFICATION])
        user_by_username = UserService.get_user_by_username(value, statuses=[User.ACTIVE, User.EMAIL_VERIFICATION])
        if user_by_email or user_by_username:
            raise serializers.ValidationError(VALIDATION_ERRORS['username_or_email'])
        return value
