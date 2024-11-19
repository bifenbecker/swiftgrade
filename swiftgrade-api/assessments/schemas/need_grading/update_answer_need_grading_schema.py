from collections import OrderedDict

from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi
from assessments.serializers import AssessmentAnswersSerializer, AssessmentAnswersResponseSerializer


class UpdateAnswerNeedGradingSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        description = ""
        if self.method in ["POST"]:
            description = "Changes need grading values of all result items for the specific assessment answer. " \
                          "Returns answers with updated need grading values. Available only for users with the " \
                          "role of teacher."
        return None, description

    def get_response_serializers(self):
        response = {
            '200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((
                    ('count', openapi.Schema(type=openapi.TYPE_INTEGER)),
                    ('data', openapi.Schema(type=openapi.TYPE_OBJECT, properties=OrderedDict((
                        ('data', self._get_schema()),
                        ('numbers', openapi.Schema(type=openapi.TYPE_ARRAY,
                                                   items=openapi.Items(type=openapi.TYPE_INTEGER)))
                    ))))
                ))),
            '400': self.validation_errors_response()}
        return response

    def _get_schema(self):
        result_items = self.serializer_to_schema(AssessmentAnswersResponseSerializer())
        return openapi.Schema(type=openapi.TYPE_ARRAY, items=result_items)

    def get_request_body_parameters(self, consumes):
        request_fields = self.serializer_to_schema(AssessmentAnswersSerializer())
        return [self.make_body_parameter(request_fields)]
