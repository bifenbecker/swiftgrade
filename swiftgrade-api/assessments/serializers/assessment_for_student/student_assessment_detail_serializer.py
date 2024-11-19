from assessments.models import Assessment, CompletedAssessment
from assessments.serializers.assessment_settings_serializer import AssessmentSettingsSerializer
from assessments.services import AssessmentService
from groups.serializers import GroupSerializer
from rest_framework import serializers


class StudentAssessmentDetailSerializer(serializers.ModelSerializer):
    group = GroupSerializer()
    settings = serializers.SerializerMethodField()

    class Meta:
        model = Assessment
        fields = ('id', 'created_at', 'group', 'kind',  'name', 'settings', 'status', 'type', )

    def get_settings(self, instance):
        completed_assessment_id = self.context.get('completed_assessment_id', None)
        completed_assessment = CompletedAssessment.manager.filter(id=completed_assessment_id).first()
        settings = completed_assessment.settings if completed_assessment \
            else AssessmentService.get_assessment_settings(instance.id)
        return AssessmentSettingsSerializer(settings).data if settings else None
