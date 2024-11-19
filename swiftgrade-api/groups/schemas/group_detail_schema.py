from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema
from groups.serializers import GroupUpdateSerializer, GroupsListSerializer, GroupsListForStudentSerializer


class GroupDetailSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        description = ""
        if self.method == 'GET':
            description = "Returns detailed information about a specific group. The info depends on the user's role " \
                          "with the only difference that for the student it also returns the teacher_name info, " \
                          "while for teacher it also returns students_count and assessments_count information."
        elif self.method in ['PATCH', 'PUT']:
            description = "Changes the name of a specific group. After successful update prepares the custom answer " \
                          "sheets of the group to regeneration."
        elif self.method == 'DELETE':
            description = "Deletes a specific group and all data associated with the group. The students from the " \
                          "group will still exist but the connection between the group and the students will be lost."
        return None, description

    def get_request_body_parameters(self, consumes):
        if self.method in ['PATCH', 'PUT']:
            serializer_schema = self.serializer_to_schema(GroupUpdateSerializer())
            return [self.make_body_parameter(serializer_schema)]
        return super().get_request_body_parameters(consumes)

    def get_response_serializers(self):
        if self.method == 'GET':
            return {'200': self.serializer_to_schema(GroupsListForStudentSerializer())}
        if self.method in ['PATCH', 'PUT']:
            return {
                '200': self.serializer_to_schema(GroupsListSerializer()),
                '400': self.validation_errors_response(),
            }
        if self.method == "DELETE":
            return {'204': openapi.Schema(type=openapi.TYPE_OBJECT)}
        return super().get_response_serializers()
