from assessments.models import Assessment, AnswerSheet
from assessments.services import AssessmentCVService
from assessments.validators import ScanAnswerSheetItemValidator

from django.utils.translation import ugettext as _
from django.contrib.postgres.aggregates import ArrayAgg

from rest_framework import serializers


class ScanGenericAnswerSheetItemValidator(ScanAnswerSheetItemValidator):
    @classmethod
    def call(cls, assessment_id, data):
        scan_item = cls._create(data["image"])
        response, status_code = AssessmentCVService.parse_barcode("generic", {"url": scan_item.image.url})
        cls._check_response(status_code, scan_item)

        assessment = Assessment.manager.filter(id=assessment_id).first()
        cls._check_group(response["class_id"], response["user_id"], assessment)
        cls._check_answer_sheet(assessment, response["answer_sheet_id"])

        return {
            "assessment_id": assessment_id,
            "kind": data["kind"],
            "response": response,
            "scan_item": scan_item,
            "scan_params": {
                "named": cls._get_named_or_unnamed_scan(response),
                "pages": 1,
                "session_id": data["session_id"],
            },
            "result": response["results"],
        }

    @staticmethod
    def _check_group(an_group_id, user_id, assessment):
        group_id, kind = assessment.group.id, assessment.kind
        named = user_id and an_group_id

        if kind == Assessment.GENERIC and named and int(an_group_id) != int(group_id):
            raise serializers.ValidationError({"error": _("Incorrect class")})

    @classmethod
    def _check_answer_sheet(cls, assessment, answer_sheet_id):
        answer_sheet = AnswerSheet.objects.filter(id=answer_sheet_id) \
            .annotate(assessments_ids=ArrayAgg("assessments")).first()

        if not answer_sheet:
            raise serializers.ValidationError({"error": _("Incorrect answer sheet")})

        if assessment.id not in answer_sheet.assessments_ids:
            answer_sheet.assessments.add(assessment)
