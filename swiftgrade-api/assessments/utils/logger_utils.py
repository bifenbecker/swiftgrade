from api.core.logger import CustomLogger
from time import time

logger = CustomLogger.get_logger(__name__, 'recognition_requests.log')

def log_view(func):
    def wrapper(*args, **kwargs):
        request = args[1]
        logger.info(f'Doc: {func.__doc__}')
        logger.info(f'Request data: {request.data}')
        return func(*args, **kwargs)
    return wrapper

def log_timeit_view(func):
    def wrapper(*args, **kwargs):
        ts = time()
        request = args[1]
        logger.info(f'Doc: {func.__doc__}')
        logger.info(f'Request data: {request.data}')
        data = func(*args, **kwargs)
        te = time()
        logger.info(f'Request processing time: {te-ts}')
        return data
    return wrapper

def log_timeit(func):
    def wrapper(*args, **kwargs):
        ts = time()
        data = func(*args, **kwargs)
        te = time()
        if args[0] == 'scan_item':
            logger.info(f'Scan database creating time: {te-ts}')
        return data
    return wrapper
