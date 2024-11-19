from drf_yasg import openapi
from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import AssignedAssessmentsListSerializer


class AssignedAssessmentsListSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns a list of assigned assessments for a specific group to a user with the role of student."

    def get_query_parameters(self):
        return [
            openapi.Parameter(name='group_id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),
        ]

    def get_response_serializers(self):
        return {'200': self._get_schema()}

    def _get_schema(self):
        assessments = self.serializer_to_schema(AssignedAssessmentsListSerializer())
        return openapi.Schema(type=openapi.TYPE_ARRAY, items=assessments)
