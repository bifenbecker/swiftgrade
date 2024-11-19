from django.shortcuts import get_object_or_404

from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from assessments.models import Assessment
from assessments.schemas import StudentAssessmentDetailSchema
from assessments.serializers import StudentAssessmentDetailSerializer

from users.permissions import IsStudentPermissionForAssessments


class StudentAssessmentDetailView(RetrieveAPIView):
    permission_classes = (IsStudentPermissionForAssessments, )  # change
    # permission_classes = (IsStudentPermissionForAssessmentStart, )
    swagger_schema = StudentAssessmentDetailSchema

    def get_serializer_context(self):
        completed_assessment_id = self.request.query_params.get('completed_assessment_id', None)
        return {'completed_assessment_id': completed_assessment_id}

    def get_object(self):
        return get_object_or_404(Assessment, id=self.kwargs.get('assessment_id', None))

    def get(self, request, *args, **kwargs):
        serializer = StudentAssessmentDetailSerializer(self.get_object(), context=self.get_serializer_context())
        return Response(serializer.data, status=HTTP_200_OK)
