from assessments.services import CheckAssessmentsRecognitionService
from swiftgrade_api import celery_app

@celery_app.task
def check_assessments_recognition():
    CheckAssessmentsRecognitionService().call()