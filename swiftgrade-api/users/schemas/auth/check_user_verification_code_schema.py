from collections import OrderedDict
from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema
from users.serializers import UserSerializer, CheckVerificationCodeSerializer


class CheckUserVerificationCodeSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Checks if the verification code is valid or not expired for a specific user. Generates and " \
                     "returns access and refresh tokens with detailed information about the user. Adds a user " \
                     "to a specific group if he/she has the student role."

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((
                    ('user', self._get_schema()),
                    ('auth_token', openapi.Schema(type=openapi.TYPE_STRING)),
                    ('refresh_token', openapi.Schema(type=openapi.TYPE_STRING)),
                ))
            ),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(CheckVerificationCodeSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]

    def _get_schema(self):
        return self.serializer_to_schema(UserSerializer())
