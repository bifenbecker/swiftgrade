from django.utils.translation import ugettext as _
from rest_framework import serializers
from datetime import datetime
from pytz import utc
from users.models import VerificationCode

REQUIRED_USER_FIELDS = ['gender', 'first_name', 'last_name', 'school_type', 'subjects']


class CheckVerificationCodeSerializer(serializers.Serializer):
    verification_code_instance = serializers.SerializerMethodField(read_only=True)
    code = serializers.CharField()
    kind = serializers.ChoiceField(choices=VerificationCode.VERIFICATION_CODE_KIND_CHOICES)

    @staticmethod
    def _get_verirification_data(key, kind):
        return VerificationCode.manager.filter(key=key, kind=kind).first()

    @staticmethod
    def _is_update_user(user):
        if not user:
            return False

        is_update_user = True
        for field in REQUIRED_USER_FIELDS:
            value = user.__dict__.get(field, None)
            if not value:
                is_update_user = False
                break
        return is_update_user

    def validate_code(self, value):
        kind = self.initial_data.get('kind', None)
        verification_data = self._get_verirification_data(value, kind)

        if not verification_data:
            raise serializers.ValidationError(_('Code is invalid'))

        if kind == VerificationCode.EMAIL_CONFIRMATION_FOR_USER:
            current_time = datetime.now().replace(tzinfo=utc)
            updated_at, user = verification_data.updated_at, verification_data.user

            if (current_time - updated_at).days > 0 or self._is_update_user(user):
                raise serializers.ValidationError(_('This link is no longer valid'))
        return value

    def get_verification_code_instance(self, instance):
        code = instance.get('code', None)
        kind = instance.get('kind', None)

        return self._get_verirification_data(code, kind)
