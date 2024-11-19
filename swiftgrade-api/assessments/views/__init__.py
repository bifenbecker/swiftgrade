from .answer_sheet.answer_sheet_zip_view import AnswerSheetZipView
from .answer_sheet.check_status_answer_sheet_view import CheckStatusAnswerSheetView
from .answer_sheet.custom.generate_answer_sheet_view import GenerateAnswerSheetView
from .answer_sheet.custom.preview_answer_sheet_view import PreviewAnswerSheetView
from .answer_sheet.custom.result_answer_sheet_view import ResultAnswerSheetView
from .answer_sheet.generic.generate_generic_answer_sheet_view import GenerateGenericAnswerSheetView
from .answer_sheet.generic.preview_generic_answer_sheet_view import PreviewGenericAnswerSheetView
from .answer_sheet.generic.result_generic_answer_sheet_view import ResultGenericAnswerSheetView
from .answer_sheet.get_answer_sheet_coordinates_view import GetAnswerSheetCoordinatesView

from .assessment_for_student.assign_assessment_view import AssignAssessmentView
from .assessment_for_student.assigned_assessments_list_view import AssignedAssessmentsListView
from .assessment_for_student.completed_assessments_list_view import CompletedAssessmentsListView
from .assessment_for_student.start_assessment_view import StartAssessmentView
from .assessment_for_student.student_process_assessment_view import StudentProcessAssessmentView
from .assessment_for_student.student_submit_assessment_view import StudentSubmitAssessmentView
from .assessment_for_student.unassign_assessment_view import UnassignAssessmentView

from .assessment_detail_view import AssessmentDetailView
from .assessment_file_upload_view import AssessmentFileUploadView
from .assessment_batch_file_upload_view import AssessmentBatchFileUploadView
from .assessments_list_create_view import AssessmentsListCreateView
from .check_assessment_name_view import CheckAssessmentNameView
from .copy_assessment_view import CopyAssessmentView
from .delete_assessment_view import DeleteAssessmentView
from .delete_assessment_file_view import DeleteAssessmentFileView
from .delete_assessment_files_view import DeleteAssessmentFilesView
from .get_accuracy_tips_view import GetAccuracyTipsView
from .get_assessment_name_view import GetAssessmentNameView
from .download_full_scans_view import DownloadFullScansView

from .need_grading.update_answer_need_grading_view import UpdateAnswerNeedGradingView
from .need_grading.update_assessment_need_grading_view import UpdateAssessmentNeedGradingView
from .need_grading.update_result_item_need_grading_view import UpdateResultItemNeedGradingView
from .need_grading.update_result_need_grading_view import UpdateResultNeedGradingView

from .results.assessment_analysis_view import AssessmentAnalysisView
from .results.assessment_answers_view import AssessmentAnswersView
from .results.assessment_averages_view import AssessmentAveragesView
from .results.assessment_results_view import AssessmentResultsView
from .results.assessment_results_for_mobile_view import AssessmentResultsForMobileView
from .results.assessment_results_for_student_view import AssessmentResultForStudentView
from .results.delete_results_view import DeleteResultsView
from .results.result_detail_view import ResultDetailView
from .results.generic_data_recognition_view import GenericDataRecognitionView
from .results.generic_results_recognition_view import GenericResultsRecognitionView
from .results.generic_data_cropping_view import GenericDataCroppingView
from .results.results_recognition_view import ResultsRecognitionView
from .results.update_student_mark_view import UpdateStudentMarkView
from .results.update_results_statuses_view import UpdateResultsStatusesView
from .results.download_results_view import DownloadResultsView
from .results.view_full_scans_view import ViewFullScansView

from .scans.delete_scan_answer_sheet_view import DeleteScanAnswerSheetView
from .scans.delete_scan_session_view import DeleteScanSessionView
from .scans.scan_answer_sheet_item_view import ScanAnswerSheetItemView
from .scans.scan_answer_sheet_view import ScanAnswerSheetView

from .save_student_answers_view import SaveStudentAnswersView
from .student_assessment_detail_view import StudentAssessmentDetailView
from .update_assessment_status_view import UpdateAssessmentStatusView


__all__ = (
    "AnswerSheetZipView",
    "AssessmentAnalysisView",
    "AssessmentAnswersView",
    "AssessmentAveragesView",
    "AssessmentDetailView",
    "AssessmentResultForStudentView",
    "AssessmentResultsView",
    "AssessmentFileUploadView",
    "AssessmentBatchFileUploadView",
    "AssessmentsListCreateView",
    "AssignAssessmentView",
    "AssignedAssessmentsListView",
    "CheckAssessmentNameView",
    "CheckStatusAnswerSheetView",
    "CompletedAssessmentsListView",
    "CopyAssessmentView",
    "DeleteAssessmentView",
    "DeleteResultsView",
    "DeleteScanAnswerSheetView",
    "DeleteScanSessionView",
    "DeleteAssessmentFileView",
    "GenerateAnswerSheetView",
    "GenerateGenericAnswerSheetView",
    "GenericDataRecognitionView",
    "GenericResultsRecognitionView",
    "GetAccuracyTipsView",
    "GetAnswerSheetCoordinatesView",
    "GetAssessmentNameView",
    "PreviewAnswerSheetView",
    "PreviewGenericAnswerSheetView",
    "ResultAnswerSheetView",
    "ResultGenericAnswerSheetView",
    "ResultsRecognitionView",
    "SaveStudentAnswersView",
    "ScanAnswerSheetItemView",
    "ScanAnswerSheetView",
    "StartAssessmentView",
    "StudentAssessmentDetailView",
    "StudentProcessAssessmentView",
    "StudentSubmitAssessmentView",
    "UnassignAssessmentView",
    "UpdateAnswerNeedGradingView",
    "UpdateAssessmentNeedGradingView",
    "UpdateAssessmentStatusView",
    "UpdateResultItemNeedGradingView",
    "UpdateResultNeedGradingView",
    "UpdateStudentMarkView",
    "ViewFullScansView",
    "DownloadFullScansView",
)
