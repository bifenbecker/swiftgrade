from assessments.models import AssessmentResult, AssessmentResultItemMark
from assessments.validators import AssessmentResultsValidator
from rest_framework import serializers
from decimal import Decimal, ROUND_HALF_UP


class UpdateStudentMarkSerializer(serializers.Serializer):
    kind = serializers.ChoiceField(required=True, choices=['answer', 'significant_figure', 'unit'])
    value = serializers.DecimalField(required=True, max_digits=None, decimal_places=None)


    @staticmethod
    def _update_result_mark(id):
        items, total = AssessmentResult.manager.filter(id=id) \
            .prefetch_related('result_items').first().result_items.all(), Decimal('0.00')
        for item in items:
            for mark in item.result_item_mark.all():
                total += mark.value
        AssessmentResult.manager.filter(id=id).update(mark=total)


    def validate_value(self, value):
        value = value.quantize(Decimal('.00'), rounding=ROUND_HALF_UP)
        return value

    def validate(self, attrs):
        kind = attrs.get('kind', None)
        mark_id = self.context.get('mark_id', None)
        value = attrs.get('value', None)

        instance = AssessmentResultItemMark.manager.filter(id=mark_id).first()
        return AssessmentResultsValidator.validate_mark(instance, value, kind)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        self._update_result_mark(instance.assessment_result_item.assessment_result.id)
        return instance
