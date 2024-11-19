from assessments.models import Assessment
from assessments.services import AssessmentService, EmailResultsService
from assessments.services.report_service import ReportService

from swiftgrade_api import celery_app


@celery_app.task
def send_student_results(assessment_id, ids, kind):
    assessment = Assessment.manager.get(id=assessment_id)
    options = ReportService.build_report_data(assessment.id, ids, kind)
    EmailResultsService.send_results(
        assessment,
        'email' if kind == 'mark' else 'results',
        options,
    )
