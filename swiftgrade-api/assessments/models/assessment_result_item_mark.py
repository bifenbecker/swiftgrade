from django.db import models

from api.core.models import NotDeletableModel
from .assessment_result_item import AssessmentResultItem
from .mark import Mark


class AssessmentResultItemMark(NotDeletableModel, Mark):
    assessment_result_item = models.ForeignKey(
        AssessmentResultItem, on_delete=models.CASCADE, related_name='result_item_mark')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
