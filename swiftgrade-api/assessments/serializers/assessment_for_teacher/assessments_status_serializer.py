
from assessments.models import Assessment
from rest_framework import serializers


class AssessmentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = ('id', 'status', )
