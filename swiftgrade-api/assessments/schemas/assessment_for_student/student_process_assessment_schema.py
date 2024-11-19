from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import StudentProcessAssessmentSerializer


class StudentProcessAssessmentSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns detailed information about the assessment with the timer limit, student temporary " \
                     "answers, result existence values for a specific user. Available only for users with the " \
                     "student role."

    def get_response_serializers(self):
        return {'200': self._get_schema()}

    def _get_schema(self):
        return self.serializer_to_schema(StudentProcessAssessmentSerializer())
