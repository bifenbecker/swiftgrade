from collections import OrderedDict

from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import AssessmentAnswersSerializer, AssessmentAnswersResponseSerializer


class AssessmentAnswersSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns filtered student answers for a specific assessment item in the desired order. " \
                     "\nIt is possible to apply one or more filters from the list: correct, partially_correct, " \
                     "incorrect, low_accuracy, high_accuracy. \nAvailable for users with the teacher role."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(AssessmentAnswersSerializer())
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
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
            '400': self.validation_errors_response(),
        }

    def _get_schema(self):
        answers = self.serializer_to_schema(AssessmentAnswersResponseSerializer())
        return openapi.Schema(type=openapi.TYPE_ARRAY, items=answers)
