from django.shortcuts import get_object_or_404
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from api.services import SoftDeleteService
from assessments.models import Assessment, AssessmentResult, AssessmentSettings, RecognitionBatch
from assessments.serializers import DeleteResultsSerializer
from assessments.schemas import DeleteResultsSchema
from users.permissions import IsTeacherPermissionForAssessments


class DeleteResultsView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )
    serializer_class = DeleteResultsSerializer
    swagger_schema = DeleteResultsSchema

    def get_object(self):
        assessment_id = self.kwargs.get("assessment_id", None)
        return get_object_or_404(Assessment, id=assessment_id)

    @staticmethod
    def get_status_for_online_assessment(assessment):
        settings = AssessmentSettings.manager.filter(assessment_id=assessment.id).last()
        return Assessment.ASSIGNED if settings and settings.is_released else Assessment.READY_FOR_ASSIGNMENT

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            assessment = self.get_object()
            results_ids = serializer.validated_data['results_ids']

            results = AssessmentResult.manager.filter(id__in=results_ids)
            SoftDeleteService.perform('result', results)
            # results.delete()

            recognized_results = AssessmentResult.manager.filter(assessment_id=self.kwargs['assessment_id'], status=AssessmentResult.RECOGNIZED)
            
            if not recognized_results.exists():

                assessment.status = self.get_status_for_online_assessment(assessment) \
                    if assessment.type == Assessment.ONLINE else Assessment.READY_FOR_SCAN
                assessment.save()
                batches = RecognitionBatch.manager.filter(assessment_id=self.kwargs['assessment_id']).all()
                if batches.exists():
                    batches.delete()
                return Response({'is_results_exists': False}, status=HTTP_200_OK)
            return Response({'is_results_exists': True}, status=HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
