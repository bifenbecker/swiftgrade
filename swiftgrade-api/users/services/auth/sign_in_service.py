from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from datetime import timedelta

import jwt
from django.conf import settings
from django.utils import timezone

from groups.models import Group
from users.models import User, Student
from users.services import UserService, BigMailerService

STATUSES = [User.ACTIVE, User.EMAIL_VERIFICATION]


class SignInService:
    @staticmethod
    def cut_user_name(name):
        return name[:30] if name else None

    @staticmethod
    def generate_client_secret(apple_id):
        headers = {'kid': settings.APPLE_KEY_ID}
        payload = {
            'iss': settings.APPLE_TEAM_ID,
            'iat': timezone.now(),
            'exp': timezone.now() + timedelta(days=180),
            'aud': 'https://appleid.apple.com',
            'sub': apple_id,
        }
        with open(settings.APPLE_PRIVATE_KEY_PATH, "rb") as sk:
            data = sk.read()
            private_key = serialization.load_pem_private_key(data, password=None, backend=default_backend())
        client_secret = jwt.encode(
            payload,
            private_key,
            algorithm='ES256',
            headers=headers
        )
        return client_secret

    @classmethod
    def save_user(cls, validated_data):
        code = validated_data.get('code', None)
        data = cls._get_defaults_sign_in_data(validated_data)
        prefilled_user_data = cls._get_prefilled_user_data(validated_data)
        user, is_created = UserService.update_or_create(data, STATUSES)
        if user.role == User.STUDENT and not hasattr(user, 'student') and code:
            cls._add_student_for_user(user, code)
        BigMailerService.create_contact(user)
        return user, prefilled_user_data

    @classmethod
    def _add_student_for_user(cls, user, code):
        Student.objects.create(user=user)
        group = cls._get_group_by_code(code)
        group.students.add(user.student)

    @classmethod
    def _get_defaults_sign_in_data(cls, data):
        return {
            'email': data['email'],
            'username': data['username'],
            'role': data['role'],
            'status': User.ACTIVE,
            **cls._get_device_data(data)
        }

    @staticmethod
    def _get_device_data(data):
        user = UserService.get_user_by_email(data['email'])
        return (
            {'last_login_device': data['last_login_device']} if user and user.sign_up_device else {'sign_up_device': data['sign_up_device']}
        )

    @staticmethod
    def _get_group_by_code(code):
        return Group.manager.filter(code=code).first()

    @staticmethod
    def _get_prefilled_user_data(data):
        user = UserService.get_user_by_email(data['email'])
        return {
            'first_name': user.first_name if user and user.first_name else data['first_name'],
            'last_name': user.last_name if user and user.last_name else data['last_name'],
        }
