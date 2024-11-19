/* eslint-disable no-empty */
import { setGroup } from 'containers/Groups/actions';
import { makeSelectGroup } from 'containers/Groups/selectors';
import { getGroups } from 'containers/Groups/saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { updateStudents, updateStudentsAfterDeleting } from 'utils/helpers/studentsHelper';
import {
  checkStudentVerificationCodeApi,
  createStudentApi,
  manuallyAddStudentsApi,
  checkStudentUsernameApi,
  deleteStudentApi,
  getStudentCodeApi,
  getStudentsApi,
  updateUserApi,
  addStudentsApi,
  downloadStudentLoginInfoApi,
} from 'api/requests';
import _ from 'lodash';
import { setStudents } from './actions';
import {
  CHECK_VERIFICATION_CODE_REQUEST,
  CREATE_STUDENT_REQUEST,
  MANUALLY_ADD_STUDENTS_REQUEST,
  CHECK_STUDENT_USERNAME_REQUEST,
  DELETE_STUDENT_REQUEST,
  GET_STUDENT_CODE_REQUEST,
  GET_STUDENTS_REQUEST,
  UPDATE_STUDENT_REQUEST,
  ADD_STUDENTS_TO_CLASS_REQUEST,
  GET_DOWNLOAD_STUDENT_LOGIN_INFO_REQUEST,
} from './constants';
import { makeSelectStudents } from './selectors';

export function* checkVerificationCode(action) {
  const { data, handleErrors } = action.data;
  try {
    const response = yield call(checkStudentVerificationCodeApi, data);
    if (_.has(action.data, 'handleSuccess')) {
      yield call(action.data.handleSuccess, response.data);
    }
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* createStudent(action) {
  const { data, handleSuccess, handleErrors } = action.data;
  try {
    yield call(createStudentApi, data);
    yield call(handleSuccess);
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* manuallyAddStudents(action) {
  const { data, groupId, handleSuccess, handleErrors } = action.data;
  try {
    const response = yield call(manuallyAddStudentsApi, groupId, data);
    yield call(handleSuccess, response.data);
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* checkStudentUsername(action) {
  const { data, handleSuccess, handleErrors } = action.data;
  try {
    yield call(checkStudentUsernameApi, data);
    yield call(handleSuccess);
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* downloadStudentLoginInfo(action) {
  try {
    const { data, handleSuccess } = action.data;
    const response = yield call(downloadStudentLoginInfoApi, data);
    yield call(handleSuccess, response.data);
  } catch {}
}

export function* getStudents(action) {
  try {
    const { data } = action.data;
    const response = yield call(getStudentsApi, data);
    yield put(setStudents(response.data));
  } catch {}
}

export function* getStudentCode(action) {
  try {
    const { data, groupId, handleSuccess } = action.data;
    const response = yield call(getStudentCodeApi, groupId, data);
    yield call(handleSuccess, response.data.code);
  } catch {}
}

export function* deleteStudent(action) {
  try {
    const { handleSuccess } = action.data;
    yield call(deleteStudentApi, action.data.data);

    const students = yield select(makeSelectStudents());
    const group = yield select(makeSelectGroup(action.data.group_id));

    const data = updateStudentsAfterDeleting(group, students, action.data.data);
    yield put(setGroup(data.group));
    yield put(setStudents(data.students));

    yield call(handleSuccess);
  } catch (errors) {
    const { handleErrors } = action.data;
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* updateStudent(action) {
  try {
    const { studentId, data, handleSuccess } = action.data;
    const response = yield call(updateUserApi, studentId, data);
    const students = _.cloneDeep(yield select(makeSelectStudents()));
    yield put(setStudents(updateStudents(response.data, students)));
    yield call(handleSuccess);
  } catch (errors) {
    const { handleErrors } = action.data;
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* addStudentsToClassRequest(action) {
  try {
    const { data, handleSuccess } = action.data;
    yield call(addStudentsApi, data);
    yield call(getGroups, {});
    yield call(handleSuccess);
  } catch (errors) {
    const { handleErrors } = action.data;
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export default function* studentsSaga() {
  yield takeLatest(CHECK_VERIFICATION_CODE_REQUEST, checkVerificationCode);
  yield takeLatest(CREATE_STUDENT_REQUEST, createStudent);
  yield takeLatest(MANUALLY_ADD_STUDENTS_REQUEST, manuallyAddStudents);
  yield takeLatest(CHECK_STUDENT_USERNAME_REQUEST, checkStudentUsername);
  yield takeLatest(GET_DOWNLOAD_STUDENT_LOGIN_INFO_REQUEST, downloadStudentLoginInfo);
  yield takeLatest(GET_STUDENTS_REQUEST, getStudents);
  yield takeLatest(GET_STUDENT_CODE_REQUEST, getStudentCode);
  yield takeLatest(DELETE_STUDENT_REQUEST, deleteStudent);
  yield takeLatest(UPDATE_STUDENT_REQUEST, updateStudent);
  yield takeLatest(ADD_STUDENTS_TO_CLASS_REQUEST, addStudentsToClassRequest);
}
