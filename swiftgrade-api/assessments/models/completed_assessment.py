from django.contrib.postgres.fields import JSONField
from django.db import models

from api.core.models import NotDeletableModel
from . import AssessmentSettings
from .assessment import Assessment
from .assessment_result import AssessmentResult
from .assessment_result_type import AssessmentResultType
from users.models import Student


class CompletedAssessment(NotDeletableModel, AssessmentResultType):
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    result = models.ForeignKey(AssessmentResult, on_delete=models.CASCADE, null=True, related_name='completed_assessment')
    settings = models.ForeignKey(AssessmentSettings, null=True, on_delete=models.CASCADE, related_name='completed_assessment')
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    student_answers = JSONField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('assessment', 'result', 'student')
