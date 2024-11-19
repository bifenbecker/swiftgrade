import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'components/Controls';
import { FormattedMessage } from 'react-intl';
import { reduxForm } from 'redux-form/lib/immutable';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import messages from './messages';
import { styles } from './styles';

import { EmailField } from '../Fields';

function RecoverPasswordForm(props) {
  const { classes, handleSubmit } = props;
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h3>
        <FormattedMessage {...messages.forgotPasswordQuestion} />
      </h3>
      <div className={classes.block_input}>
        <EmailField />
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

RecoverPasswordForm.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
};

const withForm = reduxForm({
  form: 'RecoverPasswordForm',
  touchOnChange: true,
});

export default compose(
  withForm,
  withStyles(styles),
)(RecoverPasswordForm);
