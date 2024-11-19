import uuid

from users.models import VerificationCode, User
from .user_service import UserService

class VerificationCodeService:
    @classmethod
    def check_verification_code_by_kind(cls, verification_instance):
        kind, user = verification_instance.kind, verification_instance.user
        if kind == VerificationCode.EMAIL_CONFIRMATION_FOR_USER and user and user.status != User.ACTIVE:
            user = UserService.update_user(user, {'status': User.ACTIVE})
        return user

    @classmethod
    def generate_verification_code_by_kind(cls, kind, user, group=None):
        return cls._generate_code_for_user(user, kind, group)

    @classmethod
    def _generate_code_for_user(cls, user, kind, group):
        key = cls._generate_code()
        instance, is_created = VerificationCode.manager.update_or_create(
            group=group, kind=kind, user=user, defaults={'key': key})
        return instance

    @staticmethod
    def _generate_code():
        return str(uuid.uuid4())
