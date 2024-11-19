from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi

from assessments.serializers import AssignAssessmentSerializer, AssessmentSettingsSerializer


class AssignAssessmentSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        description = ""
        if self.method == 'GET':
            description = "Returns the settings for a specific assessment."
        elif self.method == 'POST':
            description = "Creates new assessment settings. Adds a connection between the uploaded assessment files " \
                          "and the settings if there are attachments in the settings. Changes the assessment status " \
                          "to 'assigned'."
        elif self.method == 'PATCH':
            description = "Updates the settings for a specific assessment. Adds a connection between the uploaded " \
                          "assessment files and the settings if there are attachments in the settings."
        return None, description

    def get_response_serializers(self):
        return {
            '200': self._get_schema(),
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        assign_assessment_serializer_schema = self.serializer_to_schema(AssignAssessmentSerializer())
        return [self.make_body_parameter(assign_assessment_serializer_schema)]

    def _get_schema(self):
        return self.serializer_to_schema(AssessmentSettingsSerializer())
