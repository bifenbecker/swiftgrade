from django.db import models

from api.core.models import NotDeletableModel
from users.models import Student
from .assessment_result import AssessmentResult
from .answer_sheet import AnswerSheet


class AnswerSheetScan(NotDeletableModel):
    answer_sheet = models.ForeignKey(AnswerSheet, on_delete=models.CASCADE)
    assessment_result = models.ForeignKey(AssessmentResult, on_delete=models.CASCADE, blank=True, null=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    named = models.BooleanField(default=True)
    session_id = models.CharField(max_length=255, blank=False, null=False, default='')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
