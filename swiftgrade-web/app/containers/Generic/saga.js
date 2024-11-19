/* eslint-disable no-empty */
import _ from 'lodash';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import {
  createGenericPreviewApi,
  generateGenericPreviewApi,
  getAnswerSheetArchiveApi,
  getAnswerSheetStatusApi,
  updateAnswerSheetArchiveApi,
} from 'api/requests';
import { createGenericPreviewSuccess, createDownloadGenericSuccess } from './actions';

import {
  CREATE_DOWNLOAD_GENERIC_REQUEST,
  CREATE_GENERIC_PREVIEW_REQUEST,
  CHECK_GENERIC_GENERATION_REQUEST,
  GET_ANSWER_SHEET_ARCHIVE_REQUEST,
  UPDATE_ANSWER_SHEET_ARCHIVE_REQUEST,
} from './constants';

export function* createGenericPreview(action) {
  yield delay(500);
  const { genericPreviewData, handleSuccess, handleError } = action.data;
  try {
    const response = yield call(createGenericPreviewApi, genericPreviewData);
    yield put(createGenericPreviewSuccess(response.data));
    yield call(handleSuccess);
  } catch (error) {
    if (handleError) {
      yield call(handleError, error);
    }
  }
}

export function* generateGenericPreview(action) {
  const { genericPreviewData, handleSuccess } = action.data;
  try {
    const response = yield call(generateGenericPreviewApi, genericPreviewData);
    if (!_.has(response.data, 'document_url')) {
      yield put(createDownloadGenericSuccess(response.data));
    }
    yield call(handleSuccess, response.data);
  } catch (error) {}
}

export function* checkAnswerSheetStatus(action) {
  const { data, handleSuccess } = action.data;
  try {
    const response = yield call(getAnswerSheetStatusApi, data);
    if (_.has(response.data, 'document_url') && handleSuccess) {
      yield call(handleSuccess, response.data.document_url);
    }
  } catch (error) {}
}

export function* getAnswerSheetArchive(action) {
  const { handleSuccess } = action.data;
  try {
    const response = yield call(getAnswerSheetArchiveApi);
    if (response.data) {
      yield call(handleSuccess, response.data);
    }
  } catch (error) {}
}

export function* updateAnswerSheetArchive(action) {
  const { data } = action.data;
  try {
    yield call(updateAnswerSheetArchiveApi, data);
  } catch (error) {}
}

export default function* createGenericPreviewSaga() {
  yield takeLatest(CREATE_GENERIC_PREVIEW_REQUEST, createGenericPreview);
  yield takeLatest(CREATE_DOWNLOAD_GENERIC_REQUEST, generateGenericPreview);
  yield takeLatest(CHECK_GENERIC_GENERATION_REQUEST, checkAnswerSheetStatus);
  yield takeLatest(GET_ANSWER_SHEET_ARCHIVE_REQUEST, getAnswerSheetArchive);
  yield takeLatest(UPDATE_ANSWER_SHEET_ARCHIVE_REQUEST, updateAnswerSheetArchive);
}
