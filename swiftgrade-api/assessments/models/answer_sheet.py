from django.db import models

from .assessment_item import Assessment


class AnswerSheet(models.Model):
    CUSTOM = "custom"
    GENERIC = "generic"
    GENERIC_GROUP = "generic_group"

    KIND_CHOICES = (
        (CUSTOM, 'Custom'),
        (GENERIC, 'Generic MC'),
        (GENERIC_GROUP, 'Generic MC for group')
    )

    assessments = models.ManyToManyField(Assessment, blank=True)
    coordinate_id = models.CharField(max_length=255, blank=True, null=True)
    unnamed_coordinate_id = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    kind = models.CharField(max_length=255, choices=KIND_CHOICES, default=CUSTOM)
    named_page_count = models.IntegerField(blank=False, null=False, default=1)
    unnamed_page_count = models.IntegerField(blank=False, null=False, default=1)
    changed = models.BooleanField(default=False)
    document_file = models.FileField(blank=True, null=True, upload_to='answer_sheets')
    preview_document_file = models.FileField(blank=True, null=True, upload_to='answer_sheets')

    @property
    def document_url(self):
        return self.document_file.url if self.document_file else None

    @property
    def preview_document_url(self):
        return self.preview_document_file.url if self.preview_document_file else None
