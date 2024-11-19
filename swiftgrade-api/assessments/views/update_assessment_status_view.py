from assessments.helpers import AssessmentHelper
from assessments.models import Assessment, RecognitionBatch
from assessments.schemas import UpdateAssessmentStatusSchema
from assessments.serializers import AssessmentSerializer, UpdateAssessmentStatusSerializer
from users.permissions import IsTeacherPermissionForAssessments

from django.shortcuts import get_object_or_404

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST


class UpdateAssessmentStatusView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )
    swagger_schema = UpdateAssessmentStatusSchema
    serializer_class = UpdateAssessmentStatusSerializer

    @staticmethod
    def _get_next_status(assessment_id, batches):
        return "scanned" if batches else "ready_for_scan"

    def get_object(self):
        return get_object_or_404(Assessment, id=self.kwargs.get('assessment_id', None))

    def get_status(self, assessment_id, key):
        get_status_method = {
            "prev_status": AssessmentHelper.get_prev_assessment_status,
            "next_status": self._get_next_status
        }.get(key, None)

        if get_status_method:
            batches = RecognitionBatch.manager.filter(assessment_id=assessment_id).all()
            return get_status_method(assessment_id, batches)
        return None

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            assessment = self.get_object()
            status = self.get_status(self.kwargs["assessment_id"], serializer.validated_data["key"])
            if status:
                assessment.status = status
                assessment.save()
            return Response(AssessmentSerializer(assessment).data, status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
