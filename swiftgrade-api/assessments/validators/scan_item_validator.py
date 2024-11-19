from django.utils.translation import ugettext as _
from rest_framework import serializers

from assessments.models import AnswerSheet, Assessment
from users.models import Student

class ScanItemValidator:
    @staticmethod
    def validate_answer_sheet(answer_sheet_id):
        answer_sheet = AnswerSheet.objects.filter(id=answer_sheet_id).first()
        if not answer_sheet:
            raise serializers.ValidationError({'answer_sheet_id': _("Incorrect answer sheet")})
        return answer_sheet

    @staticmethod
    def validate_assessment_id(assessment_id):
        if assessment_id:
            assessment = Assessment.manager.filter(id=assessment_id).first()
            assessment_type = assessment.type if assessment else None
            if assessment_type == Assessment.ONLINE:
                raise serializers.ValidationError({'assessment_id': _("Incorrect assessment id")})
        return assessment_id

    @staticmethod
    def validate_page(answer_sheet, named, page, scan_id):
        pages = answer_sheet.named_page_count if named else answer_sheet.unnamed_page_count
        if pages < page or not scan_id and page > 0:
            raise serializers.ValidationError({'page': _("Incorrect page")})
        return page

    @staticmethod
    def validate_student(named, student_id, assessment_id):
        student = Student.objects.filter(id=student_id).first()
        if named and not (student and Assessment.manager.filter(group__in=student.group_set.all(), id=assessment_id).exists()):
            raise serializers.ValidationError({'student_id': _("Incorrect student")})
        return student_id
