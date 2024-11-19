from rest_framework import serializers
from users.models import User

from .field_choices import GENDER_CHOICES, SCHOOL_TYPE_CHOICES


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.CharField(allow_blank=False, required=True, max_length=255)
    username = serializers.CharField(allow_blank=False, required=True, max_length=255)
    phone = serializers.CharField(allow_blank=False, required=True, max_length=15)
    role = serializers.CharField(read_only=True)
    gender = serializers.ChoiceField(choices=GENDER_CHOICES, read_only=True)
    first_name = serializers.CharField(read_only=True)
    last_name = serializers.CharField(read_only=True)
    school_type = serializers.ChoiceField(choices=SCHOOL_TYPE_CHOICES, read_only=True)
    subjects = serializers.ListField(read_only=True)
    is_generic_popup_show = serializers.BooleanField(read_only=True)

    class Meta:
        model = User
        exclude = ('date_joined', 'groups', 'is_active', 'is_staff', 'is_superuser',
                   'last_login', 'user_permissions', 'status', )
