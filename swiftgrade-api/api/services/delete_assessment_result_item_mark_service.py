from assessments.models import AssessmentResultItemMark
from .base_delete_service import BaseDeleteService


class DeleteAssessmentResultItemMarkService(BaseDeleteService):
    MODEL = AssessmentResultItemMark

    def get_assessment_result_item_marks(self, assessment_result_items):
        return self.get_related_data(assessment_result_items, 'assessment_result_item')
