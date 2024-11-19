from django.db import models
from django.contrib.postgres.fields import ArrayField

from .assessment import Assessment
from api.core.models import NotDeletableModel


class AssessmentItem(NotDeletableModel):
    FIB = "fib"
    MC = "mc"
    MF = "mf"
    NUMERIC = "numeric"

    KIND_CHOICES = (
        (NUMERIC, "Numeric"),
        (FIB, "Fill in the blank"),
        (MC, "Multiple choice"),
        (MF, "Math"),
    )

    KINDS = [FIB, MC, MF, NUMERIC]

    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='assessment_items')
    created_at = models.DateTimeField(auto_now_add=True)
    kind = models.CharField(max_length=255, choices=KIND_CHOICES, default=NUMERIC)
    number = models.IntegerField(blank=False, null=False, default=0)
    max_mark = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    setting = ArrayField(models.CharField(max_length=50, blank=True))
    updated_at = models.DateTimeField(auto_now=True)
