from rest_framework import permissions
from django.utils import timezone

from assessments.helpers import AssessmentHelper
from assessments.models import CompletedAssessment
from assessments.services import AssessmentService, ExpiredAssessmentService
from users.helpers import PermissionHelper


def _get_assessments_ids(group, user):
    return AssessmentService.get_completed_assessments(group.id, user, True)


def _get_assessment_settings(assessment):
    return AssessmentService.get_assessment_settings(assessment.id)


def _get_completed_assessment(completed_assessment_id):
    return CompletedAssessment.manager.get(id=completed_assessment_id)


def _is_completed_assessment_valid(assessment, student):
    completed_assessment = CompletedAssessment.manager \
        .filter(assessment=assessment, student=student, result_id__isnull=True).last()
    settings = _get_assessment_settings(assessment)

    if completed_assessment and settings:
        results_exist = completed_assessment.result is not None
        if AssessmentHelper.get_is_timer(assessment):
            current_time = (timezone.now() - completed_assessment.created_at).seconds
            time_limit = AssessmentHelper.get_time_limit(settings)
            if current_time > time_limit and not results_exist:
                ExpiredAssessmentService().call(completed_assessment)
            return current_time < time_limit and not results_exist
        return not results_exist
    return False


class IsStudentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return PermissionHelper.is_student(request.user)


class IsStudentPermissionForAssessments(permissions.BasePermission):
    """
    Allows access to students for group assessments
    """

    def has_permission(self, request, view):
        group = PermissionHelper.get_group_for_assessment(view)
        return PermissionHelper.is_student_for_group(group, request.user)


class IsStudentPermissionForAssessment(permissions.BasePermission):
    """
    Allows access to students for assessments
    """

    @staticmethod
    def _get_view_name(view):
        return view.as_view().__name__

    def has_permission(self, request, view):
        group = PermissionHelper.get_group_for_assessment(view)
        if PermissionHelper.is_student_for_group(group, request.user):
            assessment = PermissionHelper.get_object('assessment', view)
            settings = _get_assessment_settings(assessment)
            password = settings.password if assessment and settings else None
            if password and self._get_view_name(view) == 'StudentProcessAssessmentView':
                student_password = request.data.get('password', None)
                is_password_valid = AssessmentHelper.is_password_valid(assessment, student_password)
                return is_password_valid and _is_completed_assessment_valid(assessment, request.user.student)
            return _is_completed_assessment_valid(assessment, request.user.student)
        return False


class IsStudentPermissionForAssessmentResult(permissions.BasePermission):
    """
    Allows access to students for assessment result
    """
    def has_permission(self, request, view):
        group = PermissionHelper.get_group_for_assessment(view)
        if PermissionHelper.is_student_for_group(group, request.user):
            assessment_id = view.kwargs.get('assessment_id', None)
            completed_assessment_id = view.kwargs.get('completed_assessment_id', None)
            completed_assessment = _get_completed_assessment(completed_assessment_id)
            release_results_type = completed_assessment.release_results_type if completed_assessment else None
            return (assessment_id and int(assessment_id) in _get_assessments_ids(group, request.user) and
                    release_results_type is not None)
        return False
