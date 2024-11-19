from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import GenericRecognitionSerializer
from drf_yasg import openapi


class GenericRecognitionSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        mc_answer = '[0, 1, 0, 1, 1]'
        return None, (f'Returns recognition data.\n'
                      f'Format for results (key - number of answer, value - answer):\n'
                      f'1: {mc_answer}, 2: {mc_answer}')

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(GenericRecognitionSerializer(many=True))
        return [self.make_body_parameter(serializer_schema)]
