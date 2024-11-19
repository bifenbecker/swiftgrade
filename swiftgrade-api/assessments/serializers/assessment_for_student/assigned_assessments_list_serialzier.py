from rest_framework import serializers

from assessments.helpers import AssessmentHelper
from assessments.models import Assessment
from assessments.services import AssessmentService

SECONDS_IN_DAY = 60 * 60 * 24
SECONDS_IN_HOUR = 3600
SECONDS_IN_MIN = 60


class AssignedAssessmentsListSerializer(serializers.ModelSerializer):
    time_limit = serializers.SerializerMethodField()
    is_timer = serializers.SerializerMethodField()

    class Meta:
        model = Assessment
        fields = ('id', 'name', 'status', 'time_limit', 'is_timer',)

    @staticmethod
    def _format_value(value):
        return f'0{value}' if len(str(value)) == 1 else value

    def get_is_timer(self, instance):
        return AssessmentHelper.get_is_timer(instance)

    def get_time_limit(self, instance):
        """
        Get timer value in seconds
        """
        settings = AssessmentService.get_assessment_settings(instance.id)
        seconds = AssessmentHelper.get_time_limit(settings)

        days = seconds // SECONDS_IN_DAY
        hours = (seconds - (days * SECONDS_IN_DAY)) // SECONDS_IN_HOUR
        minutes = (seconds - (days * SECONDS_IN_DAY) - (hours * SECONDS_IN_HOUR)) // SECONDS_IN_MIN

        return {
            'days': self._format_value(days),
            'hours': self._format_value(hours),
            'min': self._format_value(minutes),
        }
