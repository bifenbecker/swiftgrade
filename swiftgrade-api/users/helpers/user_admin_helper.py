import pytz

from django.conf import settings

from assessments.models import Assessment, AssessmentResult
from groups.models import Group
from users.models import User


IOS = 'iOS'
MOBILE_A = 'Mobile (A)'
MOBILE_IOS = 'Mobile (iOS)'


class UserAdminHelper:
    """
    Consists of methods that help to work with user data in the admin panel.
    """
    @classmethod
    def get_last_assessment(cls, user):
        last_assessment = Assessment.objects.filter(group__user=user).order_by('-created_at').first()
        return cls.convert_utc_to_admin_tz(last_assessment.created_at if last_assessment else None)
    
    @classmethod
    def get_last_group(cls, user):
        last_group = Group.objects.filter(user=user).order_by('-created_at').first()
        return cls.convert_utc_to_admin_tz(last_group.created_at if last_group else None)

    @classmethod
    def get_last_result(cls, user):
        last_result = AssessmentResult.objects.filter(assessment__group__user=user).order_by('-created_at').first()
        return cls.convert_utc_to_admin_tz(last_result.created_at if last_result else None)

    @staticmethod
    def convert_utc_to_admin_tz(utc_time):
        return utc_time.replace(tzinfo=pytz.timezone(settings.ADMIN_VANCOUVER_TIMEZONE)) if utc_time else 'N/A'

    @staticmethod
    def get_device_name(device):
        if device == User.IOS:
            return IOS
        if device == User.MOBILE_A:
            return MOBILE_A
        if device == User.MOBILE_IOS:
            return MOBILE_IOS
        return device.capitalize() if device else None

    @staticmethod
    def get_number_of_assessments_with_result(user):
        return AssessmentResult.objects.filter(assessment__group__user=user).distinct('assessment').count()
    
    @classmethod
    def get_username_or_email(cls, user):
        if user.username:
            return user.username
        return user.email
