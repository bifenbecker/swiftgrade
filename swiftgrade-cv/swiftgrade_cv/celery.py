from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from dotenv import read_dotenv


read_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))
# set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "swiftgrade_cv.settings.development")

app = Celery('swiftgrade_cv')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')


# Load task modules from all registered Django app configs.
app.autodiscover_tasks()
