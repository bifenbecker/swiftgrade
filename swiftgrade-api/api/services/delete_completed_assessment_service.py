from assessments.models import CompletedAssessment
from .base_delete_service import BaseDeleteService


class DeleteCompletedAssessmentService(BaseDeleteService):
    MODEL = CompletedAssessment

    def get_completed_assessments(self, assessments):
        return self.get_related_data(assessments, 'assessment')

    def get_completed_assessments_from_results(self, results):
        return self.get_related_data(results, 'result')
