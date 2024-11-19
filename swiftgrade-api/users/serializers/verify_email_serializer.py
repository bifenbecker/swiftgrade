from django.utils.translation import ugettext as _
from rest_framework import serializers

from groups.models import Group
from users.models import VerificationCode
from users.validators import UserValidator
from users.helpers import UserHelper


class VerifyEmailSerializer(serializers.Serializer):
    group_id = serializers.IntegerField(required=True)
    email = serializers.CharField(max_length=30)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for key in ['null', 'blank']:
            self.fields['email'].error_messages[key] = _("This field is required")

    def validate_email(self, value):
        return UserValidator.validate_email(value, None, "email_invalid")

    def update(self, instance, validated_data):
        group_id = validated_data.pop('group_id', None)
        user = instance
        user.email = validated_data["email"]
        user.enabled_popups["username_is_now_email"] = True
        user.save()
        group = Group.objects.get(id=group_id)
        UserHelper.send_verification_data(VerificationCode.EMAIL_CONFIRMATION_FOR_USER, user, group)
        return user
