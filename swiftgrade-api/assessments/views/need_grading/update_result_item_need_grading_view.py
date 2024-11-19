from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST

from assessments.models import AssessmentResultItem
from assessments.schemas.need_grading.update_result_item_need_grading_schema import UpdateResultItemNeedGradingSchema
from assessments.serializers import UpdateNeedGradingSerializer
from users.permissions import IsTeacherPermissionForAssessments


class UpdateResultItemNeedGradingView(UpdateAPIView):
    """
        Updates a need grading value of a result item
    """

    permission_classes = (IsTeacherPermissionForAssessments,)
    serializer_class = UpdateNeedGradingSerializer
    swagger_schema = UpdateResultItemNeedGradingSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            AssessmentResultItem.manager.filter(id=serializer.validated_data['result_item_id']) \
                .update(need_grading=False, need_grading_for_units=False)

            return Response(status=HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
