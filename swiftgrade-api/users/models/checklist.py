from django.db import models
from django.utils.translation import gettext_lazy as _

from . import User


class Checklist(models.Model):
    # TODO: move last printed/released AS from user model to here.
    ASSESSMENT_CREATED = 'assessment_created'
    CLASS_CREATED = 'class_created'
    RESULT_CREATED = 'result_created'
    CHECKLIST_ACTIONS_CHOICES = (
        (ASSESSMENT_CREATED, _('Assessment created')),
        (CLASS_CREATED, _('Class created')),
        (RESULT_CREATED, _('Result created')),
    )

    kind = models.CharField(max_length=255, choices=CHECKLIST_ACTIONS_CHOICES)
    last_created_at = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
