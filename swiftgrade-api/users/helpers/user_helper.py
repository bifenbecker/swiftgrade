import re

from django.utils.translation import ugettext as _

from users.services import VerificationCodeService, SendVerificationLinkService

EMAIL_VALID_FORMAT = "^[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,4}$"
USERNAME_VALID_FORMAT = "^[a-zA-Z0-9]+$"
FIELD_REQUIRED_ERRORS = {
    "email": _("Email required"),
    "password": _("Password required"),
    "email_or_username": _("Email or username required"),
}
ANDROID = 'android'
IOS = 'ios'
MOBILE = 'mobile'
MOBILE_A = 'mobile_android'
MOBILE_IOS = 'mobile_ios'
WEBSITE = 'website'


class UserHelper:
    @staticmethod
    def check_email(email):
        return True if re.match(EMAIL_VALID_FORMAT, email) else False

    @staticmethod
    def check_username(username):
        return True if re.match(USERNAME_VALID_FORMAT, username) else False

    @staticmethod
    def send_verification_data(key, user, group=None):
        data = VerificationCodeService.generate_verification_code_by_kind(key, user, group)
        SendVerificationLinkService.send_to_user(user, data, key)
