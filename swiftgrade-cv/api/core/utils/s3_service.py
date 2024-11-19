from botocore.exceptions import ClientError
from django.conf import settings

import boto3

from ..logger.custom_logger import CustomLogger


logger = CustomLogger.get_logger(__name__, 'recognition.log')


class S3Service:
    s3_client = boto3.client('s3')

    @classmethod
    def upload_file(cls, file_path, object_key, bucket_name=settings.AWS_BUCKET_NAME):
        '''Uploads a file to s3 bucket
        :param file_path: path to a file that needs to be uploaded
        :param object_key: path to store object on s3
        :param bucket_name: s3 bucket name
        :return: (is_error, error_message) tuple
        '''
        try:
            cls.s3_client.upload_file(file_path, bucket_name, object_key)
        except ClientError as e:
            logger.error(e)
            return True, e

        return False, ''
