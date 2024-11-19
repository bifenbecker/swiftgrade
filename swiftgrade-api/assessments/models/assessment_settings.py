from django.db import models

from .assessment_result_type import AssessmentResultType
from assessments.models import Assessment
from api.core.models import NotDeletableModel


class AssessmentSettings(NotDeletableModel, AssessmentResultType):
    MINUTES = 'minutes'
    HOURS = 'hours'
    DAYS = 'days'

    TIMER_UNITS = (
        (MINUTES, 'Minutes'),
        (HOURS, 'Hours'),
        (DAYS, 'Days'),
    )

    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='settings')
    created_at = models.DateTimeField(auto_now_add=True)
    is_anti_cheating_mode_checked = models.BooleanField(default=False)
    is_auto_release_files_checked = models.BooleanField(default=False)
    is_released = models.BooleanField(default=True)
    timer_unit = models.CharField(max_length=10, choices=TIMER_UNITS, null=True, blank=True)
    timer_value = models.IntegerField(blank=False, null=True)
    password = models.CharField(max_length=255, null=True, blank=True)
