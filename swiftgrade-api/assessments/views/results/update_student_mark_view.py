from assessments.models import AssessmentResultItemMark
from assessments.schemas import UpdateStudentMarkSchema
from assessments.serializers import UpdateStudentMarkSerializer, StudentMarkSerializer
from assessments.services import AssessmentResultsService
from users.permissions import IsTeacherPermissionForAssessments

from django.shortcuts import get_object_or_404

from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST


class UpdateStudentMarkView(UpdateAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )
    swagger_schema = UpdateStudentMarkSchema
    serializer_class = UpdateStudentMarkSerializer

    def get_serializer_context(self):
        return {
            "mark_id": self.kwargs["mark_id"]
        }

    def patch(self, request, *args, **kwargs):
        context = self.get_serializer_context()
        instance = get_object_or_404(AssessmentResultItemMark, id=self.kwargs.get('mark_id', None))

        serializer = self.get_serializer(instance, data=request.data, context=context)

        if serializer.is_valid():
            instance = serializer.save()
            AssessmentResultsService.check_need_grading(instance.assessment_result_item)
            if not instance.assessment_result_item.is_manually_graded:
                instance.assessment_result_item.is_manually_graded = True
                instance.assessment_result_item.save()
            return Response(StudentMarkSerializer(instance).data, status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
