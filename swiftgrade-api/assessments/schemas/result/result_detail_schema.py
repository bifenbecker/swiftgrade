from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import UpdateResultSerializer, AssessmentResultSerializer, AssessmentResultItemSerializer


class ResultDetailSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        description = "Updates the information about the student for the assessment result associated with unnamed " \
                      "answer sheet scan. Available for users with the teacher role."
        if self.method == "GET":
            description = "Get the information about the student for the assessment result. Available for users with " \
                          "the teacher role."
        return None, description

    def get_response_serializers(self):
        return {
            "200": self._get_schema(),
            "400": self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(UpdateResultSerializer())
        return [self.make_body_parameter(serializer_schema)]

    def _get_schema(self):
        serializer_schema = self.serializer_to_schema(AssessmentResultItemSerializer() if self.method == "GET"
                                                      else AssessmentResultSerializer())
        return serializer_schema
