from django.db.models import Count, Q
from django.utils.translation import gettext_lazy as _
from rest_framework.generics import RetrieveUpdateDestroyAPIView

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from assessments.models import Assessment

from assessments.services import CustomAnswerSheetService
from groups.models import Group
from groups.schemas import GroupDetailSchema
from groups.serializers import GroupsListSerializer, GroupUpdateSerializer, GroupsListForStudentSerializer
from groups.services import GroupService
from users.helpers import PermissionHelper
from users.permissions import IsUserPermissionForGroups
from api.services import SoftDeleteService

SERIALIZERS = {
    'teacher': GroupsListSerializer,
    'student': GroupsListForStudentSerializer,
}


class GroupDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsUserPermissionForGroups,)
    swagger_schema = GroupDetailSchema

    def get_serializer(self, *args, **kwargs):
        role = 'teacher' if PermissionHelper.is_teacher(self.request.user) else 'student'
        return SERIALIZERS[role](*args, **kwargs)

    def get_object(self):
        groups = GroupService.get_groups(self.request.user)
        return get_object_or_404(groups, id=self.kwargs.get('group_id', None))

    def get_serializer_context(self):
        return {
            'group_id': self.kwargs.get('group_id', None),
            'user': self.request.user,
        }

    def update(self, request, *args, **kwargs):
        context = self.get_serializer_context()
        instance = self.get_object()

        serializer = GroupUpdateSerializer(instance, data=request.data, context=context)

        if serializer.is_valid():
            group_id = context['group_id']
            if not group_id:
                return Response({"errors": _("Group ID can not be empty.")}, status=HTTP_400_BAD_REQUEST)

            serializer.save()

            CustomAnswerSheetService.prepare_answer_sheets_to_be_regenerated(context['group_id'])
            group = GroupService.get_group_by_id(group_id=context['group_id'])
            response_data = GroupsListSerializer(group).data

            return Response(response_data, status=HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        group = self.get_object()
        SoftDeleteService().perform('group', group)
        return Response(status=HTTP_204_NO_CONTENT)
