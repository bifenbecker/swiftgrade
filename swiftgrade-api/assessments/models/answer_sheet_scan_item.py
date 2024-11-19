from django.db import models
from django.conf import settings

from api.core.models import NotDeletableModel
from .answer_sheet_scan import AnswerSheetScan


class AnswerSheetScanItem(NotDeletableModel):
    page = models.IntegerField(blank=False, null=False, default=0)
    image = models.ImageField(upload_to=settings.IMAGES_FOLDER_PATH, blank=True, null=True)
    answer_sheet_scan = models.ForeignKey(AnswerSheetScan, on_delete=models.CASCADE, blank=True, null=True,
                                          related_name='scan_items')
