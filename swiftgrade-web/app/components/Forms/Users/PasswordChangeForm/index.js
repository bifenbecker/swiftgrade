import React from 'react';
import PropTypes from 'prop-types';
import { formValueSelector, reduxForm } from 'redux-form/immutable';
import { Button, withStyles } from '@material-ui/core';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import messages from './messages';
import { styles } from './styles';
import { PasswordField } from '../Fields';

function PasswordChangeForm(props) {
  const { classes, intl, handleSubmit, password, onChangeIsOpen, prev_password: PrevPassword } = props;

  const passwordCustomClasses = {
    root: classes.input_root,
    focused: classes.input_focused,
    input: classes.input,
  };

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.block_input}>
          <PasswordField
            customClasses={passwordCustomClasses}
            customErrorClass={classes.error}
            name="prev_password"
            password={PrevPassword}
            placeholder={intl.formatMessage(messages.currentPassword)}
          />
        </div>
        <div className={classes.block_input}>
          <PasswordField
            customErrorClass={classes.error}
            customClasses={passwordCustomClasses}
            password={password}
            placeholder={intl.formatMessage(messages.newPassword)}
          />
        </div>
        <div className="button_block">
          <Button className={classes.change_password_btn} type="submit">
            <FormattedMessage {...messages.change} />
          </Button>
          <Button className={classes.change_password_btn} onClick={onChangeIsOpen}>
            <FormattedMessage {...messages.cancel} />
          </Button>
        </div>
      </form>
    </div>
  );
}

PasswordChangeForm.propTypes = {
  classes: PropTypes.object,
  intl: PropTypes.any,
  isOpen: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onChangeIsOpen: PropTypes.func,
  password: PropTypes.string,
  prev_password: PropTypes.string,
};

const withForm = reduxForm({
  form: 'PasswordChangeForm',
  touchOnChange: true,
  initialValues: {
    password: null,
    prev_password: null,
  },
});

const selector = formValueSelector('PasswordChangeForm');
const mapStateToProps = createStructuredSelector({
  password: state => selector(state, 'password'),
  prev_password: state => selector(state, 'prev_password'),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  injectIntl,
  withConnect,
  withForm,
  withStyles(styles),
)(PasswordChangeForm);
