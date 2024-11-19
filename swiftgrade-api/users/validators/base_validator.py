from django.utils.translation import ugettext as _

from rest_framework import serializers

from users.helpers import UserHelper
from users.services import UserService

VALIDATION_ERRORS = {
    "email": _("Invalid email"),
    "email_invalid": _("Enter a valid email address"),
    "email_exists": _("There is already an account with this email address. Please Log in."),
}


class BaseValidator:
    @classmethod
    def validate_email(cls, email, instance_id, key="email"):

        email = email.lower()
        cls._check_email(email, key)

        instance = UserService.get_user_by_email(email)


        if instance and instance.enabled_popups.get("verify_email"):
            return email

        cls._check_email_exists(instance, instance_id, "email_exists")

        return email

    @staticmethod
    def _check_email(email, key):
        if not UserHelper.check_email(email):
            raise serializers.ValidationError(VALIDATION_ERRORS[key])

    @staticmethod
    def _check_email_exists(instance, instance_id, key):
        if (instance and not instance_id) or (instance and instance_id and instance.id != int(instance_id)):
            raise serializers.ValidationError(VALIDATION_ERRORS[key])
