from django.shortcuts import get_object_or_404
from django.utils.translation import ugettext as _

from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from assessments.models import Assessment
from assessments.schemas import StudentSubmitAssessmentSchema
from assessments.serializers import StudentSubmitAssessmentSerializer
from assessments.services import StudentSubmitAssessmentService, AssessmentService, AssessmentResultsService
from users.permissions import IsStudentPermissionForAssessment

from ..results.base_assessment_results_for_student_view import BaseAssessmentResultForStudentView

class StudentSubmitAssessmentView(BaseAssessmentResultForStudentView):
    permission_classes = (IsStudentPermissionForAssessment,)
    swagger_schema = StudentSubmitAssessmentSchema

    def get_object(self):
        return get_object_or_404(Assessment, id=self.kwargs.get('assessment_id', None))

    @staticmethod
    def get_release_results_type(assessment):
        settings = AssessmentService.get_assessment_settings(assessment.id)
        return settings.release_results_type if settings else None

    def post(self, request, *args, **kwargs):
        assessment = self.get_object()
        if assessment.status == Assessment.READY_FOR_ASSIGNMENT:
            return Response({'errors': {'status': assessment.status, 'message': _('Teacher has ended this assessment')}},
                            status=HTTP_400_BAD_REQUEST)

        serializer = StudentSubmitAssessmentSerializer(data=request.data, many=True)
        if serializer.is_valid():
            completed_assessment_id = self.kwargs.get('completed_assessment_id', None)
            completed_assessment, mark = \
                StudentSubmitAssessmentService(assessment, request.user).call(serializer.validated_data,
                                                                              completed_assessment_id)
            release_type = self.get_release_results_type(assessment)
            return Response(self.get_response(completed_assessment, release_type), status=HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
