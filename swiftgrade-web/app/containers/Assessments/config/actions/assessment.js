import {
  ASSIGN_ASSESSMENT_REQUEST,
  CHECK_ASSESSMENT_NAME_REQUEST,
  COPY_ASSESSMENT_REQUEST,
  CREATE_ASSESSMENT_REQUEST,
  DELETE_ASSESSMENT_REQUEST,
  GET_ACCURACY_TIPS_REQUEST,
  GET_ASSESSMENT_FILES_REQUEST,
  GET_ASSESSMENT_FILES_SUCCESS,
  GET_ASSESSMENT_FOR_STUDENT_REQUEST,
  GET_ASSESSMENT_NAME_REQUEST,
  GET_ASSESSMENT_NAME_SUCCESS,
  GET_ASSESSMENT_REQUEST,
  GET_ASSESSMENT_SETTINGS_REQUEST,
  GET_ASSESSMENT_SETTINGS_SUCCESS,
  GET_ASSESSMENTS_REQUEST,
  GET_ONLINE_ASSESSMENT_DETAILS_REQUEST,
  DELETE_ASSESSMENT_FILE_REQUEST,
  DELETE_ASSESSMENT_FILES_REQUEST,
  SAVE_STUDENT_ANSWERS_REQUEST,
  SET_ASSESSMENT,
  SET_ASSESSMENT_DETAILS,
  SET_ASSESSMENT_PASSWORD,
  SET_ASSESSMENTS,
  SET_CALCULATOR,
  SET_CURRENT_INPUT_TAB_ELEMENT,
  SET_DESMOS_EXPRESSION_ANALYSIS,
  SET_DESMOS,
  SET_PREV_INPUT_TAB_ELEMENT,
  START_ONLINE_ASSESSMENT_REQUEST,
  SUBMIT_ONLINE_ASSESSMENT_REQUEST,
  SUBMIT_ONLINE_ASSESSMENT_SUCCESS,
  UNASSIGN_ASSESSMENT_REQUEST,
  UNASSIGN_ASSESSMENT_SUCCESS,
  UPDATE_ASSESSMENT_REQUEST,
  UPDATE_ASSESSMENT_NEED_GRADING_REQUEST,
  UPDATE_ASSESSMENT_STATUS_REQUEST,
  UPDATE_ASSESSMENT_SUCCESS,
} from '../constants';

export const assignAssessmentRequest = data => ({
  type: ASSIGN_ASSESSMENT_REQUEST,
  data,
});

export const checkAssessmentNameRequest = data => ({
  type: CHECK_ASSESSMENT_NAME_REQUEST,
  data,
});

export const copyAssessmentRequest = data => ({
  type: COPY_ASSESSMENT_REQUEST,
  data,
});

export const createAssessmentRequest = data => ({
  type: CREATE_ASSESSMENT_REQUEST,
  data,
});

export const deleteAssessmentRequest = data => ({
  type: DELETE_ASSESSMENT_REQUEST,
  data,
});

export const getAccuracyTipsRequest = data => ({
  type: GET_ACCURACY_TIPS_REQUEST,
  data,
});

export const getAssessmentFilesRequest = data => ({
  type: GET_ASSESSMENT_FILES_REQUEST,
  data,
});

export const getAssessmentFilesSuccess = data => ({
  type: GET_ASSESSMENT_FILES_SUCCESS,
  data,
});

export const getAssessmentForStudentRequest = data => ({
  type: GET_ASSESSMENT_FOR_STUDENT_REQUEST,
  data,
});

export const getAssessmentNameRequest = data => ({
  type: GET_ASSESSMENT_NAME_REQUEST,
  data,
});

export const getAssessmentNameSuccess = data => ({
  type: GET_ASSESSMENT_NAME_SUCCESS,
  data,
});

export const getAssessmentRequest = data => ({
  type: GET_ASSESSMENT_REQUEST,
  data,
});

export const getAssessmentSettingsRequest = data => ({
  type: GET_ASSESSMENT_SETTINGS_REQUEST,
  data,
});

export const getAssessmentsRequest = data => ({
  type: GET_ASSESSMENTS_REQUEST,
  data,
});

export const setAssessment = data => ({
  type: SET_ASSESSMENT,
  data,
});

export const getAssessmentSettingsSuccess = data => ({
  type: GET_ASSESSMENT_SETTINGS_SUCCESS,
  data,
});

export const getOnlineAssessmentDetailsRequest = data => ({
  type: GET_ONLINE_ASSESSMENT_DETAILS_REQUEST,
  data,
});

export const deleteAssessmentFileRequest = data => ({
  type: DELETE_ASSESSMENT_FILE_REQUEST,
  data,
});

export const deleteAssessmentFilesRequest = data => ({
  type: DELETE_ASSESSMENT_FILES_REQUEST,
  data,
});

export const saveStudentAnswersRequest = data => ({
  type: SAVE_STUDENT_ANSWERS_REQUEST,
  data,
});

export const setAssessments = data => ({
  type: SET_ASSESSMENTS,
  data,
});

export const setCalculator = data => ({
  type: SET_CALCULATOR,
  data,
});

export const setDesmos = data => ({
  type: SET_DESMOS,
  data,
});

export const setDesmosExpressionAnalysis = data => ({
  type: SET_DESMOS_EXPRESSION_ANALYSIS,
  data,
});

export const setAssessmentDetails = data => ({
  type: SET_ASSESSMENT_DETAILS,
  data,
});

export const setAssessmentPassword = data => ({
  type: SET_ASSESSMENT_PASSWORD,
  data,
});

export const setCurrentInputTabElement = elementId => ({
  type: SET_CURRENT_INPUT_TAB_ELEMENT,
  elementId,
});

export const setPrevInputTabElement = elementId => ({
  type: SET_PREV_INPUT_TAB_ELEMENT,
  elementId,
});

export const startOnlineAssessmentRequest = data => ({
  type: START_ONLINE_ASSESSMENT_REQUEST,
  data,
});

export const submitOnlineAssessmentRequest = data => ({
  type: SUBMIT_ONLINE_ASSESSMENT_REQUEST,
  data,
});

export const submitOnlineAssessmentSuccess = data => ({
  type: SUBMIT_ONLINE_ASSESSMENT_SUCCESS,
  data,
});

export const unassignAssessmentRequest = data => ({
  type: UNASSIGN_ASSESSMENT_REQUEST,
  data,
});

export const unassignAssessmentSuccess = data => ({
  type: UNASSIGN_ASSESSMENT_SUCCESS,
  data,
});

export const updateAssessmentRequest = data => ({
  type: UPDATE_ASSESSMENT_REQUEST,
  data,
});

export const updateAssessmentNeedGradingRequest = data => ({
  type: UPDATE_ASSESSMENT_NEED_GRADING_REQUEST,
  data,
});

export const updateAssessmentSuccess = data => ({
  type: UPDATE_ASSESSMENT_SUCCESS,
  data,
});

export const updateAssessmentStatusRequest = data => ({
  type: UPDATE_ASSESSMENT_STATUS_REQUEST,
  data,
});
