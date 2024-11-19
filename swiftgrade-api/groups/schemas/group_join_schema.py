from api.core.doc_utils import BaseSwaggerSchema
from groups.serializers import GroupJoinSerializer, GroupsListForStudentSerializer
from drf_yasg import openapi


class GroupJoinSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns a list of groups for the specific user with the student role. Joins a user to the " \
                     "group with a specific class code. Prepares the custom answer sheets to regeneration (only " \
                     "custom answer sheets of the groups to which the user belongs can be regenerated)."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(GroupJoinSerializer())
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {'200': self._get_schema(), '400': self.validation_errors_response()}

    def _get_schema(self):
        groups = self.serializer_to_schema(GroupsListForStudentSerializer())
        return openapi.Schema(type=openapi.TYPE_ARRAY, items=groups)
