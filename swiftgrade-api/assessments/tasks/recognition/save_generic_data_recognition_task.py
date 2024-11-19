from api.core.logger.custom_logger import CustomLogger
from assessments.models import Assessment, RecognitionBatch
from assessments.services import CheckAssessmentsRecognitionService, ParseGenericBatchService

from swiftgrade_api import celery_app
from .base_recognition_task import BaseRecognitionTask


logger = CustomLogger.get_logger(__name__, 'recognition_process.log')


class SaveGenericDataRecognitionTask(BaseRecognitionTask):
    def on_failure(self, exc, task_id, args, kwargs, einfo):
        batch = RecognitionBatch.manager.filter(id=args[0]).first()

        if batch:
            batch.status = RecognitionBatch.COMPLETED
            batch.save()

            CheckAssessmentsRecognitionService.update_batch(batch)
        self._log_exception(args, exc, task_id)

@celery_app.task(bind=True, base=SaveGenericDataRecognitionTask)
def save_generic_data_recognition_task(task, *args):
    ParseGenericBatchService.match_students(args[0], args[1])
