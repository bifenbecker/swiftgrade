from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi
from assessments.serializers import ScanAnswerSheetSerializer


class ScanAnswerSheetSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Scans a specific answer sheet. Gets scans associated with the provided session_id, " \
                     "creates a new recognition batch. Then scans the answer sheet on the CV module to get " \
                     "recognized data. Changes assessment status to 'scanning' if the kind of the assessment is " \
                     "custom. Available for users with the teacher role."

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        answer_sheet_item_serializer_schema = self.serializer_to_schema(ScanAnswerSheetSerializer())
        return [self.make_body_parameter(answer_sheet_item_serializer_schema)]
