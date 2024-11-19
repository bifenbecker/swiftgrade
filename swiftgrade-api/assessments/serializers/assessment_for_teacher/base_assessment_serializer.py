from assessments.models import Assessment
from assessments.validators import AssessmentValidator

from django.db.models.query import QuerySet
from django.utils.translation import ugettext as _

from rest_framework import serializers

NAME_ERRORS = {
    'default': _('Assessment name required'),
    'create_assessment': _('An assessment name is required.'),
}


class BaseAssessmentSerializer(serializers.Serializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if not isinstance(self.instance, QuerySet):
            name_validation_type = self.context.get('name_validation_type', 'default')

            for i in ['required', 'null', 'blank']:
                self.fields['name'].error_messages[i] = _(NAME_ERRORS[name_validation_type])

    def validate_name(self, value):
        assessment_id = self.instance.id if self.instance else None
        group_id = self.context['group_id']
        name_validation_type = self.context.get('name_validation_type', 'default')

        return AssessmentValidator.validate_name(value, assessment_id, name_validation_type, group_id)

    def validate_assessment_items(self, value):
        compare_by_characters = self.initial_data.get('compare_by_characters')
        return AssessmentValidator.validate_assessment_items(value, compare_by_characters)
