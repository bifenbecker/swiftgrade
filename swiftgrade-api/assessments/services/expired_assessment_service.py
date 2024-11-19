from assessments.helpers import AssessmentHelper
from assessments.models import CompletedAssessment
from django.utils import timezone

from .assessment.student_submit_assessment_service import StudentSubmitAssessmentService


class ExpiredAssessmentService:
    """
    Compares assessment's time limit and time difference values.
    Saves students results if needed.
    Time difference - the difference between student's completed assessment creation time and the current time
    """

    @classmethod
    def call(cls, completed_assessment=None):
        if completed_assessment:
            cls._submit_expired_assessment(completed_assessment)
            return None

        unconfirmed_completed_assessments = CompletedAssessment.manager.filter(
            assessment__settings__timer_value__isnull=False,
            assessment__settings__timer_unit__isnull=False,
            result__isnull=True,
        ).distinct()

        for completed_assessment in unconfirmed_completed_assessments:
            if not cls._is_timer_valid(completed_assessment):
                cls._submit_expired_assessment(completed_assessment)
        return None

    @classmethod
    def _is_timer_valid(cls, completed_assessment):
        current_time = cls._get_time_difference_in_seconds(completed_assessment.created_at)
        time_limit = AssessmentHelper.get_time_limit(completed_assessment.settings)

        return current_time < time_limit

    @staticmethod
    def _submit_expired_assessment(completed_assessment):
        assessment = completed_assessment.assessment
        student_answers = completed_assessment.student_answers
        user = completed_assessment.student.user
        StudentSubmitAssessmentService(assessment, user).call(student_answers)

    @staticmethod
    def _get_time_difference_in_seconds(date):
        current_time = timezone.now()
        time_difference = current_time - date
        return time_difference.seconds


