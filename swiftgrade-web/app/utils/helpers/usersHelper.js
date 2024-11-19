import _ from 'lodash';
import jwtDecode from 'jwt-decode';

export const checkFilledUserInfo = user => {
  const mandatoryUserFields = ['gender', 'first_name', 'last_name', 'school_type', 'subjects'];
  const mandatoryStudentFields = ['first_name', 'last_name'];

  const mandatoryFields = user.role === 'teacher' ? mandatoryUserFields : mandatoryStudentFields;
  return !mandatoryFields.some(field => _.isNull(user[field]));
};

export const getPathAfterAuth = (isUserInfoFilledIn, role) => {
  if (!isUserInfoFilledIn) {
    return role === 'student' ? '/student_name/?key=sign_in/' : '/account_setup/?key=sign_in/';
  }
  return '/';
};

export const getUserData = () => {
  const authToken = localStorage.getItem('auth_token');

  if (!authToken) {
    return {};
  }

  return jwtDecode(authToken.split(' ')[1]);
};

export const updateLoginDeviceType = (data, field, isMobile, isMobileIOS, isMobileAndroid) => {
  let deviceType = 'website';
  if (isMobileIOS) deviceType = 'mobile_ios';
  if (isMobileAndroid) deviceType = 'mobile_android';
  if (isMobile && (!isMobileIOS && !isMobileAndroid)) deviceType = 'mobile';
  _.set(data, field, deviceType);
  return data;
};

export const updateUserAfterSignIn = (data, user) => {
  const firstName = _.has(data, 'first_name') ? data.first_name : user.first_name;
  const lastName = _.has(data, 'last_name') ? data.last_name : user.last_name;
  _.set(user, 'first_name', firstName);
  _.set(user, 'last_name', lastName);
  return user;
};

export const isTeacher = user => _.isObject(user) && user.role === 'teacher';
