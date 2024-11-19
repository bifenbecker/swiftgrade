from rest_framework import serializers
from assessments.validators import ScanItemValidator

class ScanAnswerSheetItemSerializer(serializers.Serializer):
    answer_sheet_id = serializers.IntegerField(required=True)
    image = serializers.ImageField(required=True)
    page = serializers.IntegerField(required=True)
    scan_id = serializers.IntegerField(required=False, default=None)
    student_id = serializers.IntegerField(required=False, default=None)
    session_id = serializers.CharField(required=True)

    def validate_answer_sheet_id(self, answer_sheet_id):
        return ScanItemValidator.validate_answer_sheet(answer_sheet_id)

    def validate(self, data):
        answer_sheet = data.get('answer_sheet_id', None)
        scan_id = data.get('scan_id', None)
        student_id = data.get('student_id', None)
        assessment_id = self.context.get('assessment_id', None)

        named = student_id is not None
        image, page = data.pop('image', None), data.pop('page', 0)

        ScanItemValidator.validate_page(answer_sheet, named, page, scan_id)
        ScanItemValidator.validate_student(named, student_id, assessment_id)
        ScanItemValidator.validate_assessment_id(assessment_id)

        data.update({'answer_sheet_id': answer_sheet.id, 'named': named})
        return {
            'assessment_id': assessment_id,
            'scan_item': {'image': image, 'page': page},
            'scan': data,
        }