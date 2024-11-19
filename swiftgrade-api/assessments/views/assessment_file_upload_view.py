from assessments.schemas import AssessmentUploadSchema
from assessments.serializers import (
    AssessmentsFilesListSerializer,
    AssessmentUploadFileSerializer,
)
from assessments.services import AssessmentService
from users.permissions import IsUserPermissionForAssessment

from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST


class AssessmentFileUploadView(ListCreateAPIView):
    permission_classes = (IsUserPermissionForAssessment, )
    swagger_schema = AssessmentUploadSchema

    def get_queryset(self):
        assessment_id = self.kwargs.get('assessment_id', None)
        completed_assessment_id = self.request.query_params.get('completed_assessment_id', None)
        return AssessmentService.get_assessment_files(assessment_id, completed_assessment_id)

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return Response(AssessmentsFilesListSerializer(queryset, many=True).data, status=HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = AssessmentUploadFileSerializer(data=request.data)
        if serializer.is_valid():
            file = serializer.save()
            return Response(AssessmentsFilesListSerializer(file).data, status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
