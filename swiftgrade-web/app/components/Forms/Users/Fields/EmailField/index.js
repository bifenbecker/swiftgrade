import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { InputField } from 'components/Fields';
import { injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles';
import messages from '../messages';

function EmailField(props) {
  const { intl, classes, customClasses, disabled } = props;
  const emailFieldCustomClasses = customClasses || {
    root: classes.input_root,
    focused: classes.input_focused,
    input: classes.input,
  };
  return (
    <Field
      component={InputField}
      disabled={disabled}
      name="email"
      fullWidth
      placeholder={intl.formatMessage(messages.email)}
      customClasses={emailFieldCustomClasses}
      customErrorClass={classes.error_input_join}
    />
  );
}

EmailField.propTypes = {
  intl: intlShape.isRequired,
  classes: PropTypes.object,
  customClasses: PropTypes.object,
  disabled: PropTypes.bool,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(EmailField);
