from django.shortcuts import get_object_or_404
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST

from assessments.models import Assessment
from assessments.schemas import StartAssessmentSchema
from assessments.serializers import AssessmentPasswordSerializer
from assessments.services import CompletedAssessmentService, AssessmentService
from users.permissions import IsStudentPermissionForAssessments


class StartAssessmentView(GenericAPIView):
    permission_classes = (IsStudentPermissionForAssessments,)
    serializer_class = AssessmentPasswordSerializer
    swagger_schema = StartAssessmentSchema

    def get_object(self):
        return get_object_or_404(Assessment, id=self.kwargs['assessment_id'])

    def get_serializer_context(self):
        return {'assessment': self.get_object()}

    def post(self, request, *args, **kwargs):
        assessment = self.get_object()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            settings = AssessmentService.get_assessment_settings(assessment.id)
            student_answers = AssessmentService.get_initial_student_answers(assessment, request.user)
            data = {'settings_id': settings.id,
                    'student_answers': student_answers,
                    'release_results_type': settings.release_results_type}
            CompletedAssessmentService(assessment, request.user).call(data)
            return Response(status=HTTP_204_NO_CONTENT)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
