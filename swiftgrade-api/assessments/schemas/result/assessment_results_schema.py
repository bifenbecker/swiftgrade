from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi
from assessments.serializers import AssessmentResultsListSerializer, SendAssessmentResultSerializer


class AssessmentResultsSchema(BaseSwaggerSchema):

    def get_summary_and_description(self):
        description = ""
        if self.method in ["GET"]:
            description = "Calculates total assessment mark, returns the filtered student recognized results for " \
                          "a specific assessment in the desired order. \nIt is possible to apply one or more filters " \
                          "from the list: correct, partially_correct, incorrect, low_accuracy, high_accuracy."
        if self.method in ["POST"]:
            description = "Sends assessment results to one or more students. If the type value is one of " \
                          "'mark_plus_student_answers' or 'mark_plus_student_answers_plus_correct_answers' then " \
                          "generates pdf with the student and teacher (if necessary) answers. Depending on " \
                          "the type value changes release_results_type of the specific completed assessments " \
                          "objects related to students if assessment type is 'online'."
        return None, description

    def get_query_parameters(self):
        if self.method in ['GET']:
            return [
                openapi.Parameter(name='filters', in_=openapi.IN_QUERY, type=openapi.TYPE_ARRAY,
                                  items=openapi.Items(type=openapi.TYPE_STRING)),
                openapi.Parameter(name='ordering', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING),
            ]
        if self.method in ['POST']:
            return [
                openapi.Parameter(name='type', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING),
            ]
        return []

    def get_response_serializers(self):
        response = {'400': self.validation_errors_response()}

        if self.method in ["POST"]:
            response.update({'204': openapi.Schema(type=openapi.TYPE_OBJECT)})
            return response

        response.update({'200': self._get_schema()})
        return response

    def _get_schema(self):
        results = self.serializer_to_schema(AssessmentResultsListSerializer())
        return openapi.Schema(type=openapi.TYPE_ARRAY, items=results)

    def get_request_body_parameters(self, consumes):
        if self.method in ["POST"]:
            request_fields = self.serializer_to_schema(SendAssessmentResultSerializer(many=True))
            return [self.make_body_parameter(request_fields)]
        return super().get_request_body_parameters(consumes)
