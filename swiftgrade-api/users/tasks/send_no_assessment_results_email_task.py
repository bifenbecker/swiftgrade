from users.services import SendNoAssessmentResultsEmailService
from swiftgrade_api import celery_app

@celery_app.task
def send_no_assessment_resutls_for_teacher_email_task(subject_id, user_id):
    SendNoAssessmentResultsEmailService.call(subject_id, user_id)
