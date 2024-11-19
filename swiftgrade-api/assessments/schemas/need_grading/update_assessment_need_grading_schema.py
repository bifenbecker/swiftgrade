from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import AssessmentsListSerializer


class UpdateAssessmentNeedGradingSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        description = ""
        if self.method in ["POST"]:
            description = "Changes the need grading values of all result items of a specific assessment to False. " \
                          "Returns the assessment with the updated need grading. Available only for users with the " \
                          "teacher role."
        return None, description

    def get_response_serializers(self):
        return {'200': self.serializer_to_schema(AssessmentsListSerializer())}