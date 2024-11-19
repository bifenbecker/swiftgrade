from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from groups.services import GroupService
from groups.serializers import GroupsAddStudentsSerializer, GroupsListSerializer
from users.serializers import StudentsListSerializer
from .base_groups_view import BaseGroupsView
from users.permissions import IsTeacherPermission


class GroupsAddStudentsView(BaseGroupsView, GenericAPIView):
    permission_classes = (IsTeacherPermission,)

    def post(self, request):
        serializer = GroupsAddStudentsSerializer(data=request.data)
        if serializer.is_valid():
            students, groups = GroupService.add_students_to_groups(group_ids=serializer.data['groups'],
                                                                   students_ids=serializer.data['students'])
            student_serializer = StudentsListSerializer(students, many=True)
            groups_serializer = GroupsListSerializer(groups, many=True)
            return Response({
                'groups': groups_serializer.data,
                'students': student_serializer.data
            }, status=HTTP_200_OK)
        else:
            return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
