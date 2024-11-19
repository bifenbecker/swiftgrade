from rest_framework import permissions

from assessments.services import AssessmentService

from users.helpers import PermissionHelper
from users.models import User


def _get_assessments_ids(group, user):
    return AssessmentService.get_completed_assessments(group.id, user, True)


class IsUserPermissionForGroups(permissions.BasePermission):
    """
    Allows access to groups for users
    """
    def has_permission(self, request, view):
        group = PermissionHelper.get_object('group', view)

        if request.user and request.user.role == User.TEACHER:
            return PermissionHelper.is_teacher_for_group(group, request.user)

        return request.method == 'GET' and PermissionHelper.is_student_for_group(group, request.user)


class IsUserPermissionForAssessment(permissions.BasePermission):
    """
    Allows access to groups for users
    """
    @staticmethod
    def _get_view_name(view):
        return view.as_view().__name__

    def has_permission(self, request, view):
        group = PermissionHelper.get_group_for_assessment(view)

        if PermissionHelper.is_teacher_for_group(group, request.user):
            return True

        if PermissionHelper.is_student_for_group(group, request.user):
            if request.method == 'GET' and self._get_view_name(view) == 'AssessmentFileUploadView':
                return True
            assessment_id = view.kwargs.get('assessment_id', None)
            return assessment_id and int(assessment_id) in _get_assessments_ids(group, request.user)
        return False


class IsUserPermissionForUserDetail(permissions.BasePermission):
    """
    Allows access to user detail information for user
    """
    def has_permission(self, request, view):
        user_id = view.kwargs.get('user_id', None)

        if user_id and PermissionHelper.is_teacher(request.user):
            return True
        return user_id and PermissionHelper.is_student(request.user) and request.user.id == int(user_id)
