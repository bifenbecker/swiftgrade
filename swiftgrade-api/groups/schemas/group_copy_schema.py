from api.core.doc_utils import BaseSwaggerSchema
from groups.serializers import GroupSerializer, CopyGroupSerializer


class GroupCopySchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Copies a specific group. If there are assessments in the group to be copied, they will also " \
                     "be copied. Students and assessment results will not be copied. New custom assessments of a new " \
                     "group will have ready_for_generation status, generic assessments - ready_for_scan status."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(CopyGroupSerializer())
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        response = {'201': self._get_schema()}
        response.update({'400': self.validation_errors_response()})
        return response

    def _get_schema(self):
        return self.serializer_to_schema(GroupSerializer())
