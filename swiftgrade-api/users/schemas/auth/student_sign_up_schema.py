from drf_yasg import openapi
from api.core.doc_utils import BaseSwaggerSchema
from users.serializers import StudentSignUpSerializer


class StudentSignUpSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Signs up a student. Unlike standard email/password fields, contains a code field. A student " \
                     "can only be registered if he/she has a code of group to which he/she will belong. Generates " \
                     "and sends a verification code to the provided email to complete registration."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(StudentSignUpSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

