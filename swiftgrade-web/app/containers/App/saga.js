/* eslint-disable no-empty */
import { call, put, takeLatest } from 'redux-saga/effects';
import { reset } from 'redux-form/immutable';
import _ from 'lodash';
import {
  getCurrentUserApi,
  getCurrentUserChecklistApi,
  updateUserApi,
  checkAutoSignIn,
  verifyEmailApi,
} from 'api/requests';
import history from 'utils/history';

import { setCurrentUser, setCurrentUserChecklist } from './actions';
import {
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_CHECKLIST_REQUEST,
  LOGOUT_REQUEST,
  RESET_FORM,
  UPDATE_CURRENT_USER_REQUEST,
  CHECK_USER_AUTOLOGIN_REQUEST,
  VERIFY_EMAIL_REQUEST,
} from './constants';

export function* getCurrentUser(action) {
  const { userId, handleSuccess, handleErrors } = action.data;
  try {
    const response = yield call(getCurrentUserApi, userId);
    yield put(setCurrentUser(response.data));
    yield call(handleSuccess, response.data);
  } catch (error) {
    if (error.status === 400) {
      yield call(handleErrors, error.data);
    }
  }
}

export function* getCurrentUserChecklist(action) {
  const { userId, handleSuccess, handleErrors } = action.data;
  try {
    const response = yield call(getCurrentUserChecklistApi, userId);
    yield put(setCurrentUserChecklist(response.data));
    if (_.isFunction(handleSuccess)) {
      yield call(handleSuccess, response.data);
    }
  } catch (error) {
    if (error.status === 400) {
      yield call(handleErrors, error.data);
    }
  }
}

export function* checkUserAutologin(action) {
  const { data } = action;
  yield call(checkAutoSignIn, data);
}

export function* logout() {
  yield localStorage.clear();
  yield history.push('/sign_in');
}

export function* resetForm(action) {
  yield put(reset(action.formName));
}

export function* updateUser(action) {
  const { data, userId, handleSuccess } = action.data;
  try {
    const response = yield call(updateUserApi, userId, data);
    yield put(setCurrentUser(response.data));
    if (_.isFunction(handleSuccess)) {
      yield call(handleSuccess, response.data);
    }
  } catch {}
}

export function* verifyEmail(action) {
  const { data, userId, handleSuccess, handleErrors } = action.data;
  try {
    yield call(verifyEmailApi, userId, data);
    yield call(handleSuccess);
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export default function* appSaga() {
  yield takeLatest(GET_CURRENT_USER_REQUEST, getCurrentUser);
  yield takeLatest(GET_CURRENT_USER_CHECKLIST_REQUEST, getCurrentUserChecklist);
  yield takeLatest(LOGOUT_REQUEST, logout);
  yield takeLatest(RESET_FORM, resetForm);
  yield takeLatest(UPDATE_CURRENT_USER_REQUEST, updateUser);
  yield takeLatest(CHECK_USER_AUTOLOGIN_REQUEST, checkUserAutologin);
  yield takeLatest(VERIFY_EMAIL_REQUEST, verifyEmail);
}
