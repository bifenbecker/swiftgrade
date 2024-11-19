from assessments.models import RecognitionBatch
from .base_delete_service import BaseDeleteService


class DeleteRecognitionBatchService(BaseDeleteService):
    MODEL = RecognitionBatch

    def get_recognition_batch(self, assessments):
        return self.get_related_data(assessments, 'assessment')
