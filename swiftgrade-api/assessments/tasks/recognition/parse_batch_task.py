from api.core.logger.custom_logger import CustomLogger
from assessments.services import CheckAssessmentsRecognitionService, ParseBatchService
from swiftgrade_api import celery_app

from .base_recognition_task import BaseRecognitionTask


logger = CustomLogger.get_logger(__name__, 'recognition_process.log')


class ParseBatchTask(BaseRecognitionTask):
    def on_failure(self, exc, task_id, args, kwargs, einfo):
        if args:
            CheckAssessmentsRecognitionService.update_batch(args[0])
        self._log_exception(args, exc, task_id)

@celery_app.task(bind=True, base=ParseBatchTask)
def parse_batch(task, *args):
    ParseBatchService.parse(args[0], args[1])
