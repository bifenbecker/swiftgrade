from django.db import models


class Mark(models.Model):
    class Meta:
        abstract = True

    ANSWER = "answer"
    SIGNIFICANT_FIGURE = "significant_figure"
    UNIT = "unit"

    KIND_CHOICES = (
        (ANSWER, "Answer"),
        (UNIT, "Unit"),
        (SIGNIFICANT_FIGURE, "Significant figure"),
    )

    KINDS = [ANSWER, SIGNIFICANT_FIGURE, UNIT]

    kind = models.CharField(max_length=255, choices=KIND_CHOICES, default=ANSWER)
    value = models.DecimalField(max_digits=5, decimal_places=2)
