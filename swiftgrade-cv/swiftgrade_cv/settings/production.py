from .common import *

MEDIA_ROOT = 'public/'
MEDIA_URL = 'public/'

DEBUG = False

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
        # 'debug_logfile': {
        #     'level': 'DEBUG',
        #     'formatter': 'logfile_format',
        #     'class': 'logging.FileHandler',
        #     'filename': BASE_DIR +'/../backend_logs/debug.log',
        # },
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