from assessments.serializers import ScanAnswerSheetItemSerializer
from assessments.services import AnswerSheetScanService
from assessments.schemas import ScanAnswerSheetItemSchema

from users.permissions import IsTeacherPermissionForAssessments

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from assessments.utils import log_timeit_view


class ScanAnswerSheetItemView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )
    serializer_class = ScanAnswerSheetItemSerializer
    swagger_schema = ScanAnswerSheetItemSchema

    def get_serializer_context(self):
        return {'assessment_id': self.kwargs.get('assessment_id', None)}
    
    @log_timeit_view
    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data, context=self.get_serializer_context())        
        if serializer.is_valid():
            scan_item = AnswerSheetScanService.answer_sheet_item_scan(**serializer.validated_data)
            return Response(
                {'scan_id': scan_item.answer_sheet_scan_id, 'url': scan_item.image.url}, status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
