import jwt
import requests
from django.conf import settings
from django.utils.translation import ugettext as _
from rest_framework import serializers

from users.models.user import User
from users.services.auth.sign_in_service import SignInService
from users.helpers import ANDROID, IOS, MOBILE, MOBILE_A, MOBILE_IOS, WEBSITE

ACCESS_TOKEN_URL = 'https://appleid.apple.com/auth/token'
STATUSES = [User.ACTIVE, User.EMAIL_VERIFICATION]
WEB = 'web'
APPLE_IDS = {
    WEB: settings.APPLE_CLIENT_ID,
    IOS: settings.APPLE_APP_ID,
}


class AppleSignInSerializer(serializers.Serializer):
    auth_code = serializers.CharField(required=True)
    code = serializers.CharField(required=False)
    role = serializers.CharField(required=False)
    user = serializers.JSONField(required=True, allow_null=True)
    kind = serializers.ChoiceField(choices=[WEB, IOS], default=WEB)
    login_device = serializers.ChoiceField(choices=[ANDROID, IOS, MOBILE, MOBILE_A, MOBILE_IOS, WEBSITE], default=WEBSITE)

    def validate(self, data):
        auth_code = data.get('auth_code', None)
        kind = data.get('kind', WEB)

        id_token = self._get_apple_id_token(auth_code, kind)
        if id_token:
            code = data.get('code', None)
            role = data.get('role', User.TEACHER)
            user = data.get('user', None)
            device = data.get('login_device')
            decoded_token = jwt.decode(id_token, options={"verify_signature": False})
            email = decoded_token['email'] if 'email' in decoded_token else None
            email = email.lower() if email else None
            result_data = {'email': email, 'username': email, 'role': role}
            result_data.update(self._get_user_name(user))
            result_data.update({'last_login_device': device, 'sign_up_device': device})
            if role == User.STUDENT and code:
                result_data['code'] = code
            return result_data
        raise serializers.ValidationError({'email': _('Incorrect email or password')})

    def save(self):
        user, prefilled_user_data = SignInService.save_user(self.validated_data)
        return user, prefilled_user_data

    @staticmethod
    def _get_user_name(user):
        name = user.get('name', None) if user else None
        return {
            'first_name': SignInService.cut_user_name(name.get('firstName')) if name else None,
            'last_name': SignInService.cut_user_name(name.get('lastName')) if name else None
        }

    @staticmethod
    def _get_apple_id_token(auth_code, kind):
        client_secret = SignInService.generate_client_secret(APPLE_IDS[kind])
        headers = {'content-type': "application/x-www-form-urlencoded"}
        request_data = {
            'client_id': APPLE_IDS[kind],
            'client_secret': client_secret,
            'code': auth_code,
            'grant_type': 'authorization_code',
        }
        response = requests.post(ACCESS_TOKEN_URL, data=request_data, headers=headers).json()
        return response.get('id_token', None)
