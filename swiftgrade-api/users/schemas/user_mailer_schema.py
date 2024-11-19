from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema
from users.serializers import UserMailerSerializer


class UserMailerSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Sends email with entered address to ADMIN's address. Email also contains the information about " \
                     "a preferable version of the landing page."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(UserMailerSerializer())
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response(),
        }
