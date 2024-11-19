from botocore.exceptions import ClientError
from django.conf import settings

from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from api.services import BaseEmailService

CHARSET = "UTF-8"
SUBJECT = "{assessment_name} results"
DATA = {
    'email': {
        'body': """<html>
        <head></head>
        <body>
          {student_name}
          <p>Your {assessment_name} result is: {mark}</p>
          <p>If you have a SwiftGrade account, you can also {link_to_results} and view your results there.</p>
          <p>Sincerely,</p>
          <p>The SwiftGrade team</p>
        </body>
        </html>
        """,
        'subject': SUBJECT,
    },
    'results': {
        'body': """<html>
        <head></head>
        <body>
          {student_name}
          <p>Your {assessment_name} result is: {mark}</p>
          <p>The attached file contains your answers.</p>
          <p>If you have a SwiftGrade account, you can also {link_to_results} and view your results there.</p>
          <p>Sincerely,</p>
          <p>The SwiftGrade team</p>
        </body>
        </html>
        """,
        'subject': SUBJECT,
    }
}


class EmailResultsService(BaseEmailService):
    @staticmethod
    def _build_body(data, body):
        student_name = '<p>Hi {first_name}, </p>'.format(first_name=data['first_name']) \
            if data['first_name'] else '<p>Hi,</p>'

        results_url = f'{settings.SWIFTGRADE_URL}groups/{data["assessment"]["group_id"]}/completed_assessments/'
        link_to_results = f'<a href="{results_url}">log in</a>'        

        return body.format(
            assessment_name=data['assessment']['name'],
            mark=data['mark'],
            student_name=student_name,
            link_to_results=link_to_results,
        )

    @staticmethod
    def _build_subject(data, subject):
        return subject.format(assessment_name=data['assessment']['name'])

    @classmethod
    def send_results(cls, assessment, kind, response):
        for item in response:
            if item['email']:
                data = {
                    'assessment': {
                        'id': assessment.id,
                        'name': assessment.name,
                        'group_id': assessment.group_id,
                    },
                    'kind': kind,
                    'file': item['file'],
                    'mark': item['mark'],
                    'first_name': item['first_name'],
                    'type': assessment.type,
                }
                cls._send(settings.NO_REPLY_NOTIFICATIONS_SENDER, item['email'], data)

    @classmethod
    def _send(cls, sender, recipient, data):
        client = cls._get_client()

        email_data = DATA.get(data['kind'], 'email')
        body = cls._build_body(data, email_data.get('body'))

        msg = MIMEMultipart('mixed')

        msg['From'] = sender
        msg['Subject'] = cls._build_subject(data, email_data.get('subject'))
        msg['To'] = recipient

        msg_body = MIMEMultipart('alternative')
        msg_body.attach(MIMEText(body.encode(CHARSET), 'html', CHARSET))

        msg.attach(msg_body)

        if data['file']:
            attachment = MIMEApplication(data['file'].read())
            attachment.add_header('Content-Disposition', 'attachment', filename='results.pdf')
            msg.attach(attachment)

        try:
            response = client.send_raw_email(
                Source=settings.NO_REPLY_NOTIFICATIONS_SENDER,
                Destinations=[
                    recipient,
                ],
                RawMessage={'Data': msg.as_string()},
            )
        except ClientError as e:
            return None
        else:
            return response['MessageId']
