from drf_yasg import openapi
from api.core.doc_utils import BaseSwaggerSchema
from users.serializers import SignUpSerializer


class SignUpSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Signs up a user with the role of teacher. Generates and sends a verification code to the " \
                     "provided email to complete registration."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(SignUpSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

