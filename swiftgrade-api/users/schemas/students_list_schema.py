from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi

from users.serializers import StudentsListSerializer


class StudentsListSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns a list of students from a specific group in the desired order. Available only for " \
                     "users with teacher role."

    def get_query_parameters(self):
        if self.method == "GET":
            return [
                openapi.Parameter(name='group_id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),
                openapi.Parameter(name='ordering', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING),
            ]
        return []

    def get_response_serializers(self):
        return {'200': self._get_schema()}

    def _get_schema(self):
        students = self.serializer_to_schema(StudentsListSerializer())
        return openapi.Schema(type=openapi.TYPE_ARRAY, items=students)
