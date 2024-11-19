import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'components/Controls';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { getGroupsRequest, setGroups } from 'containers/Groups/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { styles } from './styles';
import messages from './messages';

import { EmailField, PasswordField } from '../Fields';
import ClassCodeField from '../Fields/ClassCodeField';

function StudentSignUpForm(props) {
  const { classes, handleSubmit, password } = props;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.block_input}>
        <ClassCodeField />
      </div>
      <div className={classes.block_input}>
        <EmailField />
      </div>
      <div className={classes.block_input}>
        <PasswordField password={password} />
      </div>
      <div>
        <DefaultButton
          borderRadius={4}
          type="submit"
          text={<FormattedMessage {...messages.joinClass} />}
          className={classes.joinclass_btn}
        />
      </div>
    </form>
  );
}

StudentSignUpForm.propTypes = {
  intl: intlShape.isRequired,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  password: PropTypes.string,
};

const withForm = reduxForm({
  form: 'StudentSignUpForm',
  touchOnChange: true,
  initialValues: {
    code: null,
    email: null,
    password: null,
  },
});

const selector = formValueSelector('StudentSignUpForm');

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
)(StudentSignUpForm);
