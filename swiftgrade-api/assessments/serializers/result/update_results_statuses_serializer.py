from rest_framework import serializers

from assessments.models import Assessment, AssessmentResult


class UpdateResultsStatusesSerializer(serializers.Serializer):
    results_ids = serializers.ListField(required=True)
    status = serializers.ChoiceField(required=True, choices=AssessmentResult.STATUS_CHOICES)

    def save(self):
        results_ids, status = self.validated_data['results_ids'], self.validated_data['status']
        assessment = Assessment.manager.filter(assessment_results__in=results_ids).first()
        recognized_results = AssessmentResult.manager.filter(assessment=assessment.id, status=AssessmentResult.RECOGNIZED)
        if not recognized_results:
            assessment.status=Assessment.READY_FOR_SCAN
            assessment.save()
        return AssessmentResult.manager.filter(id__in=results_ids).update(status=status)
