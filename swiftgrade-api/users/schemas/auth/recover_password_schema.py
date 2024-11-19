from drf_yasg import openapi
from api.core.doc_utils import BaseSwaggerSchema
from users.serializers import RecoverPasswordSerializer


class RecoverPasswordSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Recovers the password of a specific user. Generates and sends a verification code to the " \
                     "provided email if it is valid to allow a user to reset password."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(RecoverPasswordSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

