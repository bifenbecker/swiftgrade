from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi

from users.serializers import DeleteStudentsSerializer


class DeleteStudentsSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Deletes one or more students of the specific group. If a student is removed from a group " \
                     "he/she can still exist in other groups. Also removes answer sheet scans associated to the " \
                     "users, prepares the custom answer sheets to regeneration (only custom answer sheets of the " \
                     "groups to which the user belongs can be regenerated). Updates a status of assessments " \
                     "with no results (for custom assessments - ready_for_generation, generic - ready_for_scan)." \
                     "Available only for users with a role of teacher."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(DeleteStudentsSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }
