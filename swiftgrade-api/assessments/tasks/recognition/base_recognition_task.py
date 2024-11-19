from api.core.logger.custom_logger import CustomLogger
from celery import Task

logger = CustomLogger.get_logger(__name__, 'recognition_process.log')


class BaseRecognitionTask(Task):
    @staticmethod
    def _log_exception(data, exc, task_id):
        logger.info(f'Exception: {exc}')
        logger.info(f'Task id: {task_id}')
        logger.info(f'Data: {data}')