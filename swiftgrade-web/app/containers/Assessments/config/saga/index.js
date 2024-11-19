import { takeLatest } from 'redux-saga/effects';
import {
  assignAssessment,
  checkAssessmentName,
  copyAssessment,
  createAssessment,
  deleteAssessment,
  deleteAssessmentFile,
  deleteAssessmentFiles,
  getAccuracyTips,
  getAssessment,
  getAssessmentFiles,
  getAssessmentForStudent,
  getAssessmentName,
  getAssessments,
  getAssessmentSettings,
  getOnlineAssessmentDetails,
  saveStudentAnswers,
  startOnlineAssessment,
  submitOnlineAssessment,
  unassignAssessment,
  updateAssessment,
  updateAssessmentNeedGrading,
  updateAssessmentStatus,
} from './assessment';
import { answerSheetZip, generateAnswerSheet, getAnswerSheetResult, previewAnswerSheet } from './generation';
import { answerSheetItemScan, answerSheetScan, deleteAnswerSheetScan, deleteScanSession } from './scanning';
import {
  deleteResults,
  getAnalysis,
  getAnswersResults,
  getAssessmentResults,
  getAssessmentStudentResults,
  getAveragesResults,
  sendAssessmentResults,
  updateAnswerNeedGrading,
  updateResultItemNeedGrading,
  updateResultNeedGrading,
  updateResultStudentInfo,
  updateStudentMark,
  updateResultsStatuses,
  downloadResults,
  getFullScansForPreview,
  getDownloadFullScans,
} from './results';
import {
  ANSWER_SHEET_ITEM_SCAN_REQUEST,
  ANSWER_SHEET_SCAN_REQUEST,
  ANSWER_SHEET_ZIP_REQUEST,
  ASSIGN_ASSESSMENT_REQUEST,
  CHECK_ASSESSMENT_NAME_REQUEST,
  COPY_ASSESSMENT_REQUEST,
  CREATE_ASSESSMENT_REQUEST,
  DELETE_ANSWER_SHEET_SCAN_REQUEST,
  DELETE_ASSESSMENT_FILE_REQUEST,
  DELETE_ASSESSMENT_FILES_REQUEST,
  DELETE_ASSESSMENT_REQUEST,
  DELETE_RESULTS_REQUEST,
  DELETE_SCAN_SESSION_REQUEST,
  GENERATE_ANSWER_SHEET_REQUEST,
  GET_ACCURACY_TIPS_REQUEST,
  GET_ANALYSIS_REQUEST,
  GET_ANSWER_SHEET_RESULT_REQUEST,
  GET_ANSWERS_REQUEST,
  GET_ASSESSMENT_FILES_REQUEST,
  GET_ASSESSMENT_FOR_STUDENT_REQUEST,
  GET_ASSESSMENT_NAME_REQUEST,
  GET_ASSESSMENT_REQUEST,
  GET_ASSESSMENT_SETTINGS_REQUEST,
  GET_ASSESSMENTS_REQUEST,
  GET_AVERAGES_REQUEST,
  GET_ONLINE_ASSESSMENT_DETAILS_REQUEST,
  GET_RESULTS_REQUEST,
  GET_STUDENT_RESULTS_REQUEST,
  GET_DOWNLOAD_RESULTS_REQUEST,
  GET_FULL_SCANS_FOR_PREVIEW_REQUEST,
  PREVIEW_ANSWER_SHEET_REQUEST,
  SAVE_STUDENT_ANSWERS_REQUEST,
  SEND_RESULTS_REQUEST,
  START_ONLINE_ASSESSMENT_REQUEST,
  SUBMIT_ONLINE_ASSESSMENT_REQUEST,
  UNASSIGN_ASSESSMENT_REQUEST,
  UPDATE_ANSWER_NEED_GRADING_REQUEST,
  UPDATE_ASSESSMENT_REQUEST,
  UPDATE_ASSESSMENT_NEED_GRADING_REQUEST,
  UPDATE_ASSESSMENT_STATUS_REQUEST,
  UPDATE_RESULT_ITEM_NEED_GRADING_REQUEST,
  UPDATE_RESULT_NEED_GRADING_REQUEST,
  UPDATE_RESULT_STUDENT_INFO_REQUEST,
  UPDATE_STUDENT_MARK_REQUEST,
  UPDATE_RESULTS_STATUSES_REQUEST,
  GET_DOWNLOAD_FULL_SCANS_REQUEST,
} from '../constants';

