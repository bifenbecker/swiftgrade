from assessments.helpers import ResultHelper
from assessments.models import AssessmentResult
from assessments.schemas import ResultDetailSchema
from assessments.serializers import AssessmentResultSerializer, AssessmentResultItemSerializer, \
    UpdateResultSerializer
from assessments.services import AssessmentResultsService

from django.shortcuts import get_object_or_404

from users.permissions import IsTeacherPermissionForAssessments

from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST


class ResultDetailView(RetrieveUpdateAPIView):
    permission_classes = (IsTeacherPermissionForAssessments,)
    swagger_schema = ResultDetailSchema
    serializer_class = UpdateResultSerializer

    @staticmethod
    def get_context(assessment):
        assessment_data = ResultHelper.get_assessment_data_for_results(assessment)
        total = AssessmentResultsService.get_assessment_total_mark(assessment)
        return {
            "assessment_data": assessment_data,
            "total": total,
        }

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        result_id = self.kwargs.get("result_id", None)
        result_items = AssessmentResultsService.get_assessment_results_items(result_id)
        data = AssessmentResultItemSerializer(result_items, many=True,
                                              context=self.get_context(instance.assessment)).data
        return Response(data, status=HTTP_200_OK)

    def get_object(self):
        result_id = self.kwargs.get("result_id", None)
        return get_object_or_404(AssessmentResult, id=result_id)

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = AssessmentResultSerializer(instance).data
            return Response(data, status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
