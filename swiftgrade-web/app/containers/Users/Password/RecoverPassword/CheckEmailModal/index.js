import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import messages from '../messages';
import { styles } from './styles';

class CheckEmailModal extends React.PureComponent {
  render() {
    const { classes, email, history, onChangeIsOpen } = this.props;

    return (
      <div className={classes.popup_overlay}>
        <div className={classes.popup_content}>
          <h3>
            <FormattedMessage {...messages.checkEmail} />
          </h3>
          <p>
            <FormattedMessage {...messages.passwordResetLink} /> <span className={classes.users_email}>{email}</span>.
            <br /> <FormattedMessage {...messages.createNewPassword} />
          </p>
          <Button
            className={classes.close}
            onClick={() => {
              onChangeIsOpen(false);
              history.push('/sign_in/');
            }}
          >
            <FormattedMessage {...messages.okay} />
          </Button>
        </div>
      </div>
    );
  }
}

CheckEmailModal.propTypes = {
  classes: PropTypes.object,
  email: PropTypes.string,
  history: PropTypes.object,
  isOpen: PropTypes.bool,
  onChangeIsOpen: PropTypes.func,
};

export default compose(withStyles(styles))(CheckEmailModal);
