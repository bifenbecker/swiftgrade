from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST

from assessments.models import AnswerSheetScan, AssessmentResult
from assessments.serializers import DeleteScanSessionSerializer
from assessments.schemas import DeleteScanSessionSchema
from users.permissions import IsTeacherPermissionForAssessments


class DeleteScanSessionView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )
    serializer_class = DeleteScanSessionSerializer
    swagger_schema = DeleteScanSessionSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            scans = AnswerSheetScan.manager.filter(session_id=serializer.validated_data['session_id'])
            scans_ids = scans.values_list('id', flat=True)

            AssessmentResult.manager.filter(answersheetscan__in=scans_ids).delete()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
