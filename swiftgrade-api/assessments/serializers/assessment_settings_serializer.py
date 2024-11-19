from rest_framework import serializers

from assessments.helpers import AssessmentHelper
from assessments.models import AssessmentSettings

from .assessments_files_list_serializer import AssessmentsFilesListSerializer


class AssessmentSettingsSerializer(serializers.ModelSerializer):
    is_password_entered = serializers.SerializerMethodField()
    is_timer = serializers.SerializerMethodField()
    time_limit = serializers.SerializerMethodField()
    files = AssessmentsFilesListSerializer(many=True)

    class Meta:
        model = AssessmentSettings
        fields = ('id', 'assessment_id', 'files', 'release_results_type',
                  'is_auto_release_files_checked', 'is_password_entered', 'is_anti_cheating_mode_checked',
                  'time_limit', 'is_timer',)

    def get_is_password_entered(self, instance):
        return True if instance.password else False

    def get_is_timer(self, instance):
        return instance.timer_unit is not None and isinstance(instance.timer_value, int)

    def get_time_limit(self, instance):
        """
        Get timer value in seconds
        """
        return AssessmentHelper.get_time_limit(instance)
