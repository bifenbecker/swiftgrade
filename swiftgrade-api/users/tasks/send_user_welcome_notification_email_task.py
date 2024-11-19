from users.services import SendWelcomeNotificationEmailService
from swiftgrade_api import celery_app

@celery_app.task
def send_user_welcome_notification_task(user_id):
    pass
    # SendWelcomeNotificationEmailService.call(user_id)