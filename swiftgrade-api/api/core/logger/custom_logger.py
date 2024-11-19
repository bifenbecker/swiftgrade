import logging
from django.conf import settings

LOG_FORMAT = f"%(asctime)s - [%(levelname)s] - %(name)s - %(message)s"


class CustomLogger:
    @classmethod
    def _get_file_handler(cls, filename='file.log', level=logging.INFO, log_format=LOG_FORMAT):
        path = settings.BASE_DIR + '/../backend_logs/' + filename
        file_handler = logging.handlers.TimedRotatingFileHandler(
            path,
            when='D',
            interval=settings.LOGGER_INTERVAL,
            backupCount=settings.LOGGER_BACKUP_COUNT,
        )
        file_handler.setLevel(level)
        file_handler.setFormatter(logging.Formatter(log_format))
        return file_handler

    @staticmethod
    def _get_stream_handler(level=logging.INFO, log_format=LOG_FORMAT):
        stream_handler = logging.StreamHandler()
        stream_handler.setLevel(level)
        stream_handler.setFormatter(logging.Formatter(log_format))
        return stream_handler

    @classmethod
    def get_logger(cls, name, filename='file.log', level=logging.INFO, log_format=LOG_FORMAT):
        logger = logging.getLogger(name)
        logger.setLevel(level)
        logger.addHandler(cls._get_file_handler(filename, level, log_format))
        logger.addHandler(cls._get_stream_handler(level, log_format))
        return logger