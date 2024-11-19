import { get, post, postFormData, patch, del, getBlob } from './utils';
import * as PATHS from './paths';

// [Users]
export const appleSignIn = data => post(`${PATHS.AUTH_PATH}apple_sign_in/`, false, data);
export const checkClassCodeApi = data => post(`${PATHS.AUTH_PATH}check_class_code/`, false, data);
export const checkUserVerificationCodeApi = data => post(`${PATHS.AUTH_PATH}check_verification_code/`, false, data);
export const getCurrentUserApi = userId => get(`${PATHS.USERS_PATH}${userId}/`, true);
export const getCurrentUserChecklistApi = userId => get(`${PATHS.USERS_PATH}${userId}/checklist/`, true);
export const googleSignInApi = data => post(`${PATHS.AUTH_PATH}google_sign_in/`, false, data);
export const sendPasswordRecoveryLinkApi = data => post(`${PATHS.AUTH_PATH}recover/`, false, data);
export const signInApi = data => post(`${PATHS.AUTH_PATH}sign_in/`, false, data);
export const signUpApi = data => post(`${PATHS.AUTH_PATH}sign_up/`, false, data);
export const checkAutoSignIn = data => post(`${PATHS.AUTH_PATH}check_auto_sign_in/`, false, data);
export const studentSignUpApi = data => post(`${PATHS.AUTH_PATH}student_sign_up/`, false, data);
export const verifyEmailApi = (userId, data) => post(`${PATHS.USERS_PATH}${userId}/verify_email/`, true, data);
export const updateUserApi = (userId, data) => patch(`${PATHS.USERS_PATH}${userId}/`, true, data);
export const autoGenerateUsernameApi = quantity => get(`${PATHS.USERS_PATH}generate_username/${quantity}/`, true);

// [Groups]
export const copyGroupApi = (groupId, data) => post(`${PATHS.GROUPS_PATH}${groupId}/copy/`, true, data);
export const createGroupApi = data => post(PATHS.GROUPS_PATH, true, data);
export const createGroupsApi = data => post(`${PATHS.GROUPS_PATH}bulk_create/`, true, data);
export const deleteGroupApi = groupId => del(`${PATHS.GROUPS_PATH}${groupId}/`, true);
export const getGroupApi = groupId => get(`${PATHS.GROUPS_PATH}${groupId}/`, true);
export const getGroupsApi = data => get(PATHS.GROUPS_PATH, true, data, true);
export const joinGroupApi = data => post(`${PATHS.GROUPS_PATH}join/`, true, data);
export const renameGroupApi = (groupId, data) => patch(`${PATHS.GROUPS_PATH}${groupId}/`, true, data);
export const addStudentsApi = data => post(`${PATHS.GROUPS_PATH}add_students/`, true, data);

// [Students]
export const createStudentApi = data => post(PATHS.STUDENTS_PATH, false, data);
export const deleteStudentApi = data => post(`${PATHS.STUDENTS_PATH}delete/`, true, data);
export const getStudentCodeApi = (groupId, data) => post(`${PATHS.GROUPS_PATH}${groupId}/generate_code/`, true, data);
export const getStudentsApi = data => get(PATHS.STUDENTS_PATH, true, data);
export const checkStudentVerificationCodeApi = data =>
  post(`${PATHS.STUDENTS_PATH}check_verification_code/`, false, data);
export const manuallyAddStudentsApi = (groupId, data) =>
  post(`${PATHS.STUDENTS_PATH}manually_add/${groupId}/`, true, data);
export const checkStudentUsernameApi = data => get(`${PATHS.STUDENTS_PATH}check_username/`, true, data);
export const downloadStudentLoginInfoApi = data =>
  post(`${PATHS.STUDENTS_PATH}download_student_login_info/`, true, data, true);

