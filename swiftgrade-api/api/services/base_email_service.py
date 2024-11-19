import boto3
from django.conf import settings


class BaseEmailService:
    @staticmethod
    def _get_client():
        return boto3.client(
            'ses',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION
        )

    @classmethod
    def send_email(cls, sender, destination, msg):
        client = cls._get_client()
        response = client.send_email(
            Destination=destination,
            Message=msg,
            Source=sender,
        )
        return True, response['MessageId']
