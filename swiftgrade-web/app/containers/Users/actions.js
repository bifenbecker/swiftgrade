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

export const checkClassCodeRequest = data => ({
  type: CHECK_CLASS_CODE_REQUEST,
  data,
});

export const checkUserVerificationCodeRequest = data => ({
  type: CHECK_USER_VERIFICATION_CODE_REQUEST,
  data,
});

export const resetUserPasswordRequest = data => ({
  type: RESET_USER_PASSWORD_REQUEST,
  data,
});

export const sendPasswordRecoveryLinkRequest = data => ({
  type: SEND_PASSWORD_RECOVERY_LINK_REQUEST,
  data,
});

export const signUpRequest = data => ({
  type: SIGN_UP_REQUEST,
  data,
});

export const signInRequest = data => ({
  type: SIGN_IN_REQUEST,
  data,
});

export const updateUserRequest = data => ({
  type: UPDATE_USER_REQUEST,
  data,
});

export const autoGenerateUsernameRequest = data => ({
  type: AUTO_GENERATE_USERNAME_REQUEST,
  data,
});
