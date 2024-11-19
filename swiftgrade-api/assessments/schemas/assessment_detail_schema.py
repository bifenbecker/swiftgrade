from api.core.doc_utils import OpenapiConverter
from .base_assessment_schema import BaseAssessmentSchema, ASSESSMENT


class AssessmentDetailSchema(BaseAssessmentSchema):
    def get_summary_and_description(self):
        description = ""
        if self.method in ["GET"]:
            description = "Returns detailed information about a specific assessment. The info can be different and " \
                          "depends on the 'key' query parameter, the value of which can be one of: edit, detail, " \
                          "status. Available for users with the teacher role."
        elif self.method in ["PUT", "PATCH"]:
            description = "Updates information about a specific assessment. Assessments items, answers, marks also " \
                          "can be changed. If the kind of the assessment is custom then it prepares the custom " \
                          "answer sheets to regeneration after successful assessment update. Available for users " \
                          "with the teacher role. "
        return None, description

    def get_response_serializers(self):
        if self.method in ["PUT", "PATCH"]:
            return {
                '200': self._get_schema(),
                '400': self.validation_errors_response(),
            }

        return {'200': OpenapiConverter.convert_fields_in_schema(ASSESSMENT)}
