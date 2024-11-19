from django.shortcuts import get_object_or_404

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from assessments.models import Assessment, AssessmentResult
from assessments.schemas import AssessmentAveragesSchema
from assessments.services import CalculateAveragesService
from users.permissions import IsTeacherPermissionForAssessments


class AssessmentAveragesView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )
    swagger_schema = AssessmentAveragesSchema

    def get_object(self):
        assessment_id = self.kwargs.get("assessment_id", None)
        return get_object_or_404(Assessment, id=assessment_id)

    def get(self, request, *args, **kwargs):
        assessment = self.get_object()
        response = {
            "data": CalculateAveragesService.get_averages_results(assessment.id),
            "count": AssessmentResult.manager.filter(assessment_id=assessment.id, status=AssessmentResult.RECOGNIZED).count(),
        }
        return Response(response, status=HTTP_200_OK)
