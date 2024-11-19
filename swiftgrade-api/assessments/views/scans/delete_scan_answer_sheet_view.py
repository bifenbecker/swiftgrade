from assessments.models import AnswerSheetScan
from assessments.schemas import DeleteAnswerSheetSchema
from users.permissions import IsTeacherPermissionForAssessments

from rest_framework.generics import DestroyAPIView


class DeleteScanAnswerSheetView(DestroyAPIView):
    lookup_field = 'id'
    permission_classes = (IsTeacherPermissionForAssessments, )
    queryset = AnswerSheetScan.manager.all()
    swagger_schema = DeleteAnswerSheetSchema
