from api.core.doc_utils import BaseSwaggerSchema
from collections import OrderedDict
from drf_yasg import openapi
from assessments.serializers import GenerateGenericAnswerSheetSerializer


class GenerateGenericAnswerSheetSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns a document url value if the generic answer sheet and the document_url value of this " \
                     "object exist. Otherwise, generates new generic answer sheets and creates new answer sheet zip " \
                     "and answer sheet objects. Available for users with the teacher role."

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(type=openapi.TYPE_OBJECT, required=[], properties=OrderedDict((
                ("document_url", openapi.Schema(type=openapi.TYPE_STRING)),
                ("uuid", openapi.Schema(type=openapi.TYPE_STRING)),
            ))),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        preview_answer_sheet_serializer_schema = self.serializer_to_schema(GenerateGenericAnswerSheetSerializer())
        return [self.make_body_parameter(preview_answer_sheet_serializer_schema)]
