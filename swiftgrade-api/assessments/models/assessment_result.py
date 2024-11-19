from django.db import models

from .assessment import Assessment
from .recognized_person import RecognizedPerson
from api.core.models import NotDeletableModel


class AssessmentResult(NotDeletableModel):
    READY_FOR_RECOGNITION = 'ready_for_recognition'
    PROCESSING = 'processing'
    RECOGNITION_ERROR = 'recognition_error'
    RECOGNIZED = 'recognized'
    VIEWED_RECOGNITION_ERROR = 'viewed_recognition_error'

    STATUS_CHOICES = (
        (READY_FOR_RECOGNITION, 'Ready for recognition'),
        (PROCESSING, 'Processing'),
        (RECOGNITION_ERROR, 'Recognition error'),
        (RECOGNIZED, 'Recognized'),
        (VIEWED_RECOGNITION_ERROR, 'Viewed recognition error')
    )

    answer_sheet_scan = models.OneToOneField('assessments.AnswerSheetScan', on_delete=models.CASCADE, null=True)
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='assessment_results')
    mark = models.DecimalField(max_digits=5, decimal_places=2, null=False, blank=False, default=0)
    recognized_person = models.OneToOneField(RecognizedPerson, on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=255, choices=STATUS_CHOICES, default=RECOGNIZED)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
