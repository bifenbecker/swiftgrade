import {
  DEFAULT_LOCALE,
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_CHECKLIST_REQUEST,
  LOGOUT_REQUEST,
  RESET_FORM,
  SET_CURRENT_USER,
  SET_CURRENT_USER_CHECKLIST,
  UPDATE_CURRENT_USER_REQUEST,
  CHECK_USER_AUTOLOGIN_REQUEST,
  VERIFY_EMAIL_REQUEST,
} from './constants';

export const getCurrentUserRequest = data => ({
  type: GET_CURRENT_USER_REQUEST,
  data,
});

export const getCurrentUserChecklistRequest = data => ({
  type: GET_CURRENT_USER_CHECKLIST_REQUEST,
  data,
});

export const setCurrentUser = data => ({
  type: SET_CURRENT_USER,
  data,
});

export const setCurrentUserChecklist = data => ({
  type: SET_CURRENT_USER_CHECKLIST,
  data,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const resetForm = formName => ({
  type: RESET_FORM,
  formName,
});

export const logout = () => ({
  type: DEFAULT_LOCALE,
});

export const updateCurrentUserRequest = data => ({
  type: UPDATE_CURRENT_USER_REQUEST,
  data,
});

export const checkAutoLoginRequest = data => ({
  type: CHECK_USER_AUTOLOGIN_REQUEST,
  data,
});

export const verifyEmailRequest = data => ({
  type: VERIFY_EMAIL_REQUEST,
  data,
});
