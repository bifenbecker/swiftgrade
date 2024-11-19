from django.utils.translation import ugettext as _
from groups.models import Group
from rest_framework import serializers
from users.helpers import ANDROID, IOS, MOBILE, MOBILE_A, MOBILE_IOS, WEBSITE, UserHelper
from users.models import Student, User, VerificationCode
from users.services import UserService
from users.validators import StudentValidator

from .auth_serializer import AuthSerializer


class StudentSignUpSerializer(AuthSerializer):
    code = serializers.CharField(required=True)
    sign_up_device = serializers.ChoiceField(choices=[ANDROID, IOS, MOBILE, MOBILE_A, MOBILE_IOS, WEBSITE], default=WEBSITE)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for key in ['blank', 'null', 'required']:
            self.fields['code'].error_messages[key] = _('This field is required')

    @staticmethod
    def _get_group(code):
        return Group.manager.filter(code=code).first()

    @staticmethod
    def _create_student(user):
        if not hasattr(user, 'student'):
            Student.objects.create(user=user)

    def _create_user(self, data):
        data.update({'role': User.STUDENT})
        user, is_created = UserService.update_or_create(data, [User.EMAIL_VERIFICATION])
        self._create_student(user)
        return user

    def validate_code(self, value):
        group = self._get_group(value)
        return StudentValidator.validate_code(group)

    def create(self, validated_data):
        code = validated_data.pop('code')
        user = self._create_user(validated_data)
        group = self._get_group(code)
        UserHelper.send_verification_data(VerificationCode.EMAIL_CONFIRMATION_FOR_USER, user, group)
        return user


