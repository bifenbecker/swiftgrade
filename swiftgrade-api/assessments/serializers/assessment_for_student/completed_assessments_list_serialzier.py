from rest_framework import serializers

from assessments.helpers import AssessmentHelper
from assessments.models import Assessment, CompletedAssessment
from assessments.services import AssessmentResultsService

from decimal import Decimal


class CompletedAssessmentsListSerializer(serializers.ModelSerializer):
    completed_assessment_id = serializers.IntegerField(allow_null=True)
    date_completed = serializers.DateTimeField()
    score = serializers.SerializerMethodField()

    class Meta:
        model = Assessment
        fields = ('id', 'completed_assessment_id', 'name', 'date_completed', 'score', 'type', )

    @staticmethod
    def _get_completed_assessment(completed_assessment_id):
        return CompletedAssessment.manager.filter(id=completed_assessment_id).first()

    def get_score(self, instance):
        completed_assessment = self._get_completed_assessment(instance.completed_assessment_id)
        release_results_type = completed_assessment.release_results_type if completed_assessment else None
        if release_results_type:
            total = AssessmentResultsService.get_assessment_total_mark(instance).quantize(Decimal('.1'))
            mark = Decimal('0.00')
            if completed_assessment.result:
                mark = completed_assessment.result.mark
            return AssessmentHelper.get_result(mark, total)
        return None
