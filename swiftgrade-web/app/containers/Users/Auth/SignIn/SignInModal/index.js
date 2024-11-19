import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { IconClosePopup } from 'components/Svgs';
import { AuthForm } from 'components/Forms';
import { compose } from 'redux';
import { withStyles, ClickAwayListener } from '@material-ui/core';
import { styles } from './styles';
import messages from '../messages';

import { GoogleActionView } from '../../../Views';

function SignInModal(props) {
  const { classes, history } = props;
  return (
    <div className={classes.login_popup_overlay}>
      <ClickAwayListener onClickAway={props.hideModal} mouseEvent="onMouseDown">
        <div className={classes.login_popup_content}>
          <span className={classes.close}>
            <IconClosePopup onClick={props.hideModal} />
          </span>
          <div className={classes.login_modal_header}>
            <h3>
              <FormattedMessage {...messages.logIn} />
            </h3>
          </div>
          <div className={classes.modal_inner_content}>
            <GoogleActionView signIn={props.signIn} />
            <AuthForm isLogin onSubmit={props.handleSubmit} />
            <div className={classes.login_footer_links}>
              <p className={classes.forgot_password}>
                <a href="/recover/">
                  <FormattedMessage {...messages.forgotPassword} />
                </a>
              </p>
              <p className={classes.login_signup}>
                <FormattedMessage {...messages.dontHaveAccount} />
                <a role="button" onClick={() => history.push('/select_type/')} tabIndex={0}>
                  <FormattedMessage {...messages.signUp} />
                </a>
              </p>
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
}

SignInModal.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  handleSubmit: PropTypes.func,
  hideModal: PropTypes.func,
  signIn: PropTypes.func,
};

export default compose(withStyles(styles))(SignInModal);
