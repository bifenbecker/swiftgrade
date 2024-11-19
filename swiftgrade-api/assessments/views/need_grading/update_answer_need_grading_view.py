from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from assessments.models import Assessment, AssessmentResult
from assessments.schemas import UpdateAnswerNeedGradingSchema
from assessments.serializers import AssessmentAnswersResponseSerializer, AssessmentAnswersSerializer
from assessments.services import NeedGradingService
from assessments.helpers import ResultHelper
from users.permissions import IsTeacherPermissionForAssessments


class UpdateAnswerNeedGradingView(GenericAPIView):
    """
        Updates a need grading value of all result items for the specific assessment answer
    """

    permission_classes = (IsTeacherPermissionForAssessments,)
    serializer_class = AssessmentAnswersSerializer
    swagger_schema = UpdateAnswerNeedGradingSchema

    @staticmethod
    def _get_context(assessment):
        assessment_data = ResultHelper.get_assessment_data_for_results(assessment)
        return {"assessment_data": assessment_data}

    def get_object(self):
        return get_object_or_404(Assessment, id=self.kwargs.get('assessment_id', None))

    def post(self, request, *args, **kwargs):
        assessment = self.get_object()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            result_items, numbers = \
                NeedGradingService.update_need_grading_for_answer(assessment, serializer.validated_data)
            return Response({
                "data": {"data": AssessmentAnswersResponseSerializer(result_items, many=True, context=self._get_context(assessment)).data, "numbers": numbers},
                "count": AssessmentResult.manager.filter(assessment_id=assessment.id).count(),
            }, status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
