import React from 'react';
import PropTypes from 'prop-types';
import { IconAppleButton } from 'components/Svgs';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import AppleSignin from 'react-apple-signin-auth';
import _ from 'lodash';
import { updateLoginDeviceType } from 'utils/helpers/usersHelper';
import { styles } from './styles';
import messages from './messages';

function AppleActionView(props) {
  const { classes, history, isMobile, isMobileIOS, isMobileAndroid, type } = props;
  const onAppleSignInFailure = error => console.log('Apple sign in failed:', error);
  const onAppleSignInSuccess = response => {
    const data = updateLoginDeviceType(
      { auth_code: response.authorization.code, user: _.has(response, 'user') ? response.user : null },
      'login_device',
      isMobile,
      isMobileIOS,
      isMobileAndroid,
    );
    props.signIn(data, 'apple_sign_in');
  };
  const redirectToNextStep = event => {
    if (type && type === 'student') {
      event.stopPropagation();
      history.push('/class_code/?key=apple');
    }
  };

  return (
    <div
      role="button"
      className={classes.apple_action}
      tabIndex={0}
      onMouseDown={e => redirectToNextStep(e)}
      onTouchStart={e => redirectToNextStep(e)}
    >
      <AppleSignin
        authOptions={{
          clientId: process.env.APPLE_CLIENT_ID,
          scope: 'email name',
          redirectURI: process.env.APPLE_REDIRECT_URI,
          state: '',
          nonce: 'nonce',
          usePopup: true,
        }}
        render={renderProps => (
          <a role="button" tabIndex={0} style={{ width: '100%' }} {...renderProps}>
            <IconAppleButton />
            <p className={classes.apple_action_text}>
              <FormattedMessage {...messages.appleAccount} />
            </p>
          </a>
        )}
        onSuccess={response => {
          onAppleSignInSuccess(response);
        }}
        onError={error => onAppleSignInFailure(error)}
      />
    </div>
  );
}

AppleActionView.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  isMobile: PropTypes.bool,
  isMobileIOS: PropTypes.bool,
  isMobileAndroid: PropTypes.bool,
  signIn: PropTypes.func,
  type: PropTypes.string,
};

export default compose(withStyles(styles))(AppleActionView);
