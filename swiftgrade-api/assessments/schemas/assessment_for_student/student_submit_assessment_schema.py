from collections import OrderedDict

from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import StudentSubmitAssessmentSerializer, AssessmentResultForStudentWithAnswersSerializer


class StudentSubmitAssessmentSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Saves student answers and returns student results. If the release_results_type value of " \
                     "the assessment settings is 'mark_plus_student_answers_plus_correct_answers', then also " \
                     "returns the correct answers. Updates completed assessment object for a specific user."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(StudentSubmitAssessmentSerializer())
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(type=openapi.TYPE_OBJECT, properties=OrderedDict((
                ('data', self._get_schema()),
                ('mark', openapi.Schema(type=openapi.TYPE_STRING)),
                ('type', openapi.Schema(type=openapi.TYPE_STRING)),
            ))),
            '400': self.validation_errors_response(),
        }

    def _get_schema(self):
        return self.serializer_to_schema(AssessmentResultForStudentWithAnswersSerializer())
