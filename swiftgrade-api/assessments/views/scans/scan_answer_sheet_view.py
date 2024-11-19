from assessments.serializers import ScanAnswerSheetSerializer
from assessments.services import AnswerSheetScanService
from assessments.schemas import ScanAnswerSheetSchema
from users.permissions import IsTeacherPermissionForAssessments

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST


class ScanAnswerSheetView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )
    serializer_class = ScanAnswerSheetSerializer
    swagger_schema = ScanAnswerSheetSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            assessment_id = self.kwargs['assessment_id']
            AnswerSheetScanService.answer_sheet_scan(assessment_id, serializer.validated_data)
            return Response(status=HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
