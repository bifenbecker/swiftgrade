from users.serializers import UserSerializer, CheckAutoSignInSerializer
from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi


class CheckAutoSignInSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Tracks user's login each time when a user open the app. Updates last_login value according to " \
                     "the current date, creates new entry in the LoginHistory table to store user's login history."

    def get_response_serializers(self):
        return {
            "204": openapi.Schema(type=openapi.TYPE_OBJECT),
            "400": self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(CheckAutoSignInSerializer())
        return [self.make_body_parameter(serializer_schema)]

    def _get_schema(self):
        return self.serializer_to_schema(UserSerializer())
