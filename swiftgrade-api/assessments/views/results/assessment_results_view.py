from assessments.helpers import ResultHelper
from assessments.models import AssessmentResult
from assessments.schemas import AssessmentResultsSchema
from assessments.serializers import AssessmentResultsListSerializer, SendAssessmentResultSerializer
from assessments.services import AssessmentResultsService, AssessmentService
from assessments.tasks import send_student_results

from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT


from .base_assessment_results_view import BaseAssessmentResultsView


class AssessmentResultsView(BaseAssessmentResultsView):
    swagger_schema = AssessmentResultsSchema

    @staticmethod
    def _get_context(assessment):
        assessment_data = ResultHelper.get_assessment_data_for_results(assessment)
        total = AssessmentResultsService.get_assessment_total_mark(assessment)
        return {
            "assessment_data": assessment_data,
            "total": total,
        }

    def get(self, request, *args, **kwargs):
        assessment, filters, ordering = self.get_object(), \
            self.request.query_params.getlist("filters", []), \
            self._get_ordering(self.request.query_params)
        count = AssessmentResult.manager.filter(assessment_id=assessment.id, status=AssessmentResult.RECOGNIZED).count()

        if not filters:
            return Response({"data": [], "count": count}, status=HTTP_200_OK)

        results = AssessmentResultsService.get_assessment_results(assessment, filters, ordering)
        data = AssessmentResultsListSerializer(results, many=True, context=self._get_context(assessment)).data
        return Response({"data": data, "count": count}, status=HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = SendAssessmentResultSerializer(data=request.data)

        if serializer.is_valid():
            assessment = self.get_object()
            ids = serializer.validated_data.get('ids')
            kind = serializer.validated_data.get('type')
            AssessmentService.update_release_results_type_for_students(assessment, kind, ids)
            send_student_results.delay(assessment.id, ids, kind)
        return Response(status=HTTP_204_NO_CONTENT)
