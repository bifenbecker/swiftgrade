from assessments.models import AssessmentSettings
from .base_delete_service import BaseDeleteService


class DeleteAssessmentSettingsService(BaseDeleteService):
    MODEL = AssessmentSettings

    def get_assessment_settings(self, assessments):
        return self.get_related_data(assessments, 'assessment')
