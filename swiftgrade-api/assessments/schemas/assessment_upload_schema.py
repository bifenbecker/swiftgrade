from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi

from assessments.serializers import AssessmentsFilesListSerializer, AssessmentUploadFileSerializer


class AssessmentUploadSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        summary = None
        if self.method in ["GET"]:
            return summary, "Returns one or more assessment files of the assessment."
        return summary, "Uploads a file of a specific assessment to AWS storage if valid."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(AssessmentUploadFileSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        response = {'200': self._get_schema(kind='single' if self.method == 'POST' else 'list')}
        if self.method == 'POST':
            response.update({'400': self.validation_errors_response()})
        return response

    def _get_schema(self, kind):
        data = self.serializer_to_schema(AssessmentsFilesListSerializer())
        return data if kind == 'single' else openapi.Schema(type=openapi.TYPE_ARRAY, items=data)
