from django.db import models

from users.models import User

from ..utils import get_storage


class AnswerSheetZip(models.Model):
    CUSTOM = "custom"
    GENERIC = "generic"

    KIND_CHOICES = (
        (CUSTOM, 'Custom'),
        (GENERIC, 'Generic MC'),
    )

    created_at = models.DateTimeField(auto_now_add=True)
    document = models.FileField(storage=get_storage(), upload_to='answer_sheets/', blank=True)
    is_download = models.BooleanField(default=False)
    kind = models.CharField(max_length=255, choices=KIND_CHOICES, default=CUSTOM)
    uuid = models.CharField(max_length=255, blank=False, null=False, default='')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='answer_sheet_archives', null=True)



