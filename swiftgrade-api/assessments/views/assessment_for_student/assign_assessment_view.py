from datetime import datetime, timezone

from django.shortcuts import get_object_or_404

from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_200_OK

from assessments.models import Assessment
from assessments.schemas import AssignAssessmentSchema
from assessments.serializers import AssignAssessmentSerializer, AssessmentSettingsSerializer
from assessments.services import AssessmentService
from assessments.tasks import convert_files_to_pdf
from users.permissions import IsUserPermissionForGroups
from users.services import UserService


class AssignAssessmentView(CreateAPIView, RetrieveAPIView, UpdateAPIView):
    permission_classes = (IsUserPermissionForGroups, )
    serializer_class = AssignAssessmentSerializer
    swagger_schema = AssignAssessmentSchema

    def get_object(self):
        return get_object_or_404(Assessment, id=self.kwargs.get('assessment_id', None))

    def get_serializer_context(self):
        assessment = self.get_object()
        return {"assessment": assessment}

    def get_assessment_settings(self):
        assessment = self.get_object()
        return AssessmentService.get_assessment_settings(assessment.id)

    def get(self, request, *args, **kwargs):
        settings = self.get_assessment_settings()
        response_serializer = AssessmentSettingsSerializer(settings)
        return Response(response_serializer.data, status=HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        context = self.get_serializer_context()
        serializer = self.get_serializer(data=request.data, context=context)
        if serializer.is_valid():
            serializer.save()
            convert_files_to_pdf.delay(request.data['attachments'])
            UserService.update_user(request.user, {'last_released_as': datetime.now(tz=timezone.utc)})

            return Response(status=HTTP_204_NO_CONTENT)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        settings = self.get_assessment_settings()
        serializer = self.get_serializer(instance=settings, data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(status=HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
