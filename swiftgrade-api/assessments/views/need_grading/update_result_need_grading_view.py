from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT

from assessments.schemas import UpdateResultNeedGradingSchema
from assessments.services import NeedGradingService, AssessmentResultsService
from users.permissions import IsTeacherPermissionForAssessments


class UpdateResultNeedGradingView(GenericAPIView):
    """
        Updates a need grading value of all result items for the specific assessment result
    """

    permission_classes = (IsTeacherPermissionForAssessments, )
    swagger_schema = UpdateResultNeedGradingSchema

    def post(self, request, *args, **kwargs):
        result, result_items_ids = AssessmentResultsService.get_assessment_result(self.kwargs.get('result_id', None))
        NeedGradingService.update_need_grading_for_result(result)
        return Response(status=HTTP_204_NO_CONTENT)
