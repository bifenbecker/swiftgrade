from groups.serializers import GroupsListSerializer, GroupsListForStudentSerializer
from users.helpers import PermissionHelper

SERIALIZERS = {
    'teacher': GroupsListSerializer,
    'student': GroupsListForStudentSerializer,
}


class BaseGroupsView:
    def get_serializer_context(self):
        return {'user': self.request.user}

    def get_serializer(self, *args, **kwargs):
        role = 'teacher' if PermissionHelper.is_teacher(self.request.user) else 'student'
        return SERIALIZERS[role](*args, **kwargs)
