from collections import OrderedDict

from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import AssessmentAnalysisResponseSerializer


class AssessmentAnalysisSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns statistics about how the students of the class passed an appropriate assessment by " \
                     "answers. Calculates amount of correct, incorrect, partially correct, unanswered student " \
                     "results and also returns most common student answers (Top-5). Available only for users with " \
                     "the teacher role."

    def get_query_parameters(self):
        if self.method == 'GET':
            return [openapi.Parameter(name='ordering', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)]
        return []

    def get_response_serializers(self):
        return {'200': openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=OrderedDict((
                ('count', openapi.Schema(type=openapi.TYPE_INTEGER)),
                ('data', self._get_schema()),
            ))
        )}

    def _get_schema(self):
        analysis_data = self.serializer_to_schema(AssessmentAnalysisResponseSerializer())
        return openapi.Schema(type=openapi.TYPE_ARRAY, items=analysis_data)
