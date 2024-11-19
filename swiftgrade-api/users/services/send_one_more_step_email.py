from django.conf import settings

from api.services import BaseEmailService
from users.constants import FIRST_UNFINISHED_EMAIL_STEP, SECOND_UNFINISHED_EMAIL_STEP
from users.models import User

CHARSET = 'UTF-8'

SUBJECTS = {
    FIRST_UNFINISHED_EMAIL_STEP: 'Complete your registration',
    SECOND_UNFINISHED_EMAIL_STEP: 'Just one more step to go',
}

DATA = {
        'body': """<html>
        <head></head>
        <body>
          <p>Hi there,</p>
          <p>There is just one more step to complete your SwiftGrade registration:</p>
          <ul>
            <li>If you already clicked our email verification link: Please <a href="{login_link}">login</a></li>
            <br />
            <li>If you have not yet clicked our email verification link: Please send a new verification code from our <a href="{sign_up_link}">sign-up</a> page.</li>
          </ul>  
          <p>If you need help, please reply to this email or message us on WhatsApp at +12366688799.</p>
          <p>We hope to have you onboard soon!</p>
          <p>
            Sincerely,
            <br />
            The SwiftGrade team
          </p>
        </body>
        </html>
        """,
}


class SendOneMoreStepEmail(BaseEmailService):
    @classmethod
    def _build_body(cls):
        return DATA['body'].format(
            login_link=cls.__build_login_link(), 
            sign_up_link=cls.__build_sign_up_link(), 
        )

    @classmethod
    def _build_subject(cls, step_type):
        return SUBJECTS[step_type]

    @staticmethod
    def __build_sign_up_link():
        return f'{settings.SWIFTGRADE_URL}sign_up/'

    @staticmethod
    def __build_login_link():
        return f'{settings.SWIFTGRADE_URL}sign_in/'

    @classmethod
    def call(cls, user_id, email_type):
        user = User.objects.get(id=user_id)
        body = cls._build_body()
        subject = cls._build_subject(email_type)
        destination = {'ToAddresses': [user.email]}
        sender = settings.NOTIFICATIONS_SENDER
        msg = {
            'Body': {
                'Html': {'Charset': CHARSET, 'Data': body},
            },
            'Subject': {'Charset': CHARSET, 'Data': subject}
        }
        cls.send_email(sender, destination, msg)
