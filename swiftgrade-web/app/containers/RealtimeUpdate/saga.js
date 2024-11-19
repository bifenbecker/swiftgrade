/* eslint-disable no-empty */
import { call, put, takeLatest } from 'redux-saga/effects';
import { getAssessmentsApi, getAssignedAssessmentsApi } from 'api/requests';
import { setAssessments } from 'containers/Assessments/config/actions';
import _ from 'lodash';
import { UPDATE_ASSESSMENTS_REQUEST } from './constants';

const ASSESSMENTS_API = {
  default: getAssessmentsApi,
  assigned: getAssignedAssessmentsApi,
};

export function* updateAssessmentsList(action) {
  const { data, kind } = action.data;
  try {
    const api = _.has(ASSESSMENTS_API, kind) ? ASSESSMENTS_API[kind] : ASSESSMENTS_API.default;
    const response = yield call(api, data);
    yield put(setAssessments(response.data));
  } catch {}
}

export default function* realtimeUpdateSaga() {
  yield takeLatest(UPDATE_ASSESSMENTS_REQUEST, updateAssessmentsList);
}
