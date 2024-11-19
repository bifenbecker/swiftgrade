from django.shortcuts import get_object_or_404
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from assessments.models import AssessmentResult
from assessments.schemas import UnassignAssessmentSchema
from assessments.serializers import AssessmentsListSerializer, UnassignAssessmentSerializer
from assessments.services import AssessmentService, AssessmentSettingsService
from users.permissions import IsTeacherPermissionForAssessments


class UnassignAssessmentView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )
    swagger_schema = UnassignAssessmentSchema

    def get_object(self, group_id):
        assessments = AssessmentService.get_assessments(group_id)
        return get_object_or_404(assessments, id=self.kwargs.get('assessment_id', None))

    @staticmethod
    def get_serializer_context(assessment):
        results = AssessmentResult.manager.filter(assessment_id=assessment.id, status=AssessmentResult.RECOGNIZED)
        return {'results': results}

    def post(self, request, *args, **kwargs):
        serializer = UnassignAssessmentSerializer(data=request.data)
        if serializer.is_valid():
            group_id = serializer.validated_data['group_id']
            assessment = self.get_object(group_id)

            AssessmentSettingsService.unrelease_assessment_settings(assessment)

            response_serializer = AssessmentsListSerializer(assessment, context=self.get_serializer_context(assessment))
            return Response(response_serializer.data, status=HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
