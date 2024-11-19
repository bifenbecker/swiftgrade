from swiftgrade_api import celery_app
from users.services.check_no_assessment_results_email_service import CheckNoAssessmentResultsEmailService

@celery_app.task
def process_no_assessment_result_email_task():
    CheckNoAssessmentResultsEmailService.call()
