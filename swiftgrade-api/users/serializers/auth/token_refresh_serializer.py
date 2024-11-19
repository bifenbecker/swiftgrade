from rest_framework import serializers
from rest_framework_simplejwt.settings import api_settings

from users.models import User
from users.services.auth.refresh_token_service import RefreshToken


class TokenRefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        refresh = RefreshToken(attrs['refresh'])
        user = self._get_user(refresh['user_id'])
        data = {'access': f'JWT {str(refresh.access_token(user))}'}
        if api_settings.ROTATE_REFRESH_TOKENS:
            if api_settings.BLACKLIST_AFTER_ROTATION:
                try:
                    refresh.blacklist()
                except AttributeError:
                    pass
            refresh.set_jti()
            refresh.set_exp()
            data['refresh'] = str(refresh)
        return data

    @staticmethod
    def _get_user(user_id):
        return User.objects.get(id=user_id)