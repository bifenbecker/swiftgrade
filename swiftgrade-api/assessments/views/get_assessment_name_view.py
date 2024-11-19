from assessments.services import AssessmentService
from assessments.schemas import GetAssessmentNameSchema

from users.permissions import IsUserPermissionForGroups

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK


class GetAssessmentNameView(GenericAPIView):
    permission_classes = (IsUserPermissionForGroups, )
    swagger_schema = GetAssessmentNameSchema

    def get(self, request, *args, **kwargs):
        group_id = self.request.query_params.get('group_id', None)
        name = AssessmentService.get_assessment_name(group_id)
        return Response({'name': name}, status=HTTP_200_OK)