// [Assessments]
export const getAssessmentsApi = data => get('assessments/', true, data);
export const getAccuracyTipsApi = () => get('assessments/accuracy_tips/', true);
export const getAssignedAssessmentsApi = data => get('assessments/assigned/', true, data);
export const getCompletedAssessmentsApi = data => get('assessments/completed/', true, data);
export const getAssessmentApi = (assessmentId, data) => get(`${PATHS.ASSESSMENTS_PATH(assessmentId)}`, true, data);
export const checkAssessmentNameApi = (groupId, data) => post(`assessments/check_name/`, true, data);
export const getAssessmentNameApi = groupId => get(`assessments/name/`, true, { group_id: groupId });
export const createAssessmentApi = data => post(`assessments/`, true, data);
export const updateAssessmentApi = (assessmentId, data) => patch(`${PATHS.ASSESSMENTS_PATH(assessmentId)}`, true, data);
export const generateAnswerSheetApi = (groupId, assessmentId, data) =>
  post(`assessments/${assessmentId}/answer_sheet/generate/`, true, data);
export const previewAnswerSheetApi = (groupId, assessmentId, data) =>
  post(`assessments/${assessmentId}/answer_sheet/preview/`, true, data);
export const getAnswerSheetResultApi = (assessmentId, answerSheetId) =>
  get(`assessments/${assessmentId}/answer_sheets/${answerSheetId}/result/`, true);
export const answerSheetScanApi = (assessmentId, data) =>
  post(`${PATHS.ASSESSMENTS_PATH(assessmentId)}scan/`, true, data);
export const answerSheetItemScanApi = (assessmentId, data) =>
  postFormData(`${PATHS.ASSESSMENTS_PATH(assessmentId)}item_scan/`, true, data);
export const deleteAnswerSheetScanApi = (assessmentId, scanId) =>
  del(`${PATHS.ASSESSMENTS_PATH(assessmentId)}scans/${scanId}/delete/`, true);
export const getAnswerSheetArchiveApi = () => get('answer_sheets/zip/', true);
export const updateAnswerSheetArchiveApi = data => post('answer_sheets/zip/', true, data);
export const answerSheetZipApi = data => post('answer_sheets/zip/', true, data);
export const getAssessmentResultsApi = (assessmentId, filters, ordering) =>
  get(`${PATHS.ASSESSMENTS_PATH(assessmentId)}results/`, true, { filters, ordering });
export const getAssessmentStudentResultsApi = (assessmentId, completedAssessmentId) =>
  get(`${PATHS.ASSESSMENTS_PATH(assessmentId)}student_results/${completedAssessmentId}/`, true);
export const deleteScanSessionApi = (assessmentId, data) =>
  post(`${PATHS.ASSESSMENTS_PATH(assessmentId)}scans/delete_session/`, true, data);
export const updateStatusAssessmentApi = (assessmentId, data) =>
  post(`${PATHS.ASSESSMENTS_PATH(assessmentId)}status/`, true, data);
export const sendAssessmentResultsApi = (assessmentId, data) =>
  post(`${PATHS.ASSESSMENTS_PATH(assessmentId)}results/`, true, data);
export const deleteAssessmentApi = data => post(`assessments/delete/`, true, data);
export const copyAssessmentApi = (assessmentId, data) =>
  post(`${PATHS.ASSESSMENTS_PATH(assessmentId)}copy/`, true, data);
export const updateStudentMarkApi = (assessmentId, markId, data) =>
  patch(`${PATHS.ASSESSMENTS_PATH(assessmentId)}student_marks/${markId}/`, true, data);
export const deleteResultApi = (assessmentId, data) =>
  post(`${PATHS.ASSESSMENTS_PATH(assessmentId)}results/delete/`, true, data);
export const getAveragesApi = assessmentId => get(`${PATHS.ASSESSMENTS_PATH(assessmentId)}averages/`, true);
export const getAnalysisApi = (assessmentId, data) =>
  get(`${PATHS.ASSESSMENTS_PATH(assessmentId)}analysis/`, true, data);
