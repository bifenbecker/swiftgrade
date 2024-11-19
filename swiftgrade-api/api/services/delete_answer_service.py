from assessments.models import Answer
from .base_delete_service import BaseDeleteService
from .delete_answer_mark_service import DeleteAnswerMarkService


class DeleteAnswerService(BaseDeleteService):
    MODEL = Answer

    RELATED_MODELS = [
        {'service': DeleteAnswerMarkService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_answer_marks'},
    ]

    def get_answers(self, assessment_items):
        return self.get_related_data(assessment_items, 'assessment_item')
