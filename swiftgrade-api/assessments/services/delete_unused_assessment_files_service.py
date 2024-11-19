from assessments.models import AssessmentFile
from datetime import timedelta
from django.utils import timezone

class DeleteUnusedAssessmentFilesService:
    def call(self):
        date = timezone.now() - timedelta(days=1)
        return AssessmentFile.objects.filter(created_at__lt=date).delete()