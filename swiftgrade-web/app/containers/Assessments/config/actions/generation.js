import {
  ANSWER_SHEET_ZIP_REQUEST,
  GENERATE_ANSWER_SHEET_REQUEST,
  GET_ANSWER_SHEET_RESULT_REQUEST,
  PREVIEW_ANSWER_SHEET_REQUEST,
  SET_ANSWER_SHEET_PREVIEW,
  SET_ANSWER_SHEET_RESULT,
} from '../constants';

export const answerSheetZipRequest = data => ({
  type: ANSWER_SHEET_ZIP_REQUEST,
  data,
});

export const generateAnswerSheetRequest = data => ({
  type: GENERATE_ANSWER_SHEET_REQUEST,
  data,
});

export const getAnswerSheetResultRequest = data => ({
  type: GET_ANSWER_SHEET_RESULT_REQUEST,
  data,
});

export const previewAnswerSheetRequest = data => ({
  type: PREVIEW_ANSWER_SHEET_REQUEST,
  data,
});

export const setAnswerSheetPreview = data => ({
  type: SET_ANSWER_SHEET_PREVIEW,
  data,
});

export const setAnswerSheetResult = data => ({
  type: SET_ANSWER_SHEET_RESULT,
  data,
});
