from django.db.models import F


GENDER_FIELD = 'gender'
LAST_ASSESSMENT_FIELD = 'last_assessment'
LAST_GROUP_FIELD = 'last_group'
LAST_LOGIN_FIELD = 'last_login'
LAST_LOGIN_DEVICE_FIELD = 'last_login_device'
LAST_PRINTED_AS_FIELD = 'last_printed_as'
LAST_RELEASED_AS_FIELD = 'last_released_as'
LAST_RESULT_FIELD = 'last_result'
PHONE_FIELD = 'phone'
SCHOOL_TYPE_FIELD = 'school_type'
SIGN_IP_DEVICE_FIELD = 'sign_up_device'

CUSTOM_ORDERING_FIELDS = (
    GENDER_FIELD,
    LAST_ASSESSMENT_FIELD,
    LAST_GROUP_FIELD,
    LAST_LOGIN_FIELD,
    LAST_LOGIN_DEVICE_FIELD,
    LAST_PRINTED_AS_FIELD,
    LAST_RELEASED_AS_FIELD,
    LAST_RESULT_FIELD,
    PHONE_FIELD,
    SCHOOL_TYPE_FIELD,
    SIGN_IP_DEVICE_FIELD
)


class AdminFieldsOrderingMixin:
    def _get_changelist_class(self, base_class, request, **kwargs):

        class CustomChangeList(base_class):
            # Custom ordering method to make nulls_last for last_login
            def get_ordering(self, request, queryset):
                ordering = super().get_ordering(request, queryset)

                return self._get_custom_ordering(ordering)

            @staticmethod
            def _get_custom_ordering(ordering):
                custom_ordering = []
                for field in ordering:
                    field_asc = field[1:]
                    if field_asc in CUSTOM_ORDERING_FIELDS:
                        custom_ordering.append(F(field_asc).asc(nulls_last=True))
                    elif field in CUSTOM_ORDERING_FIELDS:
                        custom_ordering.append(F(field).desc(nulls_last=True))
                    else:
                        custom_ordering.append(field)

                return custom_ordering

        return CustomChangeList

    def get_changelist(self, request, **kwargs):
        # Get custom ChangeList class for nulls_last ordering by last_login
        ChangeListBase = super().get_changelist(request)
        return self._get_changelist_class(ChangeListBase, request, **kwargs)
