from datetime import datetime, timedelta, timezone
from random import choice
from string import ascii_lowercase, digits

from assessments.models import AnswerSheetScan
from django.contrib.auth.hashers import check_password, make_password
from users.models import LoginHistory, Student, User

from .auth.jwt_token_service import JWTTokenService


class UserService:
    @classmethod
    def is_password_valid(cls, user, password):
        return user and password and check_password(password, user.password)

    @classmethod
    def get_user_by_email(cls, email, statuses=[User.ACTIVE]):
        email = email.lower() if email else None
        users = User.objects.filter(email__iexact=email, status__in=statuses)

        students_ids_with_scans = cls._get_students_ids_with_scans(users)
        if students_ids_with_scans:
            users = users.exclude(student__id__in=students_ids_with_scans)

        return users.first()

    @classmethod
    def get_user_by_username(cls, username, statuses=[User.ACTIVE]):
        username = username.lower() if username else None
        users = User.objects.filter(username__iexact=username, status__in=statuses)

        students_ids_with_scans = cls._get_students_ids_with_scans(users)
        if students_ids_with_scans:
            users = users.exclude(student__id__in=students_ids_with_scans)

        return users.first()

    @classmethod
    def login_user(cls, user):
        tokens = JWTTokenService.generate(user)
        cls.update_user_last_login(user)
        return tokens

    @classmethod
    def update_or_create(cls, data, statuses):
        user = cls.get_user_by_email(data['email'], statuses)
        if 'password' in data:
            data.update({'password': cls._encrypt_password(data['password'])})
        if user:
            data.pop('role', None)
            return cls.update_user(user, data), False
        else:
            return User.objects.create(**data), True

    @classmethod
    def update_user_last_login(cls, user):
        cls._update_user_last_login(user)
        cls._update_user_login_history(user)

    @classmethod
    def update_user(cls, user, data):
        for attr, value in data.items():
            setattr(user, attr, value)
        user.save()
        return user

    @staticmethod
    def _get_students_ids_with_scans(users):
        users_ids = users.values_list('id', flat=True)
        students_ids = Student.objects.filter(user_id__in=users_ids).values_list('id', flat=True)
        return AnswerSheetScan.manager.filter(named=False, student_id__in=students_ids).values_list('student_id', flat=True)

    @staticmethod
    def _encrypt_password(password):
        return make_password(password)

    @staticmethod
    def _update_user_last_login(user):
        now_utc = datetime.now(tz=timezone.utc)

        if now_utc - user.created_at > timedelta(days=1):
            user.last_login = now_utc
            user.save()
        return user

    @staticmethod
    def _update_user_login_history(user):
        """
        Adds each login time entry for the teacher.
        """
        if user.role == User.TEACHER:
            logged_history = LoginHistory.objects.create(user_id=user.id, logged_in_at=datetime.now(tz=timezone.utc))
            return logged_history

    @classmethod
    def generate_random_username(cls, length=12, chars=ascii_lowercase+digits, split=4, delimiter=''):
        """
        Generate unique username with lowercase letters and digits. 
        """
        username = ''.join([choice(chars) for _ in range(length)])

        if split:
            username = delimiter.join([username[start:start+split] for start in range(0, len(username), split)])

        if cls.get_user_by_username(username=username, statuses=[User.ACTIVE, User.EMAIL_VERIFICATION]):
            return cls.generate_random_username(length=length, chars=chars, split=split, delimiter=delimiter)
        else:
            return username
