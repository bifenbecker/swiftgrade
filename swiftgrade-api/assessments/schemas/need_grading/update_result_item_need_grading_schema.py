from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import UpdateNeedGradingSerializer


class UpdateResultItemNeedGradingSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Updates need grading values of a specific result item to False. Available only for users " \
                     "with the teacher role."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(UpdateNeedGradingSerializer())
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response(),
        }
