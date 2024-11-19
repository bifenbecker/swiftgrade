from django.core.files.storage import default_storage
from django.db import models

from storages.backends.s3boto3 import S3Boto3Storage

from .assessment_settings import AssessmentSettings
from ..storage import MediaStorage


def _get_storage():
    if isinstance(default_storage, S3Boto3Storage):
        return MediaStorage()
    return default_storage


class AssessmentFile(models.Model):
    assessment_setting = models.ForeignKey(
        AssessmentSettings, on_delete=models.CASCADE, related_name='files', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(storage=_get_storage(), upload_to='assessments/', blank=True)
    file_id = models.CharField(max_length=255)
    format = models.CharField(max_length=100)
    pdf_file = models.FileField(upload_to='assessments/', blank=True)
