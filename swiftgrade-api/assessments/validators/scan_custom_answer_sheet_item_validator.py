from assessments.models import AnswerSheet, AnswerSheetScan, AnswerSheetScanItem, Assessment
from assessments.services import AssessmentCVService
from assessments.validators import ScanAnswerSheetItemValidator

from django.utils.translation import ugettext as _
from rest_framework import serializers

import datetime


class ScanCustomAnswerSheetItemValidator(ScanAnswerSheetItemValidator):
    @classmethod
    def call(cls, assessment_id, scan_id, data):
        scan_item = cls._create(data["image"])
        response, status_code = AssessmentCVService.parse_barcode("custom", {'url': scan_item.image.url})

        cls._check_response(status_code, scan_item)

        answer_sheet = cls._check_answer_sheet(assessment_id, response['answer_sheet_id'])
        named = cls._check_answer_sheet_item(scan_id, response)

        return {
            "assessment_id": assessment_id,
            "kind": data["kind"],
            "response": response,
            "scan_id": scan_id,
            "scan_item": scan_item,
            "scan_params": {
                "named": named,
                "pages": answer_sheet.named_page_count if named else answer_sheet.unnamed_page_count,
                "session_id": data["session_id"],
            },
        }

    @classmethod
    def _check_answer_sheet_item(cls, scan_id, response):
        if not scan_id:
            if response['page'] != 1:
                raise serializers.ValidationError({'error': _("Incorrect page of answer sheet")})

            return cls._get_named_or_unnamed_scan(response)

        scan = AnswerSheetScan.manager.filter(id=scan_id).first()
        cls._check_existed_answer_sheet_item(response['global_code'], response['page'], scan)

        return scan.named

    @staticmethod
    def _check_existed_answer_sheet_item(global_id, page, scan):
        if scan.global_id != global_id:
            raise serializers.ValidationError({'error': _("Incorrect answer sheet")})

        scanned_pages = AnswerSheetScanItem.manager \
            .filter(answer_sheet_scan_id=scan.id).values_list('page', flat=True)

        if page in scanned_pages:
            raise serializers.ValidationError({'error': _("Incorrect page of answer sheet")})

    @staticmethod
    def _check_inexistent_answer_sheet_item(named):
        if named is None:
            raise serializers.ValidationError({'error': _("Incorrect page of answer sheet")})

    @staticmethod
    def _check_answer_sheet(assessment_id, answer_sheet_id):
        answer_sheet = AnswerSheet.objects.filter(assessments__id=assessment_id, id=answer_sheet_id).first()
        if not answer_sheet:
            raise serializers.ValidationError({'error': _("Incorrect answer sheet")})

        assessment = Assessment.manager.filter(id=assessment_id).first()
        if answer_sheet and assessment and isinstance(assessment.answers_updated_at, datetime.date) and assessment.answers_updated_at > answer_sheet.created_at:
            raise serializers.ValidationError({'error': _("Incompatible answer sheet")})
        return answer_sheet
