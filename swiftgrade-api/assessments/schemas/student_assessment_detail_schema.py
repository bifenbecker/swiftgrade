from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import StudentAssessmentDetailSerializer


class StudentAssessmentDetailSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns detailed information about an assessment including assessment settings. Available for " \
                     "a user with the student role."

    def get_response_serializers(self):
        return {'200': self._get_schema()}

    def _get_schema(self):
        return self.serializer_to_schema(StudentAssessmentDetailSerializer())
