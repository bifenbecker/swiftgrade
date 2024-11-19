from rest_framework.generics import DestroyAPIView
from assessments.models import AssessmentFile
from users.permissions import IsTeacherPermissionForAssessments
from assessments.schemas import DeleteAssessmentFileSchema


class DeleteAssessmentFileView(DestroyAPIView):
    lookup_field = 'id'
    permission_classes = (IsTeacherPermissionForAssessments, )
    queryset = AssessmentFile.objects.all()
    swagger_schema = DeleteAssessmentFileSchema
