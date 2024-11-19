from django.utils.translation import ugettext as _
from rest_framework import serializers

from assessments.models import AssessmentFile
from assessments.services import AssessmentSettingsService

VALIDATION_ERRORS = {
    'timer_value': _('Please enter a time limit.  If this assessment has no time limit please unselect the checkbox.'),
    'password': _('Please enter a password.  If students don’t need a password to start this assessment, please '
                  'unselect the checkbox.'),
}


class AssignAssessmentSerializer(serializers.Serializer):
    group_id = serializers.IntegerField(required=True)
    attachments = serializers.ListField(required=False)
    timer_value = serializers.IntegerField(required=False, allow_null=True)
    timer_unit = serializers.CharField(required=False, allow_null=True)
    release_results_type = serializers.CharField(required=False, allow_null=True)
    is_auto_release_files_checked = serializers.BooleanField(required=False)
    is_anti_cheating_mode_checked = serializers.BooleanField(required=False)
    password = serializers.CharField(max_length=255, required=False, allow_null=True, allow_blank=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for key in ['blank', 'required']:
            self.fields['password'].error_messages[key] = VALIDATION_ERRORS['password']

    def validate_timer_value(self, value):
        if value == 0:
            raise serializers.ValidationError(VALIDATION_ERRORS['timer_value'])
        return value

    def validate(self, attrs):
        attrs.pop('group_id')
        return attrs

    def create(self, validated_data):
        attachments = validated_data.pop('attachments', None)
        settings = AssessmentSettingsService.create_assessment_settings(validated_data, self.context)
        self._update_files(attachments, settings)
        return settings

    def update(self, instance, validated_data):
        attachments = validated_data.pop('attachments', None)
        settings = AssessmentSettingsService.update_assessment_settings(instance, validated_data)
        self._update_files(attachments, settings)
        return settings

    @staticmethod
    def _update_files(files_ids, setting):
        if files_ids:
            AssessmentFile.objects.filter(id__in=files_ids).update(assessment_setting=setting)

