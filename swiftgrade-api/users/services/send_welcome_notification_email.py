from django.conf import settings

from api.services import BaseEmailService
from users.models import User

CHARSET = 'UTF-8'
WELCOME_EMAIL_SENDER = 'SwiftGrade <hello@goswiftgrade.com>'
DATA = {
        'body': """<html>
        <head></head>
        <body>
          <p>{greeting},</p>
          <p>Thanks for signing up!</p>
          <p>We are confident that if you give SwiftGrade a chance it will save you a lot of time.</p>
          <p>To begin, visit your <a href="{dashboard_link}">dashboard</a> and create your first class.</p>
          <p>If you need help, please email us or message us on WhatsApp. We respond quickly.</p>
          <p>
            Sincerely,
            <br />
            The SwiftGrade team
          </p>
        </body>
        </html>
        """,
        'subject': "Welcome to SwiftGrade!",
}

GREETINGS = {
    'named': 'Hi {first_name}',
    'unnamed': 'Hi'
}


class SendWelcomeNotificationEmailService(BaseEmailService):
    @classmethod
    def _build_body_for_welcome_email(cls, user):
        greeting = GREETINGS['named'].format(first_name=user.first_name) if user.first_name else GREETINGS['unnamed']
        return DATA['body'].format(
            dashboard_link=cls.__build_link(),
            greeting=greeting,
        )

    @staticmethod
    def __build_link():
        return f'{settings.SWIFTGRADE_URL}'

    @classmethod
    def call(cls, user_id):
        user = User.objects.get(id=user_id)
        body = cls._build_body_for_welcome_email(user)
        destination = {'ToAddresses': [user.email]}
        sender = WELCOME_EMAIL_SENDER
        msg = {
            'Body': {
                'Html': {'Charset': CHARSET, 'Data': body},
            },
            'Subject': {'Charset': CHARSET, 'Data': DATA['subject']}
        }
        cls.send_email(sender, destination, msg)
