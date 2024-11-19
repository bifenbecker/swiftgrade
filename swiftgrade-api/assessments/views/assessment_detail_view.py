from assessments.models import Assessment
from assessments.schemas import AssessmentDetailSchema
from assessments.serializers import (
    AssessmentDetailSerializer,
    AssessmentSerializer,
    AssessmentStatusSerializer,
    AssessmentUpdateSerializer,
    AssessmentsListSerializer
)
from assessments.services import CustomAnswerSheetService
from users.permissions import IsTeacherPermissionForAssessments

from django.shortcuts import get_object_or_404

from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

SERIALIZER = {
    'status': AssessmentStatusSerializer,
    'edit': AssessmentDetailSerializer,
    'detail': AssessmentSerializer,
}


class AssessmentDetailView(RetrieveUpdateAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )

    swagger_schema = AssessmentDetailSchema

    def get_serializer_context(self):
        assessment = self.get_object()
        return {'group_id': assessment.group.id}

    def get_serializer(self, *args, **kwargs):
        key = self.request.query_params.get('key', 'detail')
        return SERIALIZER[key](*args, **kwargs)

    def get_object(self):
        return get_object_or_404(Assessment, id=self.kwargs.get('assessment_id', None))

    def update(self, request, *args, **kwargs):
        context = self.get_serializer_context()
        instance = self.get_object()

        serializer = AssessmentUpdateSerializer(instance, data=request.data, context=context)

        if serializer.is_valid():
            assessment = serializer.save()
            if assessment.kind == Assessment.CUSTOM:
                CustomAnswerSheetService.prepare_to_regeneration_after_changing_assessment(assessment)
            return Response(AssessmentsListSerializer(instance).data, status=HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
