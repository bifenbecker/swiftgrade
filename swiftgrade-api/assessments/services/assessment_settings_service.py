from django.contrib.auth.hashers import make_password

from assessments.models import Assessment, AssessmentSettings, CompletedAssessment
from assessments.services import AssessmentService
from assessments.services.base_assessment_service import BaseAssessmentService


class AssessmentSettingsService(BaseAssessmentService):
    """
    Modifies the AssessmentSettings object. It includes such methods as:
    - create,
    - update,
    - delete.
    Updates Assessment object connected to AssessmentSettings instance if needed.
    """
    @classmethod
    def create_assessment_settings(cls, data, context):
        assessment = context.get('assessment', None)

        data.update(context)
        password = data.get('password', None)
        if password:
            data['password'] = make_password(password)

        assessment_settings = cls._create('settings', data)

        assessment.status = Assessment.ASSIGNED
        assessment.save()

        return assessment_settings

    @classmethod
    def update_assessment_settings(cls, instance, validated_data):
        return cls._update(instance, validated_data)

    @classmethod
    def unrelease_assessment_settings(cls, assessment):
        assessment = cls._unrelease_settings(assessment)
        completed_assessments_without_results = CompletedAssessment.manager.filter(assessment_id=assessment.id,
                                                                                   result_id__isnull=True)
        if completed_assessments_without_results.exists():
            completed_assessments_without_results.delete()

        return cls._update(assessment, {'status': Assessment.READY_FOR_ASSIGNMENT})

    @staticmethod
    def _unrelease_settings(assessment):
        try:
            settings = AssessmentService.get_assessment_settings(assessment.id)
            settings.is_released = False
            settings.save()
            return assessment
        except AssessmentSettings.DoesNotExist:
            return assessment
