from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import (
    AssessmentsFilesListSerializer,
    AssessmentBatchUploadFileSerializer,
)


class AssessmentBatchUploadSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Uploads assessment files to AWS storage if all of them are valid."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(AssessmentBatchUploadFileSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
            '200': self._get_schema(),
            '400': self.validation_errors_response()
        }

    def _get_schema(self):
        return self.serializer_to_schema(AssessmentsFilesListSerializer())
