from django.conf import settings

from users.models import User
# from users.tasks import send_user_welcome_notification_task


class SendWelcomeNotificationEmailProcessService:
    pass

    # @classmethod
    # def call(cls, user):
    #     if not user.is_info_page_passed:
    #         send_user_welcome_notification_task.si(
    #             user.id,
    #         ).apply_async()
    #         user.is_info_page_passed = True
    #         user.save()