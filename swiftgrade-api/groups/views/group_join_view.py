from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from assessments.services import CustomAnswerSheetService
from groups.services import GroupService
from groups.serializers import GroupJoinSerializer
from groups.schemas import GroupJoinSchema

from users.permissions import IsStudentPermission

from .base_groups_view import BaseGroupsView


class GroupJoinView(BaseGroupsView, GenericAPIView):
    permission_classes = (IsStudentPermission, )
    swagger_schema = GroupJoinSchema

    def post(self, request, *args, **kwargs):
        serializer = GroupJoinSerializer(data=request.data, context=self.get_serializer_context())

        if serializer.is_valid():
            group = serializer.save()
            student_id = self.request.user.student.id
            CustomAnswerSheetService.prepare_to_regeneration_after_changing_students(group.id, student_id)

            groups = GroupService.get_groups(self.request.user)
            response_data = self.get_serializer(groups, many=True).data
            return Response(response_data, status=HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
