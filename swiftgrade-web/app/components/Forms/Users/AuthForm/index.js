import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'components/Controls';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { CheckboxField } from 'components/Fields';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getGroupsRequest, setGroups } from 'containers/Groups/actions';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { styles } from './styles';
import messages from './messages';

import { EmailOrUsernameField, EmailField, PasswordField } from '../Fields';

class AuthForm extends React.Component {
  renderKeepLoggedField = (classes, isLogin) => {
    if (isLogin) {
      return (
        <div className={classes.remember_me}>
          <div className={classes.customcheckbox}>
            <Field
              name="is_keep_logged_in"
              component={CheckboxField}
              label={<FormattedMessage {...messages.keepMe} />}
              checkboxClasses={{
                checkbox: {
                  checked: classes.checkmark_checked,
                  root: classes.checkmark,
                },
                label: { label: classes.checkbox_label },
              }}
            />
          </div>
        </div>
      );
    }
    return null;
  };

  renderButton = isLoginPopup => {
    const { classes } = this.props;
    return (
      <div>
        <DefaultButton
          borderRadius={4}
          type="submit"
          text={isLoginPopup ? <FormattedMessage {...messages.logIn} /> : <FormattedMessage {...messages.signUp} />}
          className={classes.sign_up_btn}
        />
      </div>
    );
  };

  render() {
    const { classes, isLogin, password, handleSubmit } = this.props;
    const field = isLogin ? <EmailOrUsernameField /> : <EmailField />;
    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.block_input}>{field}</div>
        <div className={classes.block_input}>
          <PasswordField password={password} />
        </div>
        {this.renderButton(isLogin)}
        {this.renderKeepLoggedField(classes, isLogin)}
      </form>
    );
  }
}

AuthForm.propTypes = {
  initialValues: PropTypes.any,
  intl: intlShape.isRequired,
  invalid: PropTypes.bool,
  isLogin: PropTypes.bool,
  password: PropTypes.string,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
};

AuthForm.defaultTypes = {
  isLogin: false,
};

const withForm = reduxForm({
  form: 'AuthForm',
  touchOnChange: true,
  enableReinitialize: true,
  initialValues: {
    email: null,
    password: null,
    is_keep_logged_in: false,
  },
});

const selector = formValueSelector('AuthForm');
const mapStateToProps = createStructuredSelector({
  password: state => selector(state, 'password'),
});

const mapDispatchToProps = {
  getGroupsRequest,
  setGroups,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
  withForm,
  withStyles(styles),
)(AuthForm);
