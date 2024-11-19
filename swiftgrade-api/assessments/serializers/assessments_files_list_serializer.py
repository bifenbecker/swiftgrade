from rest_framework import serializers
from assessments.models import AssessmentFile

KILOBYTE, MEGABYTE = 1024, 1048576

class AssessmentsFilesListSerializer(serializers.ModelSerializer):
    # file_id = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    link = serializers.SerializerMethodField()
    pdf_link = serializers.SerializerMethodField()

    class Meta:
        model = AssessmentFile
        fields = ('id', 'format', 'name', 'link', 'size', 'pdf_link', )

    @staticmethod
    def _format_size(size, kind = KILOBYTE, kind_msg = 'KB'):
        return f'{round(size / kind, 1)}{kind_msg}'

    def get_file_id(self, instance):
        return f'{instance.id}_{instance.format}'

    def get_name(self, instance):
        if instance.file:
            return instance.file.name.split('/')[-1]
        return ''

    def get_size(self, instance):
        try:
            return instance.file.size
        except Exception as e:
            return 0

    def get_link(self, instance):
        return instance.file.url if instance.file else None

    def get_pdf_link(self, instance):
        return instance.pdf_file.url if instance.pdf_file else None
