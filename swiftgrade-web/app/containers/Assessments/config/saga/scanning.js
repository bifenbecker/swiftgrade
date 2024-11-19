/* eslint-disable no-empty */
import history from 'utils/history';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  answerSheetItemScanApi,
  answerSheetScanApi,
  deleteAnswerSheetScanApi,
  deleteScanSessionApi,
} from 'api/requests';
import { answerSheetItemScanSuccess, setAnswerSheetScanLoading } from '../actions';
import {
  ANSWER_SHEET_ITEM_SCAN_REQUEST,
  ANSWER_SHEET_SCAN_REQUEST,
  DELETE_ANSWER_SHEET_SCAN_REQUEST,
  DELETE_SCAN_SESSION_REQUEST,
} from '../constants';

export function* answerSheetItemScan(action) {
  const { assessmentId, data, handleErrors, handleSuccess } = action.data;
  try {
    const response = yield call(answerSheetItemScanApi, assessmentId, data);
    yield put(answerSheetItemScanSuccess(response.data));
    yield put(setAnswerSheetScanLoading(false));
    yield call(handleSuccess, response.data);
  } catch (errors) {
    if (errors.status === 400) {
      yield put(setAnswerSheetScanLoading(false));
      yield call(handleErrors, errors.data.errors);
    }
  }
}

export function* answerSheetScan(action) {
  const { assessmentId, groupId, data } = action.data;
  try {
    yield call(answerSheetScanApi, assessmentId, data);
    yield history.push(`/groups/${groupId}/assessments/`);
  } catch {}
}

export function* deleteAnswerSheetScan(action) {
  const { scanId, handleSuccess } = action.data;
  try {
    yield call(deleteAnswerSheetScanApi, scanId);
    yield call(handleSuccess);
    yield put(answerSheetItemScanSuccess(null));
    yield put(setAnswerSheetScanLoading(false));
  } catch {}
}

export function* deleteScanSession(action) {
  try {
    yield call(deleteScanSessionApi, action.data);
  } catch {}
}

export default function* assessmentsSaga() {
  yield takeLatest(ANSWER_SHEET_ITEM_SCAN_REQUEST, answerSheetItemScan);
  yield takeLatest(ANSWER_SHEET_SCAN_REQUEST, answerSheetScan);
  yield takeLatest(DELETE_ANSWER_SHEET_SCAN_REQUEST, deleteAnswerSheetScan);
  yield takeLatest(DELETE_SCAN_SESSION_REQUEST, deleteScanSession);
}
