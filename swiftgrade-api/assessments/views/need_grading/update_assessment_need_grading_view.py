from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from assessments.models import Assessment
from assessments.schemas import UpdateAssessmentNeedGradingSchema
from assessments.serializers import AssessmentsListSerializer
from assessments.services import NeedGradingService
from users.permissions import IsTeacherPermissionForAssessments


class UpdateAssessmentNeedGradingView(GenericAPIView):
    """
        Updates a need grading value of all result items for the specific assessment
    """

    permission_classes = (IsTeacherPermissionForAssessments, )
    swagger_schema = UpdateAssessmentNeedGradingSchema

    def get_object(self):
        return get_object_or_404(Assessment, id=self.kwargs.get('assessment_id', None))

    def post(self, request, *args, **kwargs):
        assessment = self.get_object()
        NeedGradingService.update_need_grading_for_assessment(assessment)
        response_serializer = AssessmentsListSerializer(assessment)
        return Response(response_serializer.data, status=HTTP_200_OK)
