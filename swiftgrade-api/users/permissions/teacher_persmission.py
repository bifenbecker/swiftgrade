from rest_framework import permissions
from users.helpers import PermissionHelper


class IsTeacherPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return PermissionHelper.is_teacher(request.user)

class IsTeacherPermissionForGroupStudents(permissions.BasePermission):
    """
    Allows access to group students for teachers
    """
    @staticmethod
    def _get_view_name(view):
        return view.as_view().__name__

    def has_permission(self, request, view):
        if request.method == 'POST' and self._get_view_name(view) == 'StudentsListCreateView':
            return True

        data = view.request.query_params if request.method == 'GET' else view.request.data
        group_id = data.get('group_id', None)
        group = PermissionHelper.get_object_by_id('group', group_id)
        return PermissionHelper.is_teacher_for_group(group, request.user)


class IsTeacherPermissionForAssessments(permissions.BasePermission):
    """
    Allows access to group students for assessments
    """
    def has_permission(self, request, view):
        group = PermissionHelper.get_group_for_assessment(view)
        return PermissionHelper.is_teacher_for_group(group, request.user)