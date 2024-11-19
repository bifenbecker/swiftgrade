from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from groups.filters import GroupsFilter
from groups.schemas import GroupsCreateListSchema
from groups.serializers import GroupCreateSerializer, GroupsListSerializer, GroupsListForStudentSerializer
from groups.services import GroupService

from .base_groups_view import BaseGroupsView

SERIALIZERS = {
    'teacher': GroupsListSerializer,
    'student': GroupsListForStudentSerializer,
}


class GroupsListCreateView(BaseGroupsView, ListCreateAPIView):
    swagger_schema = GroupsCreateListSchema
    filter_backends = [GroupsFilter]

    def get_queryset(self):
        return GroupService.get_groups(self.request.user)

    def create(self, request, *args, **kwargs):
        context = self.get_serializer_context()
        serializer = GroupCreateSerializer(data=request.data, context=context)

        if serializer.is_valid():
            group = serializer.save()
            return Response({'group_id': group.id}, status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
