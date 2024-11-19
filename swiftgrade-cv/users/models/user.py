from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models


class CustomUserManager(UserManager):
    def get_queryset(self):
        return super().get_queryset()


class User(AbstractUser):
    manager = CustomUserManager()

    email = models.EmailField(unique=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
