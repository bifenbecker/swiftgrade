from collections import OrderedDict

from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema
from users.serializers import AppleSignInSerializer, UserSerializer


class AppleSignInSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Signs in a user through Apple Sign-In. Verifies an authorization code issued by Apple " \
                     "authorization server. Gets prefilled user data according to Apple account info, generates " \
                     "access and refresh tokens if necessary fields are valid."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(AppleSignInSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((
                    ("auth_token", openapi.Schema(type=openapi.TYPE_STRING)),
                    ("refresh_token", openapi.Schema(type=openapi.TYPE_STRING)),
                    ("login_device", openapi.Schema(type=openapi.TYPE_STRING)),
                    ("prefilled_user_data", openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties=OrderedDict((
                            ("first_name", openapi.Schema(type=openapi.TYPE_STRING)),
                            ("last_name", openapi.Schema(type=openapi.TYPE_STRING)),
                        )),
                    )),
                    ("user", self._get_schema()),
                )),
            ),
            '400': self.validation_errors_response()
        }

    def _get_schema(self):
        return self.serializer_to_schema(UserSerializer())
