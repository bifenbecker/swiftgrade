from datetime import timedelta

from django.db.models import CharField, Case, Count, Q, Max, Value, When
from django.utils import timezone

from users.models import User 


MALE = 'Male'
FEMALE = 'Female'
INACTIVE = 'Inactive'
ACTIVE = 'Active'
LAST_LOGIN_ACTIVE_PERIOD = timezone.now() - timedelta(days=30)

GENDERS = {
    User.MR: MALE,
    User.MS: FEMALE,
}


class AdminCalculatedFieldsMixin:
    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            last_group=Max('classes__created_at'),
            last_assessment=Max('classes__assessments__created_at'),
            last_result=Max('classes__assessments__assessment_results__created_at'),
            awr=Count('classes__assessments', filter=Q(classes__assessments__assessment_results__isnull=False), distinct=True),
            is_last_login_active=Case(
                When(last_login__gt=LAST_LOGIN_ACTIVE_PERIOD, then=Value(ACTIVE)),
                default=Value(INACTIVE),
                output_field=CharField()
            )
        )

    def get_user_sex(self, obj):
        return GENDERS.get(obj.gender)

    def get_subjects(self, obj):
        subjects = []
        if not obj.subjects:
            return None
        for subject in obj.subjects:
            subjects.append(subject.replace('_', ' ').capitalize())
        return ', '.join(subjects)

    def get_user_type(self, obj):
        user_type = obj.role
        return user_type.capitalize()

    def get_last_login(self, obj):
        return self._admin_helper.convert_utc_to_admin_tz(obj.last_login)

    def get_registration_date(self, obj):
        return self._admin_helper.convert_utc_to_admin_tz(obj.created_at)

    def get_plan_type(self, obj):
        return 'Free'

    def get_expiry_date(self, obj):
        return 'N/A'

    def get_group(self, obj):
        return 'General'

    def get_status(self, obj):
        if not obj.last_login or obj.last_login < LAST_LOGIN_ACTIVE_PERIOD:
            return INACTIVE
        return ACTIVE

    def get_sign_up_device(self, obj):
        device = obj.sign_up_device
        return self._admin_helper.get_device_name(device)

    def get_last_login_device(self, obj):
        device = obj.last_login_device
        if obj.last_login:
            return self._admin_helper.get_device_name(device)

    def get_last_group(self, obj):
        return self._admin_helper.get_last_group(obj)

    def get_last_assessment(self, obj):
        return self._admin_helper.get_last_assessment(obj)

    def get_last_printed_as(self, obj):
        return self._admin_helper.convert_utc_to_admin_tz(obj.last_printed_as)

    def get_last_released_as(self, obj):
        return self._admin_helper.convert_utc_to_admin_tz(obj.last_released_as)

    def get_last_result(self, obj):
        return self._admin_helper.get_last_result(obj)

    def get_number_of_assessments_with_result(self, obj):
        return self._admin_helper.get_number_of_assessments_with_result(obj)
    
    def get_username_or_email(self, obj):
        return self._admin_helper.get_username_or_email(obj)

    get_last_login.admin_order_field = 'last_login'
    get_last_login.short_description = 'RETURN DATE'
    get_user_sex.admin_order_field = 'gender'
    get_user_sex.short_description = 'SEX'
    get_subjects.short_description = 'SUBJECTS'
    get_plan_type.short_description = 'PLAN'
    get_expiry_date.short_description = 'EXPIRY DATE'
    get_registration_date.admin_order_field = 'created_at'
    get_registration_date.short_description = 'REGISTRATION DATE'
    get_group.short_description = 'GROUP'
    get_status.admin_order_field = 'is_last_login_active'
    get_status.short_description = 'STATUS'
    get_user_type.admin_order_field = 'role'
    get_user_type.short_description = 'TYPE'
    get_sign_up_device.admin_order_field = 'sign_up_device'
    get_sign_up_device.short_description = 'REGISTRATION DEVICE'
    get_last_login_device.admin_order_field = 'last_login_device'
    get_last_login_device.short_description = 'RETURN DEVICE'
    get_last_group.admin_order_field = 'last_group'
    get_last_group.short_description = 'CREATED CLASS'
    get_last_assessment.admin_order_field = 'last_assessment'
    get_last_assessment.short_description = 'CREATED AK'
    get_last_printed_as.admin_order_field = 'last_printed_as'
    get_last_printed_as.short_description = 'PRINTED AS'
    get_last_released_as.admin_order_field = 'last_released_as'
    get_last_released_as.short_description = 'RELEASED AS'
    get_last_result.admin_order_field = 'last_result'
    get_last_result.short_description = 'GOT RESULT'
    get_number_of_assessments_with_result.admin_order_field = 'awr'
    get_number_of_assessments_with_result.short_description = 'A.W.R.'
    get_username_or_email.admin_order_field = 'username'
    get_username_or_email.short_description = 'USERNAME OR EMAIL'
