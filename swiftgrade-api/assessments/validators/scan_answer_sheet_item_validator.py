from assessments.models import AnswerSheetScanItem
from django.utils.translation import ugettext as _

from rest_framework import serializers


class ScanAnswerSheetItemValidator:
    @staticmethod
    def _check_response(status_code, scan_item):
        if status_code != 200:
            # scan_item.delete()
            raise serializers.ValidationError({"error": _("This photo can not be processed. Make sure to take a bright photo of flat page.")})

    @staticmethod
    def _create(image):
        return AnswerSheetScanItem.manager.create(image=image)

    @staticmethod
    def _get_named_or_unnamed_scan(data):
        return True if data["user_id"] else False
