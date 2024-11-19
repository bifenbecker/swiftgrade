from django.db import models
from django.contrib.postgres.fields import JSONField

from api.core.models import NotDeletableModel
from .assessment_item import AssessmentItem


class Answer(NotDeletableModel):
    assessment_item = models.ForeignKey(AssessmentItem, on_delete=models.CASCADE, related_name="answer")
    body = JSONField()
    scientific_notation = models.IntegerField(blank=True, null=True)
    significant_figure = models.IntegerField(blank=True, null=True)
    tolerance = models.IntegerField(blank=True, null=True)
    tolerance_data = JSONField(default=dict)
    unit = models.CharField(max_length=255, blank=True, null=True)
    number = models.IntegerField(blank=False, null=False, default=0)
