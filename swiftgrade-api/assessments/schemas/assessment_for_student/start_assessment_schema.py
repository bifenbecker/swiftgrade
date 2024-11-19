from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi

from assessments.serializers import AssessmentPasswordSerializer


class StartAssessmentSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        description = ""
        if self.method == 'POST':
            description = 'If the password is in the request data, it checks it for validity. Creates a new ' \
                          'completed assessment object or updates it for a specific user. Available only for ' \
                          'users with a role of student.'
        return None, description

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        assessment_password_serializer_schema = self.serializer_to_schema(AssessmentPasswordSerializer())
        return [self.make_body_parameter(assessment_password_serializer_schema)]
