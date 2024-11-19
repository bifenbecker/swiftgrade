from django.db.models import Count
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from groups.models import Group
from groups.serializers import CopyGroupSerializer, GroupsListSerializer
from groups.schemas import GroupCopySchema
from groups.services import GroupService

from users.permissions import IsUserPermissionForGroups


class CopyGroupView(GenericAPIView):
    permission_classes = (IsUserPermissionForGroups, )
    serializer_class = CopyGroupSerializer
    swagger_schema = GroupCopySchema

    def get_serializer_context(self):
        return {'user': self.request.user}

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context=self.get_serializer_context())

        if serializer.is_valid():
            group = serializer.save()
            copied_group = GroupService.get_group_by_id(group_id=group.id)
            response_data = GroupsListSerializer(copied_group).data
            return Response(response_data, status=HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
