from rest_framework import serializers

from assessments.helpers import AssessmentHelper
from assessments.models import Assessment
from assessments.services import AssessmentService
from groups.serializers import GroupSerializer


class StudentProcessAssessmentSerializer(serializers.ModelSerializer):
    assessment_items = serializers.SerializerMethodField()
    completed_assessment_id = serializers.SerializerMethodField()
    group = GroupSerializer()
    is_anti_cheating_mode = serializers.SerializerMethodField()
    is_timer = serializers.SerializerMethodField()
    results_exist = serializers.SerializerMethodField()
    student_answers = serializers.SerializerMethodField()
    time_limit = serializers.SerializerMethodField()

    class Meta:
        model = Assessment
        fields = ('id', 'assessment_items', 'group', 'is_anti_cheating_mode', 'is_timer', 'kind', 'name',
                  'results_exist', 'student_answers', 'time_limit', 'completed_assessment_id')

    def get_assessment_items(self, instance):
        return AssessmentService.get_assessment_items_for_student(instance)

    def get_completed_assessment_id(self, instance):
        completed_assessment = self.context.get('completed_assessment', None)
        return completed_assessment.id if completed_assessment else None

    def get_is_anti_cheating_mode(self, instance):
        settings = AssessmentService.get_assessment_settings(instance.id)
        return settings and settings.is_anti_cheating_mode_checked

    def get_is_timer(self, instance):
        settings = AssessmentService.get_assessment_settings(instance.id)
        return settings.timer_unit is not None and isinstance(settings.timer_value, int) if settings else False

    def get_results_exist(self, instance):
        completed_assessment = self.context.get('completed_assessment', None)
        return completed_assessment and completed_assessment.result is not None

    def get_student_answers(self, instance):
        completed_assessment = self.context.get('completed_assessment', None)
        return completed_assessment.student_answers if completed_assessment else None

    def get_time_limit(self, instance):
        """
        Get remaining timer value in seconds
        """
        completed_assessment = self.context.get('completed_assessment', None)
        settings = completed_assessment.settings if completed_assessment else None
        return AssessmentHelper.get_remaining_time_limit(completed_assessment, settings)
