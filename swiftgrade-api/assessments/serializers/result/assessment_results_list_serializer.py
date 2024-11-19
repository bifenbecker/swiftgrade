from decimal import Decimal
from rest_framework import serializers

from .assessment_result_item_serializer import AssessmentResultItemSerializer
from .base_assessment_results_list_serializer import BaseAssessmentResultsListSerializer
from ...models import AssessmentResult


MARK = Decimal('0.00')


class AssessmentResultsListSerializer(BaseAssessmentResultsListSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()
    username = serializers.CharField()
    kind = serializers.CharField(source="assessment.kind")
    named = serializers.SerializerMethodField()
    need_grading = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    data = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField()
    personal_data_image = serializers.SerializerMethodField()

    class Meta:
        model = AssessmentResult
        fields = ('id', 'created_at', 'first_name', 'last_name', 'email', 'username', 'total', 'data', 'kind',
                  'named', 'need_grading', 'personal_data_image')

    def get_data(self, result):
        results_items = result.result_items
        if results_items:
            return AssessmentResultItemSerializer(results_items, many=True, context=self.context).data
        return []
