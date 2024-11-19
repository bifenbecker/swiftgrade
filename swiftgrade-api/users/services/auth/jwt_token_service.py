from .refresh_token_service import RefreshToken


class JWTTokenService:
    @classmethod
    def generate(self, user):
        token = RefreshToken.for_user(user)
        return {
            'auth_token': f'JWT {str(token.access_token(user))}',
            'refresh_token': str(token),
        }
