import {
  CHECK_VERIFICATION_CODE_REQUEST,
  CREATE_STUDENT_REQUEST,
  MANUALLY_ADD_STUDENTS_REQUEST,
  CHECK_STUDENT_USERNAME_REQUEST,
  DELETE_STUDENT_REQUEST,
  GET_STUDENT_CODE_REQUEST,
  GET_STUDENTS_REQUEST,
  SET_STUDENTS,
  UPDATE_STUDENT_REQUEST,
  ADD_STUDENTS_TO_CLASS_REQUEST,
  GET_DOWNLOAD_STUDENT_LOGIN_INFO_REQUEST,
} from './constants';

export const checkVerificationCodeRequest = data => ({
  type: CHECK_VERIFICATION_CODE_REQUEST,
  data,
});

export const createStudentRequest = data => ({
  type: CREATE_STUDENT_REQUEST,
  data,
});

export const manuallyAddStudentsRequest = data => ({
  type: MANUALLY_ADD_STUDENTS_REQUEST,
  data,
});

export const checkStudentUsernameRequest = data => ({
  type: CHECK_STUDENT_USERNAME_REQUEST,
  data,
});

export const getDownloadStudentLoginInfoRequest = data => ({
  type: GET_DOWNLOAD_STUDENT_LOGIN_INFO_REQUEST,
  data,
});

export const getStudentsRequest = data => ({
  type: GET_STUDENTS_REQUEST,
  data,
});

export const getStudentCodeRequest = data => ({
  type: GET_STUDENT_CODE_REQUEST,
  data,
});

export const deleteStudentRequest = data => ({
  type: DELETE_STUDENT_REQUEST,
  data,
});

export const setStudents = data => ({
  type: SET_STUDENTS,
  data,
});

export const updateStudentRequest = data => ({
  type: UPDATE_STUDENT_REQUEST,
  data,
});

export const addStudentsToClassRequest = data => ({
  type: ADD_STUDENTS_TO_CLASS_REQUEST,
  data,
});
