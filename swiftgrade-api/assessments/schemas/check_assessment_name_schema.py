from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import CheckAssessmentNameSerializer
from drf_yasg import openapi


class CheckAssessmentNameSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Checks if the assessment name is valid for a specific group."

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        check_name_serializer_schema = self.serializer_to_schema(CheckAssessmentNameSerializer(), "write")
        return [self.make_body_parameter(check_name_serializer_schema)]
