from api.core.doc_utils import BaseSwaggerSchema

from assessments.serializers import UnassignAssessmentSerializer, AssessmentsListSerializer


class UnassignAssessmentSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Unassigns assessment. Removes the settings for a specific assessment, changes the assessment " \
                     "status to 'ready_for_assignment'. Available only for user with the teacher role."

    def get_response_serializers(self):
        return {
            '200': self._get_schema(),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        assign_assessment_serializer_schema = self.serializer_to_schema(UnassignAssessmentSerializer())
        return [self.make_body_parameter(assign_assessment_serializer_schema)]

    def _get_schema(self):
        return self.serializer_to_schema(AssessmentsListSerializer())
