from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi
from collections import OrderedDict
from assessments.serializers import PreviewGenericAnswerSheetSerializer


class PreviewGenericAnswerSheetSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns a preview document url of the generic answer sheet. If there is a class name, then it " \
                     "generates a generic preview and returns the necessary url. If the is no class name, returns a " \
                     "preview document url in case the answer sheet exists or generates a generic preview and " \
                     "creates a new generic answer sheet. Available only for the users with the teacher role."

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=OrderedDict((
                        ("document_preview_url", openapi.Schema(type=openapi.TYPE_STRING)),
                    )),
                ),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        preview_answer_sheet_serializer_schema = self.serializer_to_schema(PreviewGenericAnswerSheetSerializer())
        return [self.make_body_parameter(preview_answer_sheet_serializer_schema)]
