import {
  DELETE_RESULTS_REQUEST,
  GET_ANALYSIS_REQUEST,
  GET_ANALYSIS_SUCCESS,
  GET_ANSWERS_REQUEST,
  GET_ANSWERS_SUCCESS,
  GET_AVERAGES_REQUEST,
  GET_AVERAGES_SUCCESS,
  GET_RESULTS_REQUEST,
  GET_RESULTS_SUCCESS,
  GET_STUDENT_RESULTS_REQUEST,
  GET_STUDENT_RESULTS_SUCCESS,
  GET_DOWNLOAD_RESULTS_REQUEST,
  GET_DOWNLOAD_RESULTS_SUCCESS,
  GET_FULL_SCANS_FOR_PREVIEW_REQUEST,
  GET_FULL_SCANS_FOR_PREVIEW_SUCCESS,
  SEND_RESULTS_REQUEST,
  SEND_RESULTS_SUCCESS,
  SET_ACTIVE_ANSWER,
  SET_ACTIVE_RESUTLS_DATA,
  SET_FILTERS,
  SET_RESULTS_ACTIVE_HELP_VIDEO,
  UPDATE_ANSWER_NEED_GRADING_REQUEST,
  UPDATE_RESULT_ITEM_NEED_GRADING_REQUEST,
  UPDATE_RESULT_NEED_GRADING_REQUEST,
  UPDATE_RESULT_STUDENT_INFO_REQUEST,
  UPDATE_STUDENT_MARK_REQUEST,
  UPDATE_STUDENT_MARK_SUCCESS,
  UPDATE_RESULTS_STATUSES_REQUEST,
  GET_DOWNLOAD_FULL_SCANS_REQUEST,
} from '../constants';

export const deleteResultsRequest = data => ({
  type: DELETE_RESULTS_REQUEST,
  data,
});

export const getAveragesRequest = data => ({
  type: GET_AVERAGES_REQUEST,
  data,
});

export const getAveragesSuccess = data => ({
  type: GET_AVERAGES_SUCCESS,
  data,
});

export const getResultsRequest = data => ({
  type: GET_RESULTS_REQUEST,
  data,
});

export const getResultsSuccess = data => ({
  type: GET_RESULTS_SUCCESS,
  data,
});

export const getStudentResultsRequest = data => ({
  type: GET_STUDENT_RESULTS_REQUEST,
  data,
});

export const getStudentResultsSuccess = data => ({
  type: GET_STUDENT_RESULTS_SUCCESS,
  data,
});

export const getDownloadResultsRequest = data => ({
  type: GET_DOWNLOAD_RESULTS_REQUEST,
  data,
});

export const getDownloadResultsSuccess = data => ({
  type: GET_DOWNLOAD_RESULTS_SUCCESS,
  data,
});

export const getFullScansForPreviewRequest = data => ({
  type: GET_FULL_SCANS_FOR_PREVIEW_REQUEST,
  data,
});

export const getFullScansForPreviewSuccess = data => ({
  type: GET_FULL_SCANS_FOR_PREVIEW_SUCCESS,
  data,
});

export const getDownloadFullScansRequest = data => ({
  type: GET_DOWNLOAD_FULL_SCANS_REQUEST,
  data,
});

export const getAnswersRequest = data => ({
  type: GET_ANSWERS_REQUEST,
  data,
});

export const getAnswersSuccess = data => ({
  type: GET_ANSWERS_SUCCESS,
  data,
});

export const getAnalysisRequest = data => ({
  type: GET_ANALYSIS_REQUEST,
  data,
});

export const getAnalysisSuccess = data => ({
  type: GET_ANALYSIS_SUCCESS,
  data,
});

export const sendResultsRequest = data => ({
  type: SEND_RESULTS_REQUEST,
  data,
});

export const sentResultsSuccess = data => ({
  type: SEND_RESULTS_SUCCESS,
  data,
});

export const setActiveAnswer = data => ({
  type: SET_ACTIVE_ANSWER,
  data,
});

export const setActiveResultsData = data => ({
  type: SET_ACTIVE_RESUTLS_DATA,
  data,
});

export const setFilters = data => ({
  type: SET_FILTERS,
  data,
});

export const setResultsActiveHelpVideo = data => ({
  type: SET_RESULTS_ACTIVE_HELP_VIDEO,
  data,
});

export const updateAnswerNeedGradingRequest = data => ({
  type: UPDATE_ANSWER_NEED_GRADING_REQUEST,
  data,
});

export const updateResultItemNeedGradingRequest = data => ({
  type: UPDATE_RESULT_ITEM_NEED_GRADING_REQUEST,
  data,
});

export const updateResultNeedGradingRequest = data => ({
  type: UPDATE_RESULT_NEED_GRADING_REQUEST,
  data,
});

export const updateResultStudentInfoRequest = data => ({
  type: UPDATE_RESULT_STUDENT_INFO_REQUEST,
  data,
});

export const updateStudentMarkRequest = data => ({
  type: UPDATE_STUDENT_MARK_REQUEST,
  data,
});

export const updateStudentMarkSuccess = data => ({
  type: UPDATE_STUDENT_MARK_SUCCESS,
  data,
});

export const updateResultsStatusesRequest = data => ({
  type: UPDATE_RESULTS_STATUSES_REQUEST,
  data,
});
