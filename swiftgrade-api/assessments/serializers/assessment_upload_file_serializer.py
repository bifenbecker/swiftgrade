from django.utils.translation import ugettext as _
from rest_framework import serializers
from assessments.models import AssessmentFile

MAX_SIZE = 52428800

class AssessmentUploadFileSerializer(serializers.Serializer):
    file = serializers.FileField(required=True)

    def validate_file(self, file):
        if file and file.size > MAX_SIZE:
            raise serializers.ValidationError({'file': _('Incorrect file size')})
        return file

    def validate(self, attrs):
        file = attrs.get('file', None)
        attrs.update({'format': file.content_type})
        return attrs

    def create(self, validated_data):
        return AssessmentFile.objects.create(**validated_data)
