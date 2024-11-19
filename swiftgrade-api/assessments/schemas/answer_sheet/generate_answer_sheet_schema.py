from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi
from assessments.serializers import GenerateAnswerSheetSerializer


class GenerateAnswerSheetSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Generates a custom answer sheet according to the information of the provided assessment. " \
                     "Updates the assessment status to 'generating'. Available only for users with the role of teacher."

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        preview_answer_sheet_serializer_schema = self.serializer_to_schema(GenerateAnswerSheetSerializer())
        return [self.make_body_parameter(preview_answer_sheet_serializer_schema)]
