import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { DefaultButton } from 'components/Controls';
import { InputField } from 'components/Fields';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import messages from './messages';

import { styles } from './style';

const validate = values => {
  const password = values.get('password');
  const errors = {};
  if (!password) {
    errors.password = 'This field is required';
  }
  return errors;
};

const ResetPasswordStudent = props => {
  const { classes, onCancel, intl, handleSubmit, group } = props;
  const { formatMessage } = intl;

  const placeholder = formatMessage(messages.studentResetPasswordFormPlaceholder);
  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column">
        <Grid item className={classes.title_wrapper}>
          <FormattedMessage {...messages.studentResetPasswordFormTitle} />
        </Grid>
        <Grid item>
          <Field
            component={InputField}
            name="password"
            // type="password"
            fullWidth
            placeholder={placeholder}
            disabled={false}
          />
        </Grid>
        <Grid item>
          <Grid container spacing={3} direction="row" justify="flex-end" className={classes.actions_wrapper}>
            <Grid item>
              <DefaultButton borderRadius={4} onClick={onCancel} text={<FormattedMessage {...messages.cancel} />} />
            </Grid>
            <Grid item>
              <DefaultButton
                backgroundColor={group.color}
                borderRadius={4}
                type="submit"
                text={<FormattedMessage {...messages.save} />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

ResetPasswordStudent.propTypes = {
  intl: intlShape.isRequired,
  onCancel: PropTypes.func,
  classes: PropTypes.object,
  group: PropTypes.object,
  handleSubmit: PropTypes.func,
};

const withForm = reduxForm({
  form: 'ResetPasswordStudentsForm',
  validate,
});

export default compose(
  withForm,
  injectIntl,
  withStyles(styles),
)(ResetPasswordStudent);
