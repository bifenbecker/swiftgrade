/* eslint-disable no-empty */
import { call, put } from 'redux-saga/effects';
import {
  answerSheetZipApi,
  generateAnswerSheetApi,
  getAnswerSheetResultApi,
  previewAnswerSheetApi,
} from 'api/requests';
import { setAnswerSheetPreview, setAnswerSheetResult } from '../actions';

export function* answerSheetZip(action) {
  try {
    yield call(answerSheetZipApi, action.data);
  } catch {}
}

export function* generateAnswerSheet(action) {
  const { groupId, assessmentId, data, handleSuccess } = action.data;
  try {
    yield call(generateAnswerSheetApi, groupId, assessmentId, data);
    yield call(handleSuccess);
  } catch {}
}

export function* getAnswerSheetResult(action) {
  try {
    const { assessmentId, answerSheetId } = action.data;
    const response = yield call(getAnswerSheetResultApi, assessmentId, answerSheetId);
    yield put(setAnswerSheetResult(response.data));
  } catch {}
}

export function* previewAnswerSheet(action) {
  const { groupId, assessmentId, data } = action.data;
  try {
    const response = yield call(previewAnswerSheetApi, groupId, assessmentId, data);
    yield put(setAnswerSheetPreview(response.data));
  } catch {}
}
