from assessments.services import DeleteUnusedAssessmentFilesService
from swiftgrade_api import celery_app


@celery_app.task
def delete_unused_assessment_files():
    DeleteUnusedAssessmentFilesService().call()