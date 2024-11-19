import { FormattedMessage } from 'react-intl';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { AppleActionView, GoogleActionView } from '../index';
import { styles } from './styles';
import messages from './messages';

function AuthButtonsView(props) {
  const { classes, history, isMobile, location, type, signIn } = props;
  const authProps = { history, isMobile, location, type, signIn };
  return (
    <div>
      <div className={classes.auth_buttons}>
        <AppleActionView {...authProps} />
        <GoogleActionView {...authProps} />
      </div>
      <div className={classes.signin_or}>
        <FormattedMessage {...messages.or} />
      </div>
    </div>
  );
}

AuthButtonsView.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  isMobile: PropTypes.bool,
  location: PropTypes.object,
  type: PropTypes.string,
  signIn: PropTypes.func,
};

export default withStyles(styles)(AuthButtonsView);
