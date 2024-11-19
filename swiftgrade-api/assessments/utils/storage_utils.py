from django.core.files.storage import default_storage

from storages.backends.s3boto3 import S3Boto3Storage

from ..storage import MediaStorage


def get_storage():
    if isinstance(default_storage, S3Boto3Storage):
        return MediaStorage()
    return default_storage
