import {
  CREATE_GENERIC_PREVIEW_REQUEST,
  CREATE_GENERIC_PREVIEW_SUCCESS,
  CREATE_DOWNLOAD_GENERIC_REQUEST,
  CREATE_DOWNLOAD_GENERIC_SUCCESS,
  CHECK_GENERIC_GENERATION_REQUEST,
  GET_ANSWER_SHEET_ARCHIVE_REQUEST,
  UPDATE_ANSWER_SHEET_ARCHIVE_REQUEST,
} from './constants';

export const createGenericPreviewRequest = data => ({
  type: CREATE_GENERIC_PREVIEW_REQUEST,
  data,
});

export const createGenericPreviewSuccess = data => ({
  type: CREATE_GENERIC_PREVIEW_SUCCESS,
  data,
});

export const createDownloadGenericRequest = data => ({
  type: CREATE_DOWNLOAD_GENERIC_REQUEST,
  data,
});

export const createDownloadGenericSuccess = data => ({
  type: CREATE_DOWNLOAD_GENERIC_SUCCESS,
  data,
});

export const checkGenericGenerationRequest = data => ({
  type: CHECK_GENERIC_GENERATION_REQUEST,
  data,
});

export const getAnswerSheetArchiveRequest = data => ({
  type: GET_ANSWER_SHEET_ARCHIVE_REQUEST,
  data,
});

export const updateAnswerSheetArchiveRequest = data => ({
  type: UPDATE_ANSWER_SHEET_ARCHIVE_REQUEST,
  data,
});
