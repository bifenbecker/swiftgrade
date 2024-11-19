from django.utils.translation import ugettext as _
from rest_framework import serializers
from assessments.models import AssessmentFile

from . import AssessmentUploadFileSerializer

MAX_SIZE = 50 * 2**20  # 50M


class AssessmentBatchUploadFileSerializer(serializers.Serializer):
    files = AssessmentUploadFileSerializer(many=True)

    def validate_files(self, files):
        total_size = sum(file['file'].size for file in files)
        if total_size > MAX_SIZE:
            raise serializers.ValidationError({'files': _('Incorrect total files size')})
        return files

    def create(self, validated_data):
        return AssessmentFile.objects.bulk_create([
            AssessmentFile(**file) for file in validated_data['files']
        ])
