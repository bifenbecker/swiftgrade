from api.core.doc_utils import BaseSwaggerSchema, OpenapiConverter
from collections import OrderedDict
from drf_yasg import openapi

from groups.serializers import GroupsListSerializer


class GroupsCreateListSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        description = ""
        if self.method == "GET":
            description = "Returns a list of groups for a specific user based on the user's role. To the teacher it " \
                          "returns a list of the groups he/she created. For the student it returns a list of groups " \
                          "to which he/she belongs."
        elif self.method == "POST":
            description = "Creates a new group with a unique name for a specific user with the teacher role. " \
                          "Generates a unique group code for adding students, calculates the group category " \
                          "depending on the group name."
        return None, description

    def get_response_serializers(self):
        if self.method == 'POST':
            response = {
                '200': openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties=OrderedDict((
                            ("group_id", openapi.Schema(type=openapi.TYPE_INTEGER)),
                        )),
                    ),
                '400': self.validation_errors_response()
            }
            return response
        if self.method == 'GET':
            return {'200': self._get_schema()}
        return super().get_response_serializers()

    def get_request_body_parameters(self, consumes):
        if self.method in ["POST"]:
            request_fields = OpenapiConverter.convert_fields_in_schema([
                openapi.Parameter(name='name', in_=openapi.IN_BODY, type=openapi.TYPE_STRING),
                openapi.Parameter(name='color', in_=openapi.IN_BODY, type=openapi.TYPE_STRING),
            ])
            return [self.make_body_parameter(request_fields)]
        return super().get_request_body_parameters(consumes)

    def _get_schema(self):
        groups = self.serializer_to_schema(GroupsListSerializer())
        return openapi.Schema(type=openapi.TYPE_ARRAY, items=groups)
