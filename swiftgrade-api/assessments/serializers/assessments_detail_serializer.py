from assessments.models import Assessment, AnswerSheet, AssessmentResult, AssessmentResultItem
from assessments.services import AssessmentService

from groups.serializers import GroupSerializer

from rest_framework import serializers


class AssessmentDetailSerializer(serializers.ModelSerializer):
    answers_sheets_ids = serializers.SerializerMethodField()
    assessment_items = serializers.SerializerMethodField()
    group = GroupSerializer()
    is_manually_graded = serializers.SerializerMethodField()
    results_exist = serializers.SerializerMethodField()

    class Meta:
        model = Assessment
        fields = ('id', 'answers_sheets_ids', 'assessment_items', 'compare_by_characters', 'created_at', 'group',
                  'is_manually_graded', 'kind', 'name', 'results_exist', 'status', 'type')

    def get_answers_sheets_ids(self, instance):
        return AnswerSheet.objects.filter(assessments__id=instance.id).values_list('id', flat=True)

    def get_assessment_items(self, instance):
        return AssessmentService.get_assessment_items(instance)

    def get_is_manually_graded(self, instance):
        return AssessmentResultItem.manager \
            .filter(assessment_result__assessment_id=instance.id, is_manually_graded=True).exists()

    def get_results_exist(self, instance):
        return AssessmentResult.manager.filter(assessment_id=instance.id, status="recognized").exists()
