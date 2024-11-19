from assessments.models import AnswerSheetScan
from .base_delete_service import BaseDeleteService
from .delete_answer_sheet_scan_item_service import DeleteAnswerSheetScanItemService


class DeleteAnswerSheetScanService(BaseDeleteService):
    MODEL = AnswerSheetScan

    RELATED_MODELS = [
        {'service': DeleteAnswerSheetScanItemService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_answer_sheet_scan_items'},
    ]

    def get_answer_sheet_scans(self, assessment_results):
        return self.get_related_data(assessment_results, 'assessment_result')
