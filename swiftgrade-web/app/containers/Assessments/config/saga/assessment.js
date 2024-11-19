/* eslint-disable no-empty */
import _ from 'lodash';
import history from 'utils/history';
import { call, delay, put, select } from 'redux-saga/effects';
import {
  assignAssessmentApi,
  checkAssessmentNameApi,
  copyAssessmentApi,
  createAssessmentApi,
  deleteAssessmentApi,
  deleteAssessmentFileApi,
  deleteAssessmentFilesApi,
  getAccuracyTipsApi,
  getAssessmentApi,
  getAssessmentFilesApi,
  getAssessmentForStudentApi,
  getAssessmentNameApi,
  getAssessmentsApi,
  getAssessmentSettingsApi,
  getAssignedAssessmentsApi,
  getCompletedAssessmentsApi,
  getOnlineAssessmentDetailsApi,
  saveStudentAnswersApi,
  startOnlineAssessmentApi,
  submitOnlineAssessmentApi,
  unassignAssessmentApi,
  updateAssessmentApi,
  updateAssessmentNeedGradingApi,
  updateStatusAssessmentApi,
} from 'api/requests';
import {
  getAssessmentFilesSuccess,
  getAssessmentNameSuccess,
  getAssessmentSettingsSuccess,
  setAssessment,
  setAssessmentPassword,
  setAssessments,
  submitOnlineAssessmentSuccess,
  unassignAssessmentSuccess,
  updateAssessmentSuccess,
} from '../actions';
import { makeSelectAssessments } from '../selectors';

const ASSESSMENTS_API = {
  default: getAssessmentsApi,
  assigned: getAssignedAssessmentsApi,
  completed: getCompletedAssessmentsApi,
};

export function* assignAssessment(action) {
  const { assessmentId, data, handleSuccess } = action.data;
  try {
    yield call(assignAssessmentApi, assessmentId, data);
    yield call(handleSuccess);
  } catch (errors) {
    const { handleErrors } = action.data;
    yield call(handleErrors, errors.data);
  }
}

