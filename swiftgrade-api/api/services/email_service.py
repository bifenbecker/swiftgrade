# import boto3
# from botocore.exceptions import ClientError
from django.conf import settings

from .base_email_service import BaseEmailService

BODY_HTML = """<html>
<head></head>
<body>
  <p>Hi Ash, </p>
  </br>
  <p>{message}</p>
  <p>{email}</p>
</body>
</html>
"""
CHARSET = "UTF-8"
SUBJECT = "Home page X trial user: {email}"
SUBJECT_VERSION = "Home page V[{id}] trial user: {email}"
BODY_MESSAGE = "Here's a new trial account user requesting SwiftGrade access:"
BODY_VERSION_MESSAGE = "Here's a new trial account user requesting SwiftGrade access via the v[{id}] home page:"


class EmailService(BaseEmailService):
    @staticmethod
    def _build_body(recipient, **kwargs):
        version_id = kwargs.get('version_id', None)
        if version_id:
            return BODY_HTML.format(email=recipient, message=BODY_VERSION_MESSAGE.format(id=version_id))
        return BODY_HTML.format(email=recipient, message=BODY_MESSAGE)

    @staticmethod
    def _build_subject(recipient, **kwargs):
        version_id = kwargs.get('version_id', None)
        if version_id:
            return SUBJECT_VERSION.format(email=recipient, id=version_id)
        return SUBJECT.format(email=recipient)

    @classmethod
    def send_customer_notification(cls, recipient, version_id):
        if version_id:
            return cls.send(
                settings.NOTIFICATIONS_SENDER,
                settings.CUSTOMERS_EMAIL,
                cls._build_subject(recipient, version_id=version_id),
                cls._build_body(recipient, version_id=version_id)
            )
        return cls.send(settings.NOTIFICATIONS_SENDER, settings.CUSTOMERS_EMAIL,
                        cls._build_subject(recipient), cls._build_body(recipient))

    @classmethod
    def send(cls, sender, recipient, subject, body, charset=CHARSET):
        client = cls._get_client()
        # try:
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    recipient,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': charset,
                        'Data': body,
                    },
                },
                'Subject': {
                    'Charset': charset,
                    'Data': subject,
                },
            },
            Source=sender,
        )
        return True, response['MessageId']
        # except ClientError:
        #     return False, None
