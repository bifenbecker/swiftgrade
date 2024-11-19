from assessments.serializers import ResultGenericAnswerSheetSerializer
from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi


class ResultGenericAnswerSheetSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Generates new document and sets it to a specific answer sheet zip object. Updates document " \
                     "and coordinates data of the specific generic answer sheets."

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        answer_sheet_serializer_schema = self.serializer_to_schema(ResultGenericAnswerSheetSerializer(many=True))
        return [self.make_body_parameter(answer_sheet_serializer_schema)]
