from assessments.schemas import AssessmentResultsForMobileSchema
from assessments.serializers import AssessmentResultsListForMobileSerializer
from assessments.services import AssessmentResultsService

from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT

from .base_assessment_results_view import BaseAssessmentResultsView


class AssessmentResultsForMobileView(BaseAssessmentResultsView):
    swagger_schema = AssessmentResultsForMobileSchema

    def get(self, request, *args, **kwargs):
        assessment, ordering = self.get_object(), self._get_ordering(self.request.query_params)
        total = AssessmentResultsService.get_assessment_total_mark(assessment)
        results = AssessmentResultsService.get_assessment_results_summary(assessment, ordering)
        data = AssessmentResultsListForMobileSerializer(results, many=True, context={"total": total}).data
        return Response({"data": data, "count": results.count()}, status=HTTP_200_OK)