export default function* assessmentsSaga() {
  yield takeLatest(ANSWER_SHEET_ITEM_SCAN_REQUEST, answerSheetItemScan);
  yield takeLatest(ANSWER_SHEET_SCAN_REQUEST, answerSheetScan);
  yield takeLatest(ANSWER_SHEET_ZIP_REQUEST, answerSheetZip);
  yield takeLatest(ASSIGN_ASSESSMENT_REQUEST, assignAssessment);
  yield takeLatest(CHECK_ASSESSMENT_NAME_REQUEST, checkAssessmentName);
  yield takeLatest(COPY_ASSESSMENT_REQUEST, copyAssessment);
  yield takeLatest(CREATE_ASSESSMENT_REQUEST, createAssessment);
  yield takeLatest(DELETE_ANSWER_SHEET_SCAN_REQUEST, deleteAnswerSheetScan);
  yield takeLatest(DELETE_ASSESSMENT_REQUEST, deleteAssessment);
  yield takeLatest(DELETE_RESULTS_REQUEST, deleteResults);
  yield takeLatest(DELETE_SCAN_SESSION_REQUEST, deleteScanSession);
  yield takeLatest(GENERATE_ANSWER_SHEET_REQUEST, generateAnswerSheet);
  yield takeLatest(GET_ANALYSIS_REQUEST, getAnalysis);
  yield takeLatest(DELETE_ASSESSMENT_FILE_REQUEST, deleteAssessmentFile);
  yield takeLatest(DELETE_ASSESSMENT_FILES_REQUEST, deleteAssessmentFiles);
  yield takeLatest(GET_ACCURACY_TIPS_REQUEST, getAccuracyTips);
  yield takeLatest(GET_ANALYSIS_REQUEST, getAnalysis);
  yield takeLatest(GET_ANSWER_SHEET_RESULT_REQUEST, getAnswerSheetResult);
  yield takeLatest(GET_ANSWERS_REQUEST, getAnswersResults);
  yield takeLatest(GET_ASSESSMENT_FILES_REQUEST, getAssessmentFiles);
  yield takeLatest(GET_ASSESSMENT_FOR_STUDENT_REQUEST, getAssessmentForStudent);
  yield takeLatest(GET_ASSESSMENT_NAME_REQUEST, getAssessmentName);
  yield takeLatest(GET_ASSESSMENT_REQUEST, getAssessment);
  yield takeLatest(GET_ASSESSMENT_SETTINGS_REQUEST, getAssessmentSettings);
  yield takeLatest(GET_ASSESSMENTS_REQUEST, getAssessments);
  yield takeLatest(GET_AVERAGES_REQUEST, getAveragesResults);
  yield takeLatest(GET_ONLINE_ASSESSMENT_DETAILS_REQUEST, getOnlineAssessmentDetails);
  yield takeLatest(GET_RESULTS_REQUEST, getAssessmentResults);
  yield takeLatest(GET_STUDENT_RESULTS_REQUEST, getAssessmentStudentResults);
  yield takeLatest(GET_DOWNLOAD_RESULTS_REQUEST, downloadResults);
  yield takeLatest(GET_FULL_SCANS_FOR_PREVIEW_REQUEST, getFullScansForPreview);
  yield takeLatest(GET_DOWNLOAD_FULL_SCANS_REQUEST, getDownloadFullScans);
  yield takeLatest(PREVIEW_ANSWER_SHEET_REQUEST, previewAnswerSheet);
  yield takeLatest(SAVE_STUDENT_ANSWERS_REQUEST, saveStudentAnswers);
  yield takeLatest(SEND_RESULTS_REQUEST, sendAssessmentResults);
  yield takeLatest(START_ONLINE_ASSESSMENT_REQUEST, startOnlineAssessment);
  yield takeLatest(SUBMIT_ONLINE_ASSESSMENT_REQUEST, submitOnlineAssessment);
  yield takeLatest(UNASSIGN_ASSESSMENT_REQUEST, unassignAssessment);
  yield takeLatest(UPDATE_ANSWER_NEED_GRADING_REQUEST, updateAnswerNeedGrading);
  yield takeLatest(UPDATE_ASSESSMENT_REQUEST, updateAssessment);
  yield takeLatest(UPDATE_ASSESSMENT_NEED_GRADING_REQUEST, updateAssessmentNeedGrading);
  yield takeLatest(UPDATE_ASSESSMENT_STATUS_REQUEST, updateAssessmentStatus);
  yield takeLatest(UPDATE_RESULT_ITEM_NEED_GRADING_REQUEST, updateResultItemNeedGrading);
  yield takeLatest(UPDATE_RESULT_NEED_GRADING_REQUEST, updateResultNeedGrading);
  yield takeLatest(UPDATE_RESULT_STUDENT_INFO_REQUEST, updateResultStudentInfo);
  yield takeLatest(UPDATE_STUDENT_MARK_REQUEST, updateStudentMark);
  yield takeLatest(UPDATE_RESULTS_STATUSES_REQUEST, updateResultsStatuses);
}
