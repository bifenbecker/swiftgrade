from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi
from users.serializers import CheckClassCodeSerializer


class CheckClassCodeSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Checks if the class code of a specific group is valid"

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(CheckClassCodeSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]
