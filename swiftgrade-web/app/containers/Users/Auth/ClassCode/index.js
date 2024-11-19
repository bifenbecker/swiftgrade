import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { ClassCodeForm } from 'components/Forms';
import { FormattedMessage } from 'react-intl';
import { IconCongratulations } from 'components/Svgs';
import { SubmissionError } from 'redux-form';
import { Typography, withStyles } from '@material-ui/core';
import { UserHeaderLayout } from 'components/Layouts';
import _ from 'lodash';
import queryString from 'query-string';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getPathAfterAuth } from 'utils/helpers/usersHelper';
import { appleAuthHelpers } from 'react-apple-signin-auth';
import { resetForm } from 'containers/App/actions';
import { checkClassCodeRequest, signInRequest } from 'containers/Users/actions';
import injectSaga from 'utils/injectSaga';
import saga from 'containers/Users/saga';
import { styles } from './styles';
import messages from './messages';

function ClassCode(props) {
  const appleSignIn = () =>
    appleAuthHelpers.signIn({
      authOptions: {
        clientId: process.env.APPLE_CLIENT_ID,
        scope: 'email name',
        redirectURI: process.env.APPLE_REDIRECT_URI,
        state: '',
        nonce: 'nonce',
        usePopup: true,
      },
      onSuccess: response =>
        onSignInSuccess(
          { auth_code: response.authorization.code, user: _.has(response, 'user') ? response.user : null },
          'student_apple_sign_up',
        ),
      onError: error => console.error(error),
    });

  const onSignInSuccess = (inputData, key) =>
    new Promise(() => {
      const handleSuccess = (isUserInfoFilledIn, role) => {
        const { history } = props;
        history.push(getPathAfterAuth(isUserInfoFilledIn, role));
      };
      const code = localStorage.getItem('code');
      const data = _.merge(inputData, { code, role: 'student' });
      props.signInRequest({ data, key, handleSuccess });
    });

  const checkClassCode = formData => {
    const data = formData && formData.toJS ? formData.toJS() : null;
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };
      localStorage.setItem('code', data.code);
      const handleSuccess = () => {
        const signIn =
          props.signInKey === 'google'
            ? () => {
              window.open(
                `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${
                  process.env.CLIENT_ID
                }&scope=openid%20email%20profile&redirect_uri=${process.env.HOST_URL}class_code/`,
                '_self',
              );
            }
            : appleSignIn;
        signIn();
      };
      props.checkClassCodeRequest({ data, handleErrors, handleSuccess });
    });
  };

  const { classes, history, location } = props;
  const [firstTimeCode, setFirstTimeCode] = useState(true);
  const params = _.has(location, 'search') && queryString.parse(location.search);
  const authCode = _.has(params, 'code') ? params.code : null;
  if (authCode && firstTimeCode) {
    setFirstTimeCode(false);
    onSignInSuccess({ token: authCode }, 'student_google_sign_up');
  }
  return (
    <Fragment>
      <UserHeaderLayout history={history} />
      <div className={classes.class_code_wrapper}>
        <IconCongratulations style={{ maxHeight: 230, maxWidth: 230, margin: '0 auto' }} />
        <Typography variant="h3" className={classes.class_code_title}>
          <FormattedMessage {...messages.enterClassCode} />
        </Typography>
        <div className={classes.class_code_form}>
          <ClassCodeForm onSubmit={checkClassCode} />
        </div>
        <Typography className={classes.no_code_title}>
          <FormattedMessage {...messages.noCodeQuestion} />
        </Typography>
      </div>
    </Fragment>
  );
}

ClassCode.propTypes = {
  classes: PropTypes.object,
  code: PropTypes.any,
  history: PropTypes.object,
  location: PropTypes.object,
  signInKey: PropTypes.string,
  checkClassCodeRequest: PropTypes.func,
  resetForm: PropTypes.func,
  signInRequest: PropTypes.func,
};

const mapDispatchToProps = {
  checkClassCodeRequest,
  resetForm,
  signInRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withConnect,
  withSaga,
  withStyles(styles),
)(ClassCode);
