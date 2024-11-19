from django.db import models


class AssessmentResultType(models.Model):
    class Meta:
        abstract = True

    MARK = 'mark'
    MARK_PLUS_STUDENT_ANSWERS = 'mark_plus_student_answers'
    MARK_PLUS_STUDENT_ANSWERS_PLUS_CORRECT_ANSWERS = 'mark_plus_student_answers_plus_correct_answers'

    RELEASE_RESULTS_TYPES = (
        (MARK, "Final mark"),
        (MARK_PLUS_STUDENT_ANSWERS, "Final mark + student's answers"),
        (MARK_PLUS_STUDENT_ANSWERS_PLUS_CORRECT_ANSWERS, "Final mark + student's answers + correct answers"),
    )

    release_results_type = models.CharField(max_length=255, choices=RELEASE_RESULTS_TYPES, null=True, blank=True)