export const getAnswersApi = (assessmentId, number, filters, ordering) =>
  post(`${PATHS.ASSESSMENTS_PATH(assessmentId)}answers/`, true, { number, filters, ordering });
export const assignAssessmentApi = (assessmentId, data) => post(`assessments/${assessmentId}/assign/`, true, data);
export const unassignAssessmentApi = (assessmentId, data) => post(`assessments/${assessmentId}/unassign/`, true, data);
export const submitOnlineAssessmentApi = (assessmentId, completedAssessmentId, data) =>
  post(`assessments/${assessmentId}/submit/${completedAssessmentId}/`, true, data);
export const getAssessmentSettingsApi = (assessmentId, data) => get(`assessments/${assessmentId}/assign/`, true, data);
export const getAssessmentForStudentApi = (assessmentId, data) =>
  get(`assessment_for_student/${assessmentId}/`, true, data);
export const saveStudentAnswersApi = (assessmentId, completedAssessmentId, data) =>
  post(`assessments/${assessmentId}/save_student_answers/${completedAssessmentId}/`, true, data);
export const startOnlineAssessmentApi = (assessmentId, data) => post(`assessments/${assessmentId}/start/`, true, data);
export const getOnlineAssessmentDetailsApi = (assessmentId, data) =>
  post(`assessment_for_student/${assessmentId}/process_assessment/`, true, data);
export const deleteAssessmentFileApi = (assessmentId, fileId) =>
  del(`${PATHS.ASSESSMENTS_PATH(assessmentId)}files/${fileId}/`, true);
export const deleteAssessmentFilesApi = (assessmentId, data) =>
  post(`${PATHS.ASSESSMENTS_PATH(assessmentId)}files/delete/`, true, data);
export const getAssessmentFilesApi = (assessmentId, data) =>
  get(`${PATHS.ASSESSMENTS_PATH(assessmentId)}files/`, true, data);
export const updateResultItemNeedGradingApi = (assessmentId, data) =>
  post(`${PATHS.ASSESSMENTS_PATH(assessmentId)}results/need_grading/`, true, data);
export const updateResultStudentInfoApi = (assessmentId, resultId, data) =>
  patch(`${PATHS.ASSESSMENTS_PATH(assessmentId)}results/${resultId}/`, true, data);
export const updateAssessmentNeedGradingApi = assessmentId =>
  post(`${PATHS.ASSESSMENTS_PATH(assessmentId)}need_grading/`, true);
export const updateResultNeedGradingApi = (assessmentId, resultId) =>
  post(`${PATHS.ASSESSMENTS_PATH(assessmentId)}results/${resultId}/need_grading/`, true);
export const updateAnswerNeedGradingApi = (assessmentId, data) =>
  post(`${PATHS.ASSESSMENTS_PATH(assessmentId)}answers/need_grading/`, true, data);
export const updateResultsStatusesApi = (assessmentId, data) =>
  post(`${PATHS.ASSESSMENTS_PATH(assessmentId)}results/statuses/`, true, data);
export const downloadResultsApi = (assessmentId, ordering) =>
  getBlob(`${PATHS.ASSESSMENTS_PATH(assessmentId)}results/download/`, true, { ordering });
export const getFullScansForPreviewApi = (assessmentId, resultId) =>
  get(`${PATHS.ASSESSMENTS_PATH(assessmentId)}results/${resultId}/full_scans/`, true);
export const getDownloadFullScansApi = (assessmentId, resultId, data) =>
  get(`${PATHS.ASSESSMENTS_PATH(assessmentId)}results/${resultId}/download_full_scans/`, true, data);

// [Generic preview]
export const createGenericPreviewApi = data => post(PATHS.PREVIEW_GENERIC_ANSWERS_PATH, true, data);
export const generateGenericPreviewApi = data => post(PATHS.GENERATE_GENERIC_ANSWERS_PATH, true, data);
export const getAnswerSheetStatusApi = data => post(PATHS.CHECK_ANSWER_SHEET_STATUS, true, data);
