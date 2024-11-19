from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi

from assessments.serializers import DeleteAssessmentFilesSerializer


class DeleteAssessmentFilesSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Removes one or more files of a specific assessment. Available for users with the teacher role."

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(DeleteAssessmentFilesSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]
