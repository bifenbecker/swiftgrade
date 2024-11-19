from users.services import SendOneMoreStepEmail
from swiftgrade_api import celery_app

@celery_app.task
def send_unfinished_registration_task(user_id, email_type):
    SendOneMoreStepEmail.call(user_id, email_type)
