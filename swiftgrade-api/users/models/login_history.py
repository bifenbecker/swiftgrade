from django.db import models

from .user import User


class LoginHistory(models.Model):
    # user = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    logged_in_at = models.DateTimeField(null=True, blank=True)
