from collections import OrderedDict

from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers.answer_sheet.check_status_answer_sheet_serializer import CheckStatusAnswerSheetSerializer


class CheckStatusAnswerSheetSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        description = ""
        if self.method == 'POST':
            description = "Needs to verify whether the answer sheet has already been generated and whether it's " \
                          "ready for download. Checks for a document existence in the answer sheet zip object for a " \
                          "specific user. Returns the document url if the answer sheet document exists, uuid " \
                          "otherwise. Available for users with the teacher role."
        return None, description

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(CheckStatusAnswerSheetSerializer())
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                required=[],
                properties=OrderedDict((
                    ('uuid', openapi.Schema(type=openapi.TYPE_STRING)),
                    ('document_url', openapi.Schema(type=openapi.TYPE_STRING)),
                ))
            ),
            '400': self.validation_errors_response()
        }
