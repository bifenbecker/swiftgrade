from datetime import datetime, timedelta

from rest_framework_simplejwt.tokens import AccessToken, BlacklistMixin, Token
from rest_framework_simplejwt.settings import api_settings


class RefreshToken(BlacklistMixin, Token):
    token_type = 'refresh'
    lifetime = api_settings.REFRESH_TOKEN_LIFETIME
    no_copy_claims = (api_settings.TOKEN_TYPE_CLAIM, 'exp', api_settings.JTI_CLAIM, 'jti', )

    def access_token(self, user):
        access = AccessToken()
        access.set_exp(from_time=self._get_exp(user.is_keep_logged_in))
        no_copy = self.no_copy_claims
        for claim, value in self.payload.items():
            if claim in no_copy:
                continue
            access[claim] = value
        return access

    @staticmethod
    def _get_exp(is_keep_logged_in):
        exp = timedelta(days=30) if is_keep_logged_in else timedelta(hours=24)
        return datetime.utcnow() + exp
