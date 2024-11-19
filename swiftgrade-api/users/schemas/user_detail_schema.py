from api.core.doc_utils import BaseSwaggerSchema
from users.serializers import UserUpdateSerializer, UserSerializer


class UserDetailSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        description = ""
        if self.method == 'GET':
            description = "Returns detailed information about a specific user."
        elif self.method in ['PATCH', 'PUT']:
            description = "Updates information about a specific user. After a successful user update it prepares " \
                          "the custom answer sheets to regeneration if a user has a student role. " \
                          "Only custom answer sheets of the groups to which the user belongs can be regenerated."
        return None, description

    def get_request_body_parameters(self, consumes):
        if self.method in ['PATCH', 'PUT']:
            serializer_schema = self.serializer_to_schema(UserUpdateSerializer())
            return [self.make_body_parameter(serializer_schema)]
        return super().get_request_body_parameters(consumes)

    def get_response_serializers(self):
        response = {'200': self._get_schema()}
        if self.method in ['PATCH', 'PUT']:
            response.update({'400': self.validation_errors_response()})
        return response

    def _get_schema(self):
        return self.serializer_to_schema(UserSerializer())
