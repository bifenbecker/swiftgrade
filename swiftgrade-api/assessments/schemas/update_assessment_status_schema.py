from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import UpdateAssessmentStatusSerializer, AssessmentSerializer


class UpdateAssessmentStatusSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Updates the status of the assessment after scanning the answer sheets. " \
                     "Available for users with the teacher role."

    def get_response_serializers(self):
        return {'200': self._get_schema(), '400': self.validation_errors_response()}

    def get_request_body_parameters(self, consumes):
        check_name_serializer_schema = self.serializer_to_schema(UpdateAssessmentStatusSerializer())
        return [self.make_body_parameter(check_name_serializer_schema)]

    def _get_schema(self):
        return self.serializer_to_schema(AssessmentSerializer())
