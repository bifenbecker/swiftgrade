from django.shortcuts import get_object_or_404

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from assessments.helpers import ResultHelper
from assessments.models import Assessment, AssessmentResult
from assessments.schemas import AssessmentAnswersSchema
from assessments.services import AssessmentResultsService
from assessments.serializers import AssessmentAnswersSerializer, AssessmentAnswersResponseSerializer
from users.permissions import IsTeacherPermissionForAssessments


class AssessmentAnswersView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )
    swagger_schema = AssessmentAnswersSchema

    @staticmethod
    def _get_context(assessment):
        assessment_data = ResultHelper.get_assessment_data_for_results(assessment)
        return {"assessment_data": assessment_data}

    def get_object(self):
        assessment_id = self.kwargs.get("assessment_id", None)
        return get_object_or_404(Assessment, id=assessment_id)

    def post(self, request, *args, **kwargs):
        assessment = self.get_object()
        serializer = AssessmentAnswersSerializer(data=request.data)
        if serializer.is_valid():
            data, numbers = AssessmentResultsService.get_assessment_answers(assessment.id, serializer.validated_data)
            response = AssessmentAnswersResponseSerializer(data, many=True, context=self._get_context(assessment)).data
            return Response({
                "data": {"data": response, "numbers": numbers},
                "count": AssessmentResult.manager.filter(assessment_id=assessment.id, status=AssessmentResult.RECOGNIZED).count(),
            }, status=HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
