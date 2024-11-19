from users.serializers import SignInSerializer, UserSerializer
from api.core.doc_utils import BaseSwaggerSchema
from collections import OrderedDict
from drf_yasg import openapi


class SignInSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Signs in a user with the role of teacher or student. Updates is_keep_logged_in field of " \
                     "the user object if necessary and generates access and refresh tokens if email/password " \
                     "fields are valid, provide login device to save last login device."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(SignInSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((
                    ("auth_token", openapi.Schema(type=openapi.TYPE_STRING)),
                    ("login_device", openapi.Schema(type=openapi.TYPE_STRING)),
                    ("refresh_token", openapi.Schema(type=openapi.TYPE_STRING)),
                    ("user", self._get_schema()),
                )),
            ),
            '400': self.validation_errors_response()
        }

    def _get_schema(self):
        return self.serializer_to_schema(UserSerializer())
