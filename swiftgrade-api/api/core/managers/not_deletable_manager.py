from django.db import models


class NotDeletableManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)
