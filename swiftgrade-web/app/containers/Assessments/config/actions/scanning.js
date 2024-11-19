import {
  ANSWER_SHEET_ITEM_SCAN_REQUEST,
  ANSWER_SHEET_ITEM_SCAN_SUCCESS,
  ANSWER_SHEET_SCAN_REQUEST,
  DELETE_ANSWER_SHEET_SCAN_REQUEST,
  DELETE_SCAN_SESSION_REQUEST,
  SET_ANSWER_SHEET_SCAN_LOADING,
} from '../constants';

export const answerSheetItemScanRequest = data => ({
  type: ANSWER_SHEET_ITEM_SCAN_REQUEST,
  data,
});

export const answerSheetItemScanSuccess = data => ({
  type: ANSWER_SHEET_ITEM_SCAN_SUCCESS,
  data,
});

export const answerSheetScanRequest = data => ({
  type: ANSWER_SHEET_SCAN_REQUEST,
  data,
});

export const deleteAnswerSheetScanRequest = data => ({
  type: DELETE_ANSWER_SHEET_SCAN_REQUEST,
  data,
});

export const deleteScanSessionRequest = data => ({
  type: DELETE_SCAN_SESSION_REQUEST,
  data,
});

export const setAnswerSheetScanLoading = data => ({
  type: SET_ANSWER_SHEET_SCAN_LOADING,
  data,
});
