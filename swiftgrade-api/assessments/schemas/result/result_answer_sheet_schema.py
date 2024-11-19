from assessments.serializers import ResultAnswerSheetSerializer
from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi

from assessments.serializers.answer_sheet.answer_sheet_serializer import AnswerSheetSerializer


class ResultAnswerSheetSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        description = ""
        if self.method == 'GET':
            description = "Depending on the answer sheet zip document existence returns answer sheet or answer sheet " \
                          "zip data. Answer sheet zip url is associated with AWS storage. In case answer sheet zip " \
                          "doesn't exist, it returns answer sheet, the document path of which is associated with the " \
                          "CV module."
        if self.method == 'POST':
            description = "Creates answer sheet zip object if it is not exist and updates custom answer sheet data " \
                          "if the 'success' key of input data is True, otherwise deletes the answer sheet. Updates " \
                          "assessment status."
        return None, description

    def get_response_serializers(self):
        if self.method == 'GET':
            return {'200': self.serializer_to_schema(AnswerSheetSerializer())}
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        result_answer_sheet_serializer_schema = self.serializer_to_schema(ResultAnswerSheetSerializer())
        return [self.make_body_parameter(result_answer_sheet_serializer_schema)]
