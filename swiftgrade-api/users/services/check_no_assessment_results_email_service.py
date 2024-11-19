from datetime import date, timedelta

from celery import group
from django.db.models import Q

from users.constants import (
    FIRST_NO_ASSESSMENT_RESULT_TIMEDELTA,
    MAX_NUMBER_OF_NO_ASSESSMENT_RESULT_EMAILS,
    SECOND_NO_ASSESSMENT_RESULT_TIMEDELTA
)
from users.models import User
from users.tasks.send_no_assessment_results_email_task import \
    send_no_assessment_resutls_for_teacher_email_task


class CheckNoAssessmentResultsEmailService:
    @classmethod
    def call(cls):
        user_ids_to_send_email = cls.get_users_to_send_email()
        for subject_id, user_id in user_ids_to_send_email.items():
            cls._call_group(subject_id, user_id)

    @classmethod
    def get_users_to_send_email(cls):
        """
        Takes teachers ids for email conditions.
        """
        current_date = date.today()
        teachers_data_to_send_email = {}
        teachers_for_processing = User.objects.filter(
            role=User.TEACHER,
            enable_email_subscription=True,
            sent_emails_counter__lte=MAX_NUMBER_OF_NO_ASSESSMENT_RESULT_EMAILS,
        )

        teachers_data_to_send_email['subject_first'] = cls._get_inactive_teachers(
            current_date, current_date - timedelta(days=FIRST_NO_ASSESSMENT_RESULT_TIMEDELTA), teachers_for_processing, 0)
        teachers_data_to_send_email['subject_second'] = cls._get_inactive_teachers(
            current_date, current_date - timedelta(days=SECOND_NO_ASSESSMENT_RESULT_TIMEDELTA), teachers_for_processing, 1)
        teachers_data_to_send_email['subject_third'] = cls._get_inactive_teachers(
            current_date, current_date - timedelta(days=SECOND_NO_ASSESSMENT_RESULT_TIMEDELTA), teachers_for_processing, 2)

        return teachers_data_to_send_email
    
    @staticmethod
    def _call_group(subject_id, users_ids):
        email_sending_tasks_group = group(
            send_no_assessment_resutls_for_teacher_email_task.si(subject_id, user)
            for user in users_ids
        )
        email_sending_tasks_group.apply_async()
    
    @staticmethod
    def _get_inactive_teachers(current_date, start_date, teachers_for_processing, sent_emails_count):
        return (
            teachers_for_processing.filter(
                ~Q(classes__assessments__assessment_results__created_at__range=(start_date, current_date + timedelta(days=1))),
                ~Q(last_email_date__gte=start_date),
                created_at__lt=start_date,
                sent_emails_counter=sent_emails_count
            ).distinct().values_list('id', flat=True)
        )
