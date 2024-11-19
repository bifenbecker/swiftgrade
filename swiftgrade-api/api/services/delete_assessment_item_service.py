from assessments.models import AssessmentItem
from .base_delete_service import BaseDeleteService
from .delete_answer_service import DeleteAnswerService
from .delete_assessment_result_item_service import DeleteAssessmentResultItemService


class DeleteAssessmentItemService(BaseDeleteService):
    MODEL = AssessmentItem

    RELATED_MODELS = [
        {'service': DeleteAnswerService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_answers'},
        {'service': DeleteAssessmentResultItemService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_assessment_result_items_from_items'},
    ]

    def get_assessment_items(self, assessments):
        return self.get_related_data(assessments, 'assessment')
