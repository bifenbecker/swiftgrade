from django.shortcuts import get_object_or_404
from rest_framework.generics import GenericAPIView
from rest_framework.status import HTTP_200_OK
from rest_framework.response import Response

from assessments.models import Assessment, CompletedAssessment
from assessments.schemas import StudentProcessAssessmentSchema
from assessments.serializers import StudentProcessAssessmentSerializer
from users.permissions import IsStudentPermissionForAssessment


class StudentProcessAssessmentView(GenericAPIView):
    permission_classes = (IsStudentPermissionForAssessment, )
    serializer_class = StudentProcessAssessmentSerializer
    swagger_schema = StudentProcessAssessmentSchema

    def get_object(self):
        return get_object_or_404(Assessment, id=self.kwargs['assessment_id'])

    def get_serializer_context(self):
        completed_assessment = CompletedAssessment.manager.filter(
            assessment_id=self.kwargs.get('assessment_id', None),
            student_id=self.request.user.student.id).last()
        return {'completed_assessment': completed_assessment}

    def post(self, request, *args, **kwargs):
        context = self.get_serializer_context()
        response_serializer = self.get_serializer(self.get_object(), context=context)
        return Response(response_serializer.data, status=HTTP_200_OK)
