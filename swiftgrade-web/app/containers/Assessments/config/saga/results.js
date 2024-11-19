/* eslint-disable no-empty */
import _ from 'lodash';
import history from 'utils/history';
import { call, delay, put, select } from 'redux-saga/effects';
import {
  deleteResultApi,
  getAnalysisApi,
  getAnswersApi,
  getAssessmentResultsApi,
  getAssessmentStudentResultsApi,
  getAveragesApi,
  sendAssessmentResultsApi,
  updateAnswerNeedGradingApi,
  updateResultItemNeedGradingApi,
  updateResultNeedGradingApi,
  updateResultStudentInfoApi,
  updateStudentMarkApi,
  updateResultsStatusesApi,
  downloadResultsApi,
  getFullScansForPreviewApi,
  getDownloadFullScansApi,
} from 'api/requests';
import {
  getAnalysisSuccess,
  getAnswersSuccess,
  getAveragesSuccess,
  getResultsSuccess,
  getStudentResultsSuccess,
  setAssessments,
  getDownloadResultsSuccess,
  getFullScansForPreviewSuccess,
} from '../actions';
import { makeSelectActiveResultsData, makeSelectAssessments, makeSelectResults } from '../selectors';

export function* getFullScansForPreview(action) {
  try {
    const { assessmentId, resultId } = action.data;
    const response = yield call(getFullScansForPreviewApi, assessmentId, resultId);
    yield put(getFullScansForPreviewSuccess(response.data));
  } catch {}
}

export function* getDownloadFullScans(action) {
  try {
    const { assessmentId, resultId, data, handleSuccess } = action.data;
    const response = yield call(getDownloadFullScansApi, assessmentId, resultId, data);
    yield call(handleSuccess, response.data);
  } catch {}
}

export function* downloadResults(action) {
  try {
    const { assessmentId, ordering } = action.data;
    const response = yield call(downloadResultsApi, assessmentId, ordering);
    yield put(getDownloadResultsSuccess(response.data));
  } catch {}
}

export function* deleteResults(action) {
  const { assessment, data, filters, ordering, handleSuccess } = action.data;
  try {
    const response = yield call(deleteResultApi, assessment.id, data);
    if (response.data.is_results_exists) {
      yield call(getAssessmentResults, { data: { assessmentId: assessment.id, filters, ordering } });
    } else {
      yield history.push(`/groups/${assessment.group.id}/assessments/`);
    }
    yield call(handleSuccess);
  } catch {}
}

export function* getAssessmentResults(action) {
  try {
    yield delay(500);
    const { assessmentId, filters, ordering } = action.data;
    const response = yield call(getAssessmentResultsApi, assessmentId, filters, ordering);

    yield put(getResultsSuccess(response.data));

    if (_.has(action.data, 'handleSuccess') && _.isFunction(action.data.handleSuccess)) {
      yield call(action.data.handleSuccess, response);
    }
  } catch {}
}

export function* getAssessmentStudentResults(action) {
  try {
    const { assessmentId, completedAssessmentId } = action.data;
    const response = yield call(getAssessmentStudentResultsApi, assessmentId, completedAssessmentId);
    yield put(getStudentResultsSuccess(response.data));
  } catch {}
}

export function* sendAssessmentResults(action) {
  try {
    const { assessmentId, data, handleSuccess } = action.data;
    yield call(sendAssessmentResultsApi, assessmentId, data);
    yield call(handleSuccess);
  } catch {}
}

export function* updateStudentMark(action) {
  const { assessment, data, filters, markId, ordering, tabKey, handleSuccess } = action.data;

  try {
    const response = yield call(updateStudentMarkApi, assessment.id, markId, data);
    yield call(handleSuccess, response.data);

    if (tabKey === 'results') {
      yield call(getAssessmentResults, { data: { assessmentId: assessment.id, filters, ordering } });
    } else {
      yield delay(500);
      const activeResultsData = yield select(makeSelectActiveResultsData());
      const number =
        activeResultsData && activeResultsData.answers && activeResultsData.answers.number
          ? activeResultsData.answers.number
          : 1;
      yield call(getAnswersResults, { data: { assessmentId: assessment.id, number, filters, ordering } });
    }
  } catch {}
}

export function* getAveragesResults(action) {
  const { assessmentId } = action.data;
  try {
    const response = yield call(getAveragesApi, assessmentId);
    yield put(getAveragesSuccess(response.data));
  } catch {}
}

export function* getAnalysis(action) {
  const { assessmentId, orderBy } = action.data;
  try {
    const response = yield call(getAnalysisApi, assessmentId, { ordering: orderBy });
    yield put(getAnalysisSuccess(response.data));
  } catch {}
}

export function* getAnswersResults(action) {
  const { assessmentId, number, filters, ordering } = action.data;
  try {
    const response = yield call(getAnswersApi, assessmentId, number, filters, ordering);
    yield put(getAnswersSuccess(response.data));
  } catch {}
}

export function* updateAnswerNeedGrading(action) {
  try {
    const { assessmentId, data } = action.data;
    const response = yield call(updateAnswerNeedGradingApi, assessmentId, data);
    yield put(getAnswersSuccess(response.data));
  } catch {}
}

export function* updateResultItemNeedGrading(action) {
  try {
    const { assessment, data, filters, ordering, tabKey } = action.data;

    yield call(updateResultItemNeedGradingApi, assessment.id, data);
    if (tabKey === 'results') {
      yield call(getAssessmentResults, { data: { assessmentId: assessment.id, filters, ordering } });
    } else {
      const activeResultsData = yield select(makeSelectActiveResultsData());
      const number =
        activeResultsData && activeResultsData.answers && activeResultsData.answers.number
          ? activeResultsData.answers.number
          : 1;
      yield call(getAnswersResults, { data: { assessmentId: assessment.id, number, filters, ordering } });
    }
  } catch {}
}

export function* updateResultNeedGrading(action) {
  try {
    const { assessment, filters, ordering, resultId } = action.data;
    yield call(updateResultNeedGradingApi, assessment.id, resultId);
    yield call(getAssessmentResults, { data: { assessmentId: assessment.id, filters, ordering } });
  } catch {}
}

export function* updateResultStudentInfo(action) {
  try {
    const { assessmentId, data, resultId, handleSuccess } = action.data;
    const response = yield call(updateResultStudentInfoApi, assessmentId, resultId, data);

    const results = _.cloneDeep(yield select(makeSelectResults()));
    const resultIndex = results.data.findIndex(result => result.id === response.data.id);
    const updatedResult = results.data[resultIndex];
    ['first_name', 'last_name', 'username'].forEach(key => {
      updatedResult[key] = response.data[key];
    });
    updatedResult.email = response.data.username;
    results.data[resultIndex] = updatedResult;
    yield put(getResultsSuccess(results));
    yield call(handleSuccess);
  } catch (errors) {
    if (errors.status === 400) {
      const { handleErrors } = action.data;
      yield call(handleErrors, errors.data);
    }
  }
}

export function* updateResultsStatuses(action) {
  try {
    const { assessmentId, data } = action.data;
    const response = yield call(updateResultsStatusesApi, assessmentId, data);
    if (response.status === 204) {
      const assessments = _.cloneDeep(yield select(makeSelectAssessments()));
      const index = assessments.findIndex(a => a.id === assessmentId);
      if (index >= 0) {
        const assessment = assessments[index];
        assessment.average.count_incorrect_results = 0;
        assessment.average.incorrect_scans = null;
        assessments[index] = assessment;
        yield put(setAssessments(_.cloneDeep(assessments)));
      }
    }
  } catch {}
}
