/* eslint-disable no-empty */
import { call, put } from 'redux-saga/effects';
import { takeLatest } from '@redux-saga/core/effects';
import _ from 'lodash';
import { checkFilledUserInfo, updateUserAfterSignIn } from 'utils/helpers/usersHelper';
import {
  appleSignIn,
  checkClassCodeApi,
  checkUserVerificationCodeApi,
  googleSignInApi,
  sendPasswordRecoveryLinkApi,
  signUpApi,
  signInApi,
  studentSignUpApi,
  updateUserApi,
  autoGenerateUsernameApi,
} from 'api/requests';
import { setCurrentUser } from 'containers/App/actions';
import {
  CHECK_CLASS_CODE_REQUEST,
  CHECK_USER_VERIFICATION_CODE_REQUEST,
  RESET_USER_PASSWORD_REQUEST,
  SEND_PASSWORD_RECOVERY_LINK_REQUEST,
  SIGN_IN_REQUEST,
  SIGN_UP_REQUEST,
  UPDATE_USER_REQUEST,
  AUTO_GENERATE_USERNAME_REQUEST,
} from './constants';

export function* checkClassCode(action) {
  const { data, handleSuccess } = action.data;
  try {
    yield call(checkClassCodeApi, data);
    yield call(handleSuccess);
  } catch (errors) {
    if (errors.status === 400) {
      const { handleErrors } = action.data;
      yield call(handleErrors, errors.data);
    }
  }
}

export function* checkUserVerificationCode(action) {
  const { data, handleSuccess } = action.data;
  try {
    const response = yield call(checkUserVerificationCodeApi, data);
    const { auth_token: token, user } = response.data;
    const isUserInfoFilledIn = checkFilledUserInfo(user);
    if (isUserInfoFilledIn) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('role', user.role);
    } else {
      localStorage.setItem('temp_auth_token', token);
    }
    yield put(setCurrentUser(_.cloneDeep(user)));
    yield call(handleSuccess, isUserInfoFilledIn, user.role);
  } catch (errors) {
    const { handleErrors } = action.data;
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* resetUserPassword(action) {
  const { data, handleSuccess, userId } = action.data;
  try {
    const response = yield call(updateUserApi, userId, data);

    const isUserInfoFilledIn = checkFilledUserInfo(response.data);
    yield put(setCurrentUser(response.data));
    if (isUserInfoFilledIn) {
      const token = localStorage.getItem('temp_auth_token');

      localStorage.setItem('auth_token', token);
      localStorage.setItem('role', response.data.role);

      localStorage.removeItem('temp_auth_token');
    }
    yield call(handleSuccess, isUserInfoFilledIn, response.data.role);
  } catch (errors) {
    const { handleErrors } = action.data;
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* sendPasswordRecoveryLink(action) {
  const { data, handleSuccess } = action.data;
  try {
    yield call(sendPasswordRecoveryLinkApi, data);
    yield call(handleSuccess);
  } catch (errors) {
    const { handleErrors } = action.data;
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* signUp(action) {
  const { data, type, handleSuccess } = action.data;
  try {
    const api = type === 'teacher' ? signUpApi : studentSignUpApi;
    yield call(api, data);
    yield call(handleSuccess);
  } catch (errors) {
    const { handleErrors } = action.data;
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* signIn(action) {
  const { data, key, handleSuccess } = action.data;
  if (data && data.is_keep_logged_in === undefined) {
    data.is_keep_logged_in = false;
  }
  try {
    const signInApiAddress = type =>
      ({
        apple_sign_in: appleSignIn,
        google_sign_in: googleSignInApi,
        sign_in: signInApi,
        student_apple_sign_up: appleSignIn,
        student_google_sign_up: googleSignInApi,
      }[type]);
    const response = yield call(signInApiAddress(key), data);
    const isUserInfoFilledIn = checkFilledUserInfo(response.data.user);

    let user = _.cloneDeep(response.data.user);
    if (key !== 'sign_in' && _.has(response.data, 'prefilled_user_data')) {
      user = updateUserAfterSignIn(response.data.prefilled_user_data, user);
    }
    yield put(setCurrentUser(user));

    localStorage.setItem(isUserInfoFilledIn ? 'auth_token' : 'temp_auth_token', response.data.auth_token);
    localStorage.setItem('role', response.data.user.role);
    yield call(handleSuccess, isUserInfoFilledIn, response.data.user.role);
  } catch (errors) {
    if (errors.status === 400 && _.has(action.data, 'handleErrors')) {
      yield call(action.data.handleErrors, errors.data);
    }
  }
}

export function* updateUser(action) {
  const { data, handleSuccess, userId } = action.data;
  try {
    const response = yield call(updateUserApi, userId, data);
    const token = localStorage.getItem('temp_auth_token');
    if (token !== null) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('role', response.data.role);

      localStorage.removeItem('temp_auth_token');
    }
    yield put(setCurrentUser(response.data));
    yield call(handleSuccess);
  } catch (errors) {
    if (errors.status === 400) {
      const { handleErrors } = action.data;
      yield call(handleErrors, errors.data);
    }
  }
}

export function* autoGenerateUsername(action) {
  const { quantity, handleSuccess } = action.data;
  try {
    const response = yield call(autoGenerateUsernameApi, quantity);
    yield call(handleSuccess, response.data);
  } catch {}
}

export default function* registrationSaga() {
  yield takeLatest(CHECK_CLASS_CODE_REQUEST, checkClassCode);
  yield takeLatest(CHECK_USER_VERIFICATION_CODE_REQUEST, checkUserVerificationCode);
  yield takeLatest(RESET_USER_PASSWORD_REQUEST, resetUserPassword);
  yield takeLatest(SEND_PASSWORD_RECOVERY_LINK_REQUEST, sendPasswordRecoveryLink);
  yield takeLatest(SIGN_IN_REQUEST, signIn);
  yield takeLatest(SIGN_UP_REQUEST, signUp);
  yield takeLatest(UPDATE_USER_REQUEST, updateUser);
  yield takeLatest(AUTO_GENERATE_USERNAME_REQUEST, autoGenerateUsername);
}
