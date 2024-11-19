from django.db import models

from api.core.models import NotDeletableModel
from groups.models.group import Group
from .user import User


class VerificationCode(NotDeletableModel):
    EMAIL_CONFIRMATION_FOR_STUDENT = 'email_confirmation_for_student'
    EMAIL_CONFIRMATION_FOR_USER = 'email_confirmation_for_user'
    PASSWORD_RESET = 'password_reset'
    VERIFICATION_CODE_KIND_CHOICES = (
        (EMAIL_CONFIRMATION_FOR_STUDENT, 'Email confirmation for student'),
        (EMAIL_CONFIRMATION_FOR_USER, 'Email confirmation for user'),
        (PASSWORD_RESET, 'Password reset'),
    )
    key = models.CharField(max_length=100)
    kind = models.CharField(max_length=100, choices=VERIFICATION_CODE_KIND_CHOICES, default=EMAIL_CONFIRMATION_FOR_USER)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, blank=True, null=True, related_name='verification_codes')
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name='verification_codes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
