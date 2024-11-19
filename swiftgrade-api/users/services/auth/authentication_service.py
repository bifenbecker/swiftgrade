from django.utils.translation import ugettext as _

from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed, InvalidToken, TokenError

from users.models import User


class BaseJSONWebTokenAuthentication(JWTTokenUserAuthentication):
    """
    Token based authentication using the JSON Web Token standard.
    """
    def authenticate(self, request):
        header = self.get_header(request)
        if header is None:
            return None

        raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None
        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token

    def get_raw_token(self, header):
        parts = header.split()
        if len(parts) == 0:
            # Empty AUTHORIZATION header sent
            return None
        if parts[0] not in api_settings.AUTH_HEADER_TYPES:
            return None

        if len(parts) != 2:
            raise AuthenticationFailed(
                _('Authorization header must contain two space-delimited values'),
                code='bad_authorization_header',
            )
        return parts[1]

    def get_validated_token(self, raw_token):
        messages = []
        for AuthToken in api_settings.AUTH_TOKEN_CLASSES:
            try:
                return AuthToken(raw_token)
            except TokenError as e:
                messages.append({'token_class': AuthToken.__name__,
                                 'token_type': AuthToken.token_type,
                                 'message': e.args[0]})
        raise InvalidToken({
            'detail': _('Given token not valid for any token type'),
            'messages': messages,
        })

    def get_user(self, validated_token):
        """
        Attempts to find and return a user using the given validated token.
        """
        try:
            user_id = validated_token[api_settings.USER_ID_CLAIM]
        except KeyError:
            raise InvalidToken(_('Token contained no recognizable user identification'))

        try:
            user = User.objects.get(**{api_settings.USER_ID_FIELD: user_id})
        except User.DoesNotExist:
            raise AuthenticationFailed(_('User not found'), code='user_not_found')
        return user


class JSONWebTokenAuthentication(BaseJSONWebTokenAuthentication):
    """
    Clients should authenticate by passing the token key in the "Authorization"
    HTTP header, prepended with the string specified in the setting
    `JWT_AUTH_HEADER_PREFIX`. For example:

        Authorization: JWT eyJhbGciOiAiSFMyNTYiLCAidHlwIj
    """
    www_authenticate_realm = 'api'

    def get_header(self, request):
        """
        Extracts the header containing the JSON web token from the given
        request.
        """
        header = request.headers.get(api_settings.AUTH_HEADER_NAME)
        return header
