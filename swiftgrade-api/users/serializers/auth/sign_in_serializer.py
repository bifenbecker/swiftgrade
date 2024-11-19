from django.utils.translation import ugettext as _
from rest_framework import serializers
from users.helpers import ANDROID, IOS, MOBILE, MOBILE_A, MOBILE_IOS, WEBSITE
from users.helpers.user_helper import FIELD_REQUIRED_ERRORS
from users.services import UserService


class SignInSerializer(serializers.Serializer):
    email_or_username = serializers.CharField(required=True)
    is_keep_logged_in = serializers.BooleanField(required=True)
    password = serializers.CharField(required=True)
    login_device = serializers.ChoiceField(choices=[ANDROID, IOS, MOBILE, MOBILE_A, MOBILE_IOS, WEBSITE], default=WEBSITE)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for key in ['required', 'blank', 'null']:
            for field_name in ['email_or_username', 'password']:
                self.fields[field_name].error_messages[key] = FIELD_REQUIRED_ERRORS[field_name]

    def validate(self, data):
        email_or_username = data.get('email_or_username', None)
        password = data.get('password', None)

        user = UserService.get_user_by_username(email_or_username)
        is_password_valid = UserService.is_password_valid(user, password)
        
        if not user or not is_password_valid:
            raise serializers.ValidationError({'password': _('Incorrect username or password')})
        data.update({'user': user})
        return data
