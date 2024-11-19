from django.db import models
from .user import User


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)

    @property
    def first_name(self):
        return self.user.first_name if self.user else None

    @property
    def last_name(self):
        return self.user.last_name if self.user else None

    @property
    def email(self):
        return self.user.email if self.user else None
    
    @property
    def username(self):
        return self.user.username if self.user else None