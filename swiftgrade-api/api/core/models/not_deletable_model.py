from django.db import models

from api.core.managers import NotDeletableManager


class NotDeletableModel(models.Model):
    class Meta:
        abstract = True

    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = models.Manager()
    manager = NotDeletableManager()
