from collections import OrderedDict
from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema
from users.serializers import TokenRefreshSerializer


class TokenRefreshSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Refreshes token. Takes a refresh web token and returns a new access web token and refresh " \
                     "token if the refresh token is valid. Lifetime of an access token: 30 days if the " \
                     "is_keep_logged_in field of the user object is set to True, otherwise 24h."


    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(TokenRefreshSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((
                    ("access", openapi.Schema(type=openapi.TYPE_STRING)),
                    ("refresh", openapi.Schema(type=openapi.TYPE_STRING)),
                )),
            ),
            '400': self.validation_errors_response()
        }
