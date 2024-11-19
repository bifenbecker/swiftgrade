from assessments.models import AssessmentResultItem
from .base_delete_service import BaseDeleteService
from .delete_assessment_result_item_mark_service import DeleteAssessmentResultItemMarkService


class DeleteAssessmentResultItemService(BaseDeleteService):
    MODEL = AssessmentResultItem

    RELATED_MODELS = [
        {'service': DeleteAssessmentResultItemMarkService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_assessment_result_item_marks'},
    ]

    def get_assessment_result_items_from_items(self, assessment_items):
        return self.get_related_data(assessment_items, 'assessment_item')

    def get_assessment_result_items_from_results(self, assessment_results):
        return self.get_related_data(assessment_results, 'assessment_result')
