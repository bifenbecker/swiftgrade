from assessments.helpers.assessment_helper import AssessmentHelper
from assessments.models import CompletedAssessment, AssessmentSettings
from assessments.services.base_assessment_service import BaseAssessmentService


class CompletedAssessmentService(BaseAssessmentService):
    """
    Modifies CompletedAssessment objects. Includes such methods as:
    - create,
    - update.
    """
    def __init__(self, assessment, user, completed_assessment_id=None):
        self.assessment = assessment
        self.completed_assessment_id = completed_assessment_id
        self.user = user

    def call(self, data):
        """
        Gets a completed assessment object

        Parameters:
            data (dict): Data for changing the completed assessment object
                         which is connected to the particular assessment and user

        Returns:
            CompletedAssessment object
        """

        completed_assessment_data = {
            'assessment_id': self.assessment.id,
            'result_id__isnull': True,
            'student_id': self.user.student.id,
        } if self.completed_assessment_id is None else {'id': self.completed_assessment_id}

        completed_assessment = CompletedAssessment.manager.filter(**completed_assessment_data)

        if completed_assessment.exists():
            completed_assessment = completed_assessment.last()
            return self._update_completed_assessment(completed_assessment, data)
        return self._create_completed_assessment(data)

    def _create_completed_assessment(self, data):
        try:
            if AssessmentHelper.get_is_timer(self.assessment):
                settings = AssessmentSettings.manager.filter(assessment_id=self.assessment.id, is_released=True).last()
                countdown = AssessmentHelper.get_time_limit(settings)

                from assessments.tasks import submit_assessment_task
                submit_assessment_task.apply_async(countdown=countdown)

            return CompletedAssessment.manager.create(
                assessment_id=self.assessment.id,
                student_id=self.user.student.id,
                **data,
            )
        except:
            return None

    def _update_completed_assessment(self, obj, data):
        return self._update(obj, data)
