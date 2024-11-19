from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST

from assessments.models import Assessment
from assessments.serializers import DeleteAssessmentSerializer
from assessments.schemas import DeleteAssessmentSchema

from users.permissions import IsUserPermissionForGroups
from api.services import SoftDeleteService


class DeleteAssessmentView(GenericAPIView):
    permission_classes = (IsUserPermissionForGroups, )
    serializer_class = DeleteAssessmentSerializer
    swagger_schema = DeleteAssessmentSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            assessments_ids = serializer.validated_data['assessments_ids']
            group_id = serializer.validated_data['group_id']
            assessments = Assessment.manager.filter(id__in=assessments_ids, group_id=group_id)
            
            SoftDeleteService.perform('assessment', assessments)
            # assessments.delete()

            return Response(status=HTTP_204_NO_CONTENT)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
