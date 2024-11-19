from assessments.services import ExpiredAssessmentService
from swiftgrade_api import celery_app

@celery_app.task
def submit_assessment_task():
    ExpiredAssessmentService().call()