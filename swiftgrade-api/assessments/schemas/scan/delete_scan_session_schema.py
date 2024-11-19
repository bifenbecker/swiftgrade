from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi
from assessments.serializers import DeleteScanSessionSerializer


class DeleteScanSessionSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Removes scans associated with the provided session_id and all data related to them. Available " \
                     "for users with the teacher role."

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        preview_answer_sheet_serializer_schema = self.serializer_to_schema(DeleteScanSessionSerializer())
        return [self.make_body_parameter(preview_answer_sheet_serializer_schema)]
