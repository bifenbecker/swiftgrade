from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi
from assessments.serializers import AssessmentResultsListForMobileSerializer


class AssessmentResultsForMobileSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns the student recognized results of a specific assessment for a mobile application " \
                     "in the desired order."

    def get_query_parameters(self):
        return [
            openapi.Parameter(name='ordering', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING),
        ]

    def get_response_serializers(self):
        return {
            '200': self._get_schema(),
            '400': self.validation_errors_response()
        }

    def _get_schema(self):
        results = self.serializer_to_schema(AssessmentResultsListForMobileSerializer())
        return openapi.Schema(type=openapi.TYPE_ARRAY, items=results)
