from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi
from collections import OrderedDict

from assessments.serializers import AssessmentResultForStudentWithAnswersSerializer


class AssessmentResultsForStudentSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns results of the online assessment for a specific student. If the " \
                     "release_results_type value of completed assessment object is " \
                     "'mark_plus_student_answers_plus_correct_answers', then results will also include correct " \
                     "answers of the assessment. Available only for users with student role."

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((
                    ("data", self._get_schema()),
                    ("mark", openapi.Schema(type=openapi.TYPE_STRING)),
                    ("type", openapi.Schema(type=openapi.TYPE_STRING)),
                )),
            ),
        }

    def _get_schema(self):
        return self.serializer_to_schema(AssessmentResultForStudentWithAnswersSerializer())