export function* checkAssessmentName(action) {
  const { groupId, data, handleSuccess, handleErrors } = action.data;
  try {
    yield call(checkAssessmentNameApi, groupId, data);
    yield call(handleSuccess);
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* copyAssessment(action) {
  const { assessmentId, data, handleErrors, handleSuccess, orderBy } = action.data;
  try {
    const response = yield call(copyAssessmentApi, assessmentId, data);
    yield call(getAssessments, {
      data: { data: { group_id: response.data.group_id, ordering: orderBy }, kind: 'default' },
    });
    yield call(handleSuccess);
    yield history.push(`/groups/${response.data.group_id}/assessments/`);
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* createAssessment(action) {
  const { data, handleErrors, handleSuccess } = action.data;
  try {
    const response = yield call(createAssessmentApi, data);
    yield call(handleSuccess, response.data);
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* deleteAssessment(action) {
  const { data, handleErrors, handleSuccess } = action.data;
  try {
    const response = yield call(deleteAssessmentApi, data);
    if (response.status === 204) {
      const assessments = yield select(makeSelectAssessments());
      const updatedAssessments = assessments.filter(assessment => !data.assessments_ids.includes(assessment.id));
      yield put(setAssessments(updatedAssessments));
      yield call(handleSuccess);
    }
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* deleteAssessmentFile(action) {
  try {
    const { assessmentId, fileId, handleSuccess } = action.data;
    yield call(deleteAssessmentFileApi, assessmentId, fileId);
    yield call(handleSuccess);
  } catch {}
}

export function* deleteAssessmentFiles(action) {
  try {
    const { assessmentId, data, handleSuccess } = action.data;
    yield call(deleteAssessmentFilesApi, assessmentId, data);
    yield call(handleSuccess);
  } catch {}
}

export function* getAccuracyTips(action) {
  const { handleSuccess, handleErrors } = action.data;
  try {
    const response = yield call(getAccuracyTipsApi);
    yield call(handleSuccess, response.data);
  } catch (error) {
    yield call(handleErrors, error.data);
  }
}

export function* getAssessment(action) {
  try {
    const { assessmentId, data, handleSuccess } = action.data;
    const response = yield call(getAssessmentApi, assessmentId, data);
    yield put(setAssessment(response.data));
    yield call(handleSuccess, response.data);
  } catch {}
}

export function* getAssessmentFiles(action) {
  try {
    const { assessmentId, data } = action.data;
    const response = yield call(getAssessmentFilesApi, assessmentId, data);
    yield put(getAssessmentFilesSuccess(response.data));
  } catch {}
}

export function* getAssessmentForStudent(action) {
  const { assessmentId, data } = action.data;
  try {
    const response = yield call(getAssessmentForStudentApi, assessmentId, data);
    if (_.has(action.data, 'handleSuccess')) {
      action.data.handleSuccess(response.data);
    }
    yield put(setAssessment(response.data));
  } catch {}
}

export function* getAssessmentName(action) {
  const { groupId } = action.data;
  try {
    const response = yield call(getAssessmentNameApi, groupId);
    yield put(getAssessmentNameSuccess(response.data));
  } catch {}
}

export function* getAssessmentSettings(action) {
  const { assessmentId, data } = action.data;
  try {
    const response = yield call(getAssessmentSettingsApi, assessmentId, data);
    yield put(getAssessmentSettingsSuccess(response.data));
  } catch {}
}

export function* getAssessments(action) {
  try {
    const { data, kind } = action.data;
    const api = _.has(ASSESSMENTS_API, kind) ? ASSESSMENTS_API[kind] : ASSESSMENTS_API.default;
    const response = yield call(api, data);
    yield put(setAssessments(response.data));
  } catch {}
}

export function* getOnlineAssessmentDetails(action) {
  try {
    const { assessmentId, data } = action.data;
    const response = yield call(getOnlineAssessmentDetailsApi, assessmentId, data);
    yield put(setAssessment(response.data));
  } catch (e) {}
}

export function* saveStudentAnswers(action) {
  try {
    yield delay(2000);
    const { assessmentId, completedAssessmentId, data } = action.data;
    yield call(saveStudentAnswersApi, assessmentId, completedAssessmentId, data);
  } catch (e) {}
}

export function* startOnlineAssessment(action) {
  const { assessmentId, data, handleSuccess } = action.data;
  try {
    yield call(startOnlineAssessmentApi, assessmentId, data);
    const password = data && _.has(data, 'password') ? data.password : null;
    yield put(setAssessmentPassword(password));
    yield call(handleSuccess);
  } catch (errors) {
    if (errors.status === 400) {
      const { handleErrors } = action.data;
      yield call(handleErrors, errors.data);
    }
  }
}

export function* submitOnlineAssessment(action) {
  const { assessmentId, completedAssessmentId, data, handleSuccess } = action.data;
  try {
    const response = yield call(submitOnlineAssessmentApi, assessmentId, completedAssessmentId, data);
    yield put(submitOnlineAssessmentSuccess(response.data));
    yield call(handleSuccess);
  } catch (errors) {
    if (errors.status === 400) {
      const { handleErrors } = action.data;
      yield call(handleErrors, errors.data);
    }
  }
}

export function* unassignAssessment(action) {
  const { assessmentId, data, handleSuccess } = action.data;
  try {
    const response = yield call(unassignAssessmentApi, assessmentId, data);
    const assessments = yield select(makeSelectAssessments());
    const index = assessments.findIndex(assessment => assessment.id === response.data.id);
    assessments[index] = response.data;
    yield put(unassignAssessmentSuccess(assessments));
    yield call(handleSuccess);
  } catch {}
}

export function* updateAssessment(action) {
  const { assessmentId, data, isEditAssessmentItems } = action.data;
  try {
    const response = yield call(updateAssessmentApi, assessmentId, data);
    if (!isEditAssessmentItems) {
      yield put(updateAssessmentSuccess(response.data));
    }

    if (_.has(action.data, 'handleSuccess')) {
      yield call(action.data.handleSuccess);
    }
  } catch (errors) {
    if (errors.status === 400 && _.has(action.data, 'handleErrors')) {
      yield call(action.data.handleErrors, errors.data);
    }
  }
}

export function* updateAssessmentNeedGrading(action) {
  try {
    const { assessmentId } = action.data;
    const response = yield call(updateAssessmentNeedGradingApi, assessmentId);
    const assessments = _.cloneDeep(yield select(makeSelectAssessments()));
    const index = assessments.findIndex(assessment => assessment.id === response.data.id);
    assessments[index] = response.data;
    yield put(setAssessments(assessments));
  } catch {}
}

export function* updateAssessmentStatus(action) {
  const { assessmentId, data } = action.data;
  try {
    const response = yield call(updateStatusAssessmentApi, assessmentId, data);
    const assessments = _.cloneDeep(yield select(makeSelectAssessments()));
    const index = assessments.findIndex(assessment => assessment.id === response.data.id);
    if (index >= 0) {
      assessments[index].status = response.data.status;
      yield put(setAssessments(assessments));
    }
  } catch {}
}
