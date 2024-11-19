from api.services import BaseEmailService
from users.models import User
from datetime import date

CHARSET = "UTF-8"
NO_ASSESSMENT_RESULTS_EMAIL_SENDER = "SwiftGrade <support@goswiftgrade.com>"

SUBJECTS = {
    "subject_first": "Grade your next assessment with SwiftGrade",
    "subject_second": "Haven’t seen you in a while",
    "subject_third": "Don't ghost us yet 👻"
}

DATA = {
        "body": """<html>
        <head></head>
        <body>
          <p>Hi {first_name},</p>
          <p>My name is Bryce - one of the teacher helpers at SwiftGrade.</p>
          <p>I noticed it’s been a while since you’ve graded an assessment with SwiftGrade.</p>
          <p>Therefore, I was wondering if you need any help, or would like us to build any new features that better accommodate your grading style?</p>
          <p>To reach out simply reply to this email.</p>
          <p>I would also be happy to jump on a zoom call as well.</p>
          <p>
            Sincerely,
            <br />
            Bryce
          </p>
        </body>
        </html>
        """
    }


class SendNoAssessmentResultsEmailService(BaseEmailService):
    @classmethod
    def _build_body_email(cls, user):
        return DATA['body'].format(
            first_name=user.first_name if user.first_name else 'there',
        )

    @classmethod
    def call(cls, subject_id, user_id):
        user = User.objects.get(id=user_id)
        body = cls._build_body_email(user)
        destination = {'ToAddresses': [user.email]}
        sender = NO_ASSESSMENT_RESULTS_EMAIL_SENDER
        msg = {
            'Body': {
                'Html': {'Charset': CHARSET, 'Data': body},
            },
            'Subject': {'Charset': CHARSET, 'Data': SUBJECTS[subject_id]}
        }
        cls.send_email(sender, destination, msg)
        cls._update_user(subject_id, user)

    @classmethod
    def _update_user(cls, subject_id, user):
        user.last_email_date = date.today()
        user.sent_emails_counter += 1
        user.save()
