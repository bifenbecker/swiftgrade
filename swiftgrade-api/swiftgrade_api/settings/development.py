from .common import *

DEBUG = True

MEDIA_PATH = 'public/'
MEDIA_URL = os.environ["HOST_URL"] + MEDIA_PATH
MEDIA_ROOT = BASE_FOLDER + MEDIA_PATH
