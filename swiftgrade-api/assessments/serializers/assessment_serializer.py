from assessments.models import Assessment, AnswerSheet
from groups.serializers import GroupSerializer
from rest_framework import serializers


class AssessmentSerializer(serializers.ModelSerializer):
    answers_sheets_ids = serializers.SerializerMethodField()
    group = GroupSerializer()

    class Meta:
        model = Assessment
        fields = ('id', 'name', 'kind', 'status', 'created_at', 'group', 'answers_sheets_ids', 'type')

    def get_answers_sheets_ids(self, instance):
        return AnswerSheet.objects.filter(assessments__id=instance.id).values_list('id', flat=True)
