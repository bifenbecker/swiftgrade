from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import PreviewAnswerSheetSerializer, PreviewAnswerSheetResponseSerializer


class PreviewAnswerSheetSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns a custom preview for the assessment. If there is no preview_document_url in the " \
                     "answer sheet or the custom answer sheet changed and prepared to regeneration, " \
                     "then generates a new one preview answer sheet. Available for the users with the role of teacher."

    def get_response_serializers(self):
        return {
            '200': self._get_schema(),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        preview_answer_sheet_serializer_schema = self.serializer_to_schema(PreviewAnswerSheetSerializer())
        return [self.make_body_parameter(preview_answer_sheet_serializer_schema)]

    def _get_schema(self):
        return self.serializer_to_schema(PreviewAnswerSheetResponseSerializer())
