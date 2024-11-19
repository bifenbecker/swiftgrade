from rest_framework import serializers
from users.helpers import ANDROID, IOS, MOBILE, MOBILE_A, MOBILE_IOS, WEBSITE, UserHelper
from users.models import User, VerificationCode
from users.services import UserService, BigMailerService

from .auth_serializer import AuthSerializer


class SignUpSerializer(AuthSerializer):
    
    is_keep_logged_in = serializers.BooleanField(read_only=True)
    sign_up_device = serializers.ChoiceField(choices=[ANDROID, IOS, MOBILE, MOBILE_A, MOBILE_IOS, WEBSITE], default=WEBSITE)

    def create(self, validated_data):
        user, is_created = UserService.update_or_create(validated_data, [User.EMAIL_VERIFICATION])
        BigMailerService.create_contact(user)
        UserHelper.send_verification_data(VerificationCode.EMAIL_CONFIRMATION_FOR_USER, user)
        return user
