from .common import *

DEBUG = False

MEDIA_PATH = 'public/'
MEDIA_URL = os.environ["HOST_URL"] + MEDIA_PATH
MEDIA_ROOT = BASE_FOLDER + MEDIA_PATH

FILE_UPLOAD_PERMISSIONS = 0o644
FILE_UPLOAD_MAX_MEMORY_SIZE = 6291456

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'logfile_format': {
            'format': '[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'filters': None,
            'class': 'logging.StreamHandler',
        },
        'debug_logfile': {
            'level': 'DEBUG',
            'formatter': 'logfile_format',
            'class': 'logging.FileHandler',
            'filename': BASE_DIR +'/../backend_logs/debug.log',
        },
        # 'logger': {
        #     'level': 'DEBUG',
        #     'class': 'api.core.logger.custom_logger.CustomLogger',
        # },
    },
    'loggers': {
        'logger': {
            'level': 'DEBUG',
            'class': 'api.core.logger.custom_logger.CustomLogger',
        },
    },
}
