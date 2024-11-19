from assessments.serializers import AnswerSheetZipSerializer
from api.core.doc_utils import BaseSwaggerSchema
from collections import OrderedDict
from drf_yasg import openapi


class AnswerSheetZipSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        description = ""
        if self.method == 'GET':
            description = "Returns the information about the generic answer sheet zip for a specific user. Available " \
                          "only for users with the teacher role."
        if self.method == 'POST':
            description = "Changes the is_download value of the answer sheet zip object to True for a specific user " \
                          "to indicate that the answer sheet has already been downloaded. " \
                          "Available only for users with the teacher role."
        return None, description

    def get_response_serializers(self):
        if self.method == 'GET':
            return {
                '200': openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties=OrderedDict((
                            ("document_url", openapi.Schema(type=openapi.TYPE_STRING)),
                            ("is_download", openapi.Schema(type=openapi.TYPE_BOOLEAN)),
                            ("uuid", openapi.Schema(type=openapi.TYPE_STRING)),
                        )),
                    ),
            }
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response(),
        }

    def get_request_body_parameters(self, consumes):
        answer_sheet_zip_serializer_schema = self.serializer_to_schema(AnswerSheetZipSerializer())
        return [self.make_body_parameter(answer_sheet_zip_serializer_schema)]
