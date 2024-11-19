from django.shortcuts import get_object_or_404

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from assessments.models import Assessment, AssessmentResult
from assessments.schemas import AssessmentAnalysisSchema
from assessments.serializers import AssessmentAnalysisResponseSerializer
from assessments.services import CalculateAnalysisService
from users.permissions import IsTeacherPermissionForAssessments


class AssessmentAnalysisView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )
    swagger_schema = AssessmentAnalysisSchema

    def get_object(self):
        assessment_id = self.kwargs.get("assessment_id", None)
        return get_object_or_404(Assessment, id=assessment_id)

    def get_serializer_context(self, assessment_id, total_count):
        return {
            'assessment_id': assessment_id,
            'total_count': total_count,
        }

    def get(self, request, *args, **kwargs):
        assessment = self.get_object()
        ordering = self.request.query_params.get('ordering', 'number')
        analysis_results, count = CalculateAnalysisService.get_assessment_analysis_results(assessment.id, ordering)
        data = AssessmentAnalysisResponseSerializer(
            analysis_results, many=True, context=self.get_serializer_context(assessment.id, count)).data
        return Response({
            "data": data, "count": count,
        }, status=HTTP_200_OK)
