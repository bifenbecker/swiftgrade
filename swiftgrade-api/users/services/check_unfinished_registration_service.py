from datetime import datetime, timedelta, timezone

from celery import group
from django.db.models import DurationField, ExpressionWrapper, F

from users.constants import FIRST_UNFINISHED_EMAIL_STEP, SECOND_UNFINISHED_EMAIL_STEP
from users.models import User
from users.tasks.send_unfinished_registration_task import send_unfinished_registration_task

UNFINISHED_REGISTRATION_FIRST_EMAIL_TIME =  10 * 60  # 10 min in seconds
UNFINISHED_REGISTRATION_SECOND_EMAIL_TIME = 24 * 60 * 60  # 24 hours in seconds


class CheckUnfinishedRegistrationService:
    
    @classmethod
    def call(cls):
        first_email_users = cls._get_users_to_send_email(UNFINISHED_REGISTRATION_FIRST_EMAIL_TIME)
        second_email_users = cls._get_users_to_send_email(UNFINISHED_REGISTRATION_SECOND_EMAIL_TIME)

        cls._call_group(first_email_users, FIRST_UNFINISHED_EMAIL_STEP)
        cls._call_group(second_email_users, SECOND_UNFINISHED_EMAIL_STEP)

    @staticmethod
    def _call_group(users, email_type):
        email_sending_tasks_group = group(
            send_unfinished_registration_task.si(user.id, email_type)
            for user in users
        )
        email_sending_tasks_group.apply_async()

    @staticmethod
    def _get_users_to_send_email(seconds):
        """
        Takes teachers ids for email conditions.
        """
        time_from = datetime.now(tz=timezone.utc) - timedelta(seconds=seconds)
        time_to = time_from + timedelta(seconds=59)
        teachers_to_send_email = User.objects.filter(role=User.TEACHER, is_info_page_passed=False, created_at__gte=time_from, created_at__lte=time_to)

        return teachers_to_send_email
