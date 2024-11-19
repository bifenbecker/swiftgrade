from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import RecognitionSerializer
from drf_yasg import openapi


class ResultRecognitionSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        answer = '{url: string, value: latex, need_grading: bool}'
        answer_with_units = f'answer: {answer}, units: {answer}'
        mc_answer = '1: [0, 1, 0, 1, 1]'

        return None, (f"Returns recognition data, builds recognized persons. Updates assessment status to 'scanned'.\n"
                      f"Format for results (key - number of answer, value - answer):\n"
                      f"{mc_answer}, 2: { answer }, 3: {{ {answer_with_units} }}.")

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(RecognitionSerializer(many=True))
        return [self.make_body_parameter(serializer_schema)]
