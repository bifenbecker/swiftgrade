import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl, intlShape } from 'react-intl';
import { InputField, CustomSelectField } from 'components/Fields';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { required } from 'utils/validations';
import { withStyles } from '@material-ui/core/styles';
import { isTeacher } from 'utils/helpers/usersHelper';
import { styles } from './styles';
import messages from './messages';

import { TYPES } from './constants';
import { EmailOrUsernameField } from '../Fields';

function ProfileForm(props) {
  const { classes, handleSubmit, intl, user } = props;
  const customInputFieldClasses = { root: classes.input_root, focused: classes.input_focused, input: classes.input };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {isTeacher(user) && (
        <div className={classes.block_input}>
          <Field
            name="gender"
            component={CustomSelectField}
            validate={[required]}
            options={TYPES}
            tabIndex={-1}
            selectClasses={{ root: classes.select_root, input: classes.select_input }}
          />
        </div>
      )}
      <div className={classes.block_input}>
        <Field
          component={InputField}
          fullWidth
          placeholder={intl.formatMessage(messages.firstName)}
          name="first_name"
          max={30}
          customClasses={customInputFieldClasses}
        />
      </div>
      <div className={classes.block_input}>
        <Field
          component={InputField}
          placeholder={intl.formatMessage(messages.lastName)}
          name="last_name"
          max={30}
          customClasses={customInputFieldClasses}
        />
      </div>
      <div className={classes.block_input}>
        <EmailOrUsernameField customClasses={customInputFieldClasses} disabled />
      </div>
    </form>
  );
}

ProfileForm.propTypes = {
  intl: intlShape.isRequired,
  classes: PropTypes.object,
  user: PropTypes.object,
  handleSubmit: PropTypes.func,
};

const withForm = reduxForm({
  form: 'ProfileForm',
  touchOnChange: true,
});

const mapStateToProps = (state, ownProps) => {
  const initialValues = {
    first_name: ownProps.user.first_name,
    last_name: ownProps.user.last_name,
    email_or_username: ownProps.user.username,
  };
  if (isTeacher(ownProps.user)) {
    initialValues.gender = ownProps.user.gender;
  }
  return {
    initialValues,
  };
};

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  injectIntl,
  withConnect,
  withForm,
  withStyles(styles),
)(ProfileForm);
