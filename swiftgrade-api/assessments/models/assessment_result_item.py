from django.db import models
from django.contrib.postgres.fields import JSONField
from django.conf import settings
from .answer import Answer
from .assessment_item import AssessmentItem
from .assessment_result import AssessmentResult
from api.core.models import NotDeletableModel


class AssessmentResultItem(NotDeletableModel):
    assessment_result = models.ForeignKey(AssessmentResult, on_delete=models.CASCADE, related_name='result_items')
    assessment_item = models.ForeignKey(AssessmentItem, on_delete=models.CASCADE, related_name='result_items')
    correct_answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='correct_answer', null=True)
    body = JSONField()
    image = models.ImageField(upload_to=settings.IMAGES_FOLDER_PATH, blank=True, null=True)
    is_manually_graded = models.BooleanField(default=False)
    unit_image = models.ImageField(upload_to=settings.IMAGES_FOLDER_PATH, blank=True, null=True)
    need_grading = models.BooleanField(null=False, blank=False, default=False)
    need_grading_for_units = models.BooleanField(null=False, blank=False, default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
