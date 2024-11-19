from drf_yasg import openapi
from .base_assessment_schema import BaseAssessmentSchema


class AssessmentsCreateListSchema(BaseAssessmentSchema):
    def get_summary_and_description(self):
        description = ""
        if self.method == "GET":
            description = "Returns a list of assessments of a specific group in the desired order to user with " \
                          "a role of teacher"
        elif self.method == "POST":
            description = "Creates a new assessment for a specific group. Moreover, creates assessment items for " \
                          "the assessment, answers for each item and marks for each answer."
        return None, description

    def get_query_parameters(self):
        if self.method == "GET":
            return [
                openapi.Parameter(name='group_id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),
                openapi.Parameter(name='ordering', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING),
            ]
        return []

    def get_response_serializers(self):
        response = {'200': self._get_schema()}

        if self.method == 'POST':
            response.update({'400': self.validation_errors_response()})
        return response
