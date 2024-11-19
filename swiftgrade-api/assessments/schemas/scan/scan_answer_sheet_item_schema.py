from api.core.doc_utils import BaseSwaggerSchema
from collections import OrderedDict
from drf_yasg import openapi

from assessments.serializers import ScanAnswerSheetItemSerializer


class ScanAnswerSheetItemSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Scans answer sheet item of a specific assessment. Creates a new answer sheet scan item. " \
                     "Available for users with the teacher role."

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=OrderedDict((
                        ("scan_id", openapi.Schema(type=openapi.TYPE_INTEGER)),
                        ("url", openapi.Schema(type=openapi.TYPE_STRING)),
                    )),
                ),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        return self.get_request_form_parameters(ScanAnswerSheetItemSerializer())
