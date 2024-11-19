from assessments.models import AnswerMark
from .base_delete_service import BaseDeleteService


class DeleteAnswerMarkService(BaseDeleteService):
    MODEL = AnswerMark

    def get_answer_marks(self, answers):
        return self.get_related_data(answers, 'answer')
