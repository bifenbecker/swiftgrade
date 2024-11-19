from django.db import models

from api.core.models import NotDeletableModel
from .answer_sheet_scan import AnswerSheetScan
from .assessment import Assessment


class RecognitionBatch(NotDeletableModel):
    PROCESSING = 'processing'
    COMPLETED = 'completed'
    CROPPING_COMPLETED = 'cropping_completed'
    RECOGNITION_COMPLETED = 'recognition_completed'
    RECOGNITION_ERROR = 'recognition_error'

    STATUS_CHOICES = (
        (PROCESSING, 'Processing'),
        (COMPLETED, 'Completed'),
        (CROPPING_COMPLETED, 'Cropping completed'),
        (RECOGNITION_COMPLETED, 'Recognition completed'),
        (RECOGNITION_ERROR, 'Recognition error'),
    )

    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    scans = models.ManyToManyField(AnswerSheetScan, blank=True)
    status = models.CharField(max_length=255, choices=STATUS_CHOICES, default=COMPLETED)
