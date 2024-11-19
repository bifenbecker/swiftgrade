from assessments.models import CompletedAssessment
from assessments.schemas import AssessmentResultsForStudentSchema
from users.permissions import IsStudentPermissionForAssessmentResult

from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from .base_assessment_results_for_student_view import BaseAssessmentResultForStudentView


class AssessmentResultForStudentView(BaseAssessmentResultForStudentView):
    permission_classes = (IsStudentPermissionForAssessmentResult, )
    swagger_schema = AssessmentResultsForStudentSchema

    def get_object(self):
        completed_assessment_id = self.kwargs.get("completed_assessment_id", None)
        return get_object_or_404(CompletedAssessment, id=completed_assessment_id)

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        return Response(self.get_response(instance, instance.release_results_type), status=HTTP_200_OK)
