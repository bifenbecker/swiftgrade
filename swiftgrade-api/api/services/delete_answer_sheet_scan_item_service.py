from assessments.models import AnswerSheetScanItem
from .base_delete_service import BaseDeleteService


class DeleteAnswerSheetScanItemService(BaseDeleteService):
    MODEL = AnswerSheetScanItem

    def get_answer_sheet_scan_items(self, answer_sheet_scans):
        return self.get_related_data(answer_sheet_scans, 'answer_sheet_scan')
