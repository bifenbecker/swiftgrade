from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi

from assessments.serializers import CopyAssessmentSerializer


class CopyAssessmentSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Copies the assessment of a specific group. If there are assessment results for the copied " \
                     "assessment, they will not be copied for the new one. The type - paper or online - can be " \
                     "changed according to the user's preference. Available for users with the teacher role."

    def get_response_serializers(self):
        return {
            '201': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(CopyAssessmentSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]
