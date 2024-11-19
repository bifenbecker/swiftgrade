import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'components/Controls';
import { FormattedMessage, injectIntl } from 'react-intl';
import { formValueSelector, reduxForm } from 'redux-form/lib/immutable';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import messages from './messages';

import { PasswordField } from '../Fields';

class ResetPasswordForm extends React.PureComponent {
  render() {
    const { classes, email, password, handleSubmit } = this.props;
    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <h3>
          <FormattedMessage {...messages.resetPassword} />
        </h3>
        <div className={classes.reset_emial}>
          <span>{email}</span>
        </div>
        <div className={classes.block_input}>
          <PasswordField password={password} />
        </div>
        <div>
          <DefaultButton
            borderRadius={4}
            type="submit"
            text={<FormattedMessage {...messages.submit} />}
            className={classes.btn_main}
          />
        </div>
      </form>
    );
  }
}

ResetPasswordForm.propTypes = {
  classes: PropTypes.object,
  email: PropTypes.string,
  handleSubmit: PropTypes.func,
  intl: PropTypes.object,
  password: PropTypes.string,
};

const selector = formValueSelector('ResetPasswordForm');
const mapStateToProps = createStructuredSelector({
  password: state => selector(state, 'password'),
});

const withForm = reduxForm({
  form: 'ResetPasswordForm',
  touchOnChange: true,
  initialValues: {
    password: null,
  },
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
)(ResetPasswordForm);
