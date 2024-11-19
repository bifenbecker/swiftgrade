from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from assessments.schemas import AssessmentBatchUploadSchema
from assessments.serializers import (
    AssessmentsFilesListSerializer,
    AssessmentBatchUploadFileSerializer,
)
from users.permissions import IsUserPermissionForAssessment


class AssessmentBatchFileUploadView(CreateAPIView):
    permission_classes = (IsUserPermissionForAssessment, )
    swagger_schema = AssessmentBatchUploadSchema

    def create(self, request, *args, **kwargs):
        files = [{'file': file} for file in request.data.getlist('file')]
        serializer = AssessmentBatchUploadFileSerializer(data={'files': files})
        if serializer.is_valid():
            files = serializer.save()
            return Response(AssessmentsFilesListSerializer(files, many=True).data,
                            status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
