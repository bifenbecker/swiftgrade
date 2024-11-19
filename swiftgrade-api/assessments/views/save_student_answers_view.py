from django.shortcuts import get_object_or_404
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST

from assessments.models import Assessment
from assessments.schemas import SaveStudentAnswersSchema
from assessments.serializers import StudentSubmitAssessmentSerializer
from assessments.services import CompletedAssessmentService

from users.permissions import IsStudentPermissionForAssessments


class SaveStudentAnswersView(GenericAPIView):
    permission_classes = (IsStudentPermissionForAssessments,)
    swagger_schema = SaveStudentAnswersSchema
    serializer_class = StudentSubmitAssessmentSerializer

    def get_object(self):
        return get_object_or_404(Assessment, id=self.kwargs.get('assessment_id'))

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        if serializer.is_valid():
            completed_assessment_id = self.kwargs.get('completed_assessment_id', None)
            CompletedAssessmentService(self.get_object(), request.user, completed_assessment_id) \
                .call({'student_answers': serializer.validated_data})
            return Response(status=HTTP_204_NO_CONTENT)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
