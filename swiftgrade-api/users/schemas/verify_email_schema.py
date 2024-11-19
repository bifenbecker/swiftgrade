from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema
from users.serializers import VerifyEmailSerializer


class VerifyEmailSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Check user email and send verify notification if email pass validation."                    

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(VerifyEmailSerializer())
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response(),
        }
