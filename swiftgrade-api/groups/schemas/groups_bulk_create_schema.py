from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi

from groups.serializers import GroupsListSerializer, GroupsCreateSerializer


class GroupsBulkCreateSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, 'Creates one or more groups with unique names for a specific user with the teacher role. ' \
                     'Calculates the group category depending on the group name.'

    def get_request_body_parameters(self, consumes):
        groups_bulk_create_serializer_schema = self.serializer_to_schema(GroupsCreateSerializer())
        return [self.make_body_parameter(groups_bulk_create_serializer_schema)]

    def get_response_serializers(self):
        if self.method == 'POST':
            return {'200': self._get_schema(), '400': self.validation_errors_response()}
        return super().get_response_serializers()

    def _get_schema(self):
        groups = self.serializer_to_schema(GroupsListSerializer())
        return openapi.Schema(type=openapi.TYPE_ARRAY, items=groups)
