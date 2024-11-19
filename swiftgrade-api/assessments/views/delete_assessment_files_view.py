from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST

from assessments.models import AssessmentFile
from assessments.serializers import DeleteAssessmentFilesSerializer
from assessments.schemas import DeleteAssessmentFilesSchema

from users.permissions import IsTeacherPermissionForAssessments


class DeleteAssessmentFilesView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )
    serializer_class = DeleteAssessmentFilesSerializer
    swagger_schema = DeleteAssessmentFilesSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            AssessmentFile.objects.filter(id__in=serializer.validated_data['files_ids']).delete()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
