from swiftgrade_api import celery_app
from users.services.check_unfinished_registration_service import CheckUnfinishedRegistrationService

@celery_app.task
def check_unfinished_registration_task():
    CheckUnfinishedRegistrationService.call()
