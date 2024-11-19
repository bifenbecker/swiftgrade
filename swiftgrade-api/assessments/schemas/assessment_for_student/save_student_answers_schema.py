from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi

from assessments.serializers import StudentSubmitAssessmentSerializer


class SaveStudentAnswersSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        description = ""
        if self.method == 'POST':
            description = 'Creates or updates temporary student answers of the assessment. Available only for ' \
                          'students with the student role.'
        return None, description

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        request_fields = self.serializer_to_schema(StudentSubmitAssessmentSerializer(many=True))
        return [self.make_body_parameter(request_fields)]
