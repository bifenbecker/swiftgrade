import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { InputField } from 'components/Fields';
import { injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles';
import messages from '../messages';

function ClassCodeField(props) {
  const { intl, classes, customClasses } = props;
  const classCodeFieldCustomClasses = customClasses || {
    root: classes.input_root,
    focused: classes.input_focused,
    input: classes.input,
  };
  return (
    <Field
      component={InputField}
      name="code"
      fullWidth
      placeholder={intl.formatMessage(messages.classCode)}
      customClasses={classCodeFieldCustomClasses}
      customErrorClass={classes.error_input_join}
    />
  );
}

ClassCodeField.propTypes = {
  intl: intlShape.isRequired,
  classes: PropTypes.object,
  customClasses: PropTypes.object,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(ClassCodeField);
