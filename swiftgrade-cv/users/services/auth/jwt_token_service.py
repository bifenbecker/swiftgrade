from rest_framework_jwt.settings import api_settings


class JWTTokenService:

    @classmethod
    def handle_payload(self, user):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        payload = jwt_payload_handler(user)
        payload["user_id"] = user.pk
        return payload

    @classmethod
    def generate(self, user):
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = self.handle_payload(user)
        token = jwt_encode_handler(payload)

        return 'JWT ' + token
