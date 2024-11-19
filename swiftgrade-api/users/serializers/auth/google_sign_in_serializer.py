import json
from os import stat

import requests
from django.conf import settings
from django.utils.translation import ugettext as _
from rest_framework import serializers
from users.helpers import ANDROID, IOS, MOBILE, MOBILE_A, MOBILE_IOS, WEBSITE
from users.models import User
from users.services.auth.sign_in_service import SignInService
from users.validators.user_validator import UserValidator

STATUSES = [User.ACTIVE, User.EMAIL_VERIFICATION]

class GoogleSignInSerializer(serializers.Serializer):
    WEB = 'web'
    CLIENT_IDS = {
        WEB: settings.CLIENT_ID,
        IOS: settings.IOS_CLIENT_ID,
    }
    TOKEN_URL = 'https://oauth2.googleapis.com/token'

    code = serializers.CharField(required=False)
    role = serializers.CharField(required=False)
    token = serializers.CharField(required=True)
    kind = serializers.ChoiceField(choices=[WEB, IOS], default=WEB)
    login_device = serializers.ChoiceField(choices=[ANDROID, IOS, MOBILE, MOBILE_A, MOBILE_IOS, WEBSITE], default=WEBSITE)

    def validate(self, data):
        auth_code = data.get('token', None)
        kind = data['kind']
        code = data.get('code', None)

        # Google auth docs
        # Difference between IOS auth and other systems
        # https://developers.google.com/identity/sign-in/ios/backend-auth?hl=en
        token = self._get_google_id_token(auth_code, kind, code) if kind != IOS else auth_code
        user_data = UserValidator.validate_token(token, kind)

        if user_data:
            role = data.get('role', User.TEACHER)
            device = data.get('login_device')
            result_data = {
                'email': user_data.get('email', None),
                'username': user_data.get('email', None),
                'first_name': SignInService.cut_user_name(user_data.get('given_name', None)),
                'last_name': SignInService.cut_user_name(user_data.get('family_name', None)),
                'role': role,
                'last_login_device': device,
                'sign_up_device': device,
            }
            if role == User.STUDENT and code:
                result_data['code'] = code
            return result_data
        raise serializers.ValidationError({'email': _('Incorrect email or password')})

    def save(self):
        user, prefilled_user_data = SignInService.save_user(self.validated_data)
        return user, prefilled_user_data

    @classmethod
    def _get_google_id_token(cls, auth_code, kind, code):
        request_data = { 'code': auth_code,
                         'client_id': cls.CLIENT_IDS[kind],
                         'client_secret': settings.CLIENT_SECRET,
                         'redirect_uri': f'{settings.SWIFTGRADE_URL}class_code/' if code else f'{settings.SWIFTGRADE_URL}sign_in/',
                         'grant_type': 'authorization_code', }
        response = requests.post(cls.TOKEN_URL, json=request_data)
        return json.loads(response.content).get('id_token')
