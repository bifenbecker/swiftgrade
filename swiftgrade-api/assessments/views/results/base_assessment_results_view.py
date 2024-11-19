from assessments.models import Assessment
from users.permissions import IsTeacherPermissionForAssessments

from django.shortcuts import get_object_or_404
from rest_framework.generics import GenericAPIView


class BaseAssessmentResultsView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments,)

    @staticmethod
    def _get_ordering(params):
        ordering = params.get("ordering", "last_name")

        if 'total' in ordering:
            ordering = ordering.replace('total', 'mark')
        return ordering

    def get_object(self):
        assessment_id = self.kwargs.get("assessment_id", None)
        return get_object_or_404(Assessment, id=assessment_id)