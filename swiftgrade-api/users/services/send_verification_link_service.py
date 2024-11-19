from django.conf import settings

from api.services import BaseEmailService
from users.models import VerificationCode, User
from .bigmailer_service import BigMailerService

CHARSET = 'UTF-8'
DATA = {
    VerificationCode.PASSWORD_RESET: {
        'body': """<html>
        <head></head>
        <body>
          <p>{greeting},</p>
          <p>
            Click the link below to reset your password.
            <br />
            <a href="{link}">Reset your password</a>
          </p>
          <p>
            Sincerely,
            <br />
            The SwiftGrade team
          </p>
        </body>
        </html>
        """,
        'subject': "Reset password",
    }
}
GREETINGS = {
    'named': 'Hi {name}',
    'unnamed': 'Hi'
}


class SendVerificationLinkService(BaseEmailService):
    @classmethod
    def _build_body_for_password_reset(cls, key, user):
        greeting = GREETINGS['named'].format(name=user.first_name) if user.first_name else GREETINGS['unnamed']
        return DATA[VerificationCode.PASSWORD_RESET]['body'].format(
            link=f'{settings.SWIFTGRADE_URL}reset/?code={key}', greeting=greeting
        )

    @staticmethod
    def __build_link(key, user):
        if user.role == User.TEACHER:
            return f'{settings.SWIFTGRADE_URL}account_setup/?code={key}&key=sign_up'
        return f'{settings.SWIFTGRADE_URL}student_name/?code={key}&key=sign_up'

    @classmethod
    def send_to_user(cls, user, verification_data, key=VerificationCode.EMAIL_CONFIRMATION_FOR_USER):
        if verification_data.kind == VerificationCode.EMAIL_CONFIRMATION_FOR_USER:
            verify_email_link = cls.__build_link(verification_data.key, user)
            BigMailerService.send_verification_email(user, verify_email_link)
        elif verification_data.kind == VerificationCode.PASSWORD_RESET:
            body = cls._build_body_for_password_reset(verification_data.key, user)
            cls._send_password_reset_email(settings.NOTIFICATIONS_SENDER, user.email, body, key)

    @classmethod
    def _send_password_reset_email(cls, sender, recipient, body, key):
        client = cls._get_client()

        response = client.send_email(
            Destination={'ToAddresses': [recipient]},
            Message={
                'Body': {
                    'Html': {'Charset': CHARSET, 'Data': body},
                },
                'Subject': {'Charset': CHARSET, 'Data': DATA[key]['subject']},
            },
            Source=sender,
        )
        return True, response['MessageId']
