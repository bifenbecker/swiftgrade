import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { InputField } from 'components/Fields';
import { InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import _ from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles';
import messages from '../messages';

function PasswordField(props) {
  const { autoComplete, classes, customClasses, customErrorClass, intl, password, name, placeholder, onEnter } = props;
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const Icon = isPasswordHidden ? VisibilityOff : Visibility;
  const endInput = !_.isEmpty(password) ? (
    <InputAdornment position="end" classes={{ root: classes.icon_show_password }}>
      <Icon onClick={() => setIsPasswordHidden(!isPasswordHidden)} />
    </InputAdornment>
  ) : null;

  const passwordFieldCustomClasses = customClasses || {
    root: classes.input_root,
    focused: classes.input_focused,
    input: classes.input,
  };

  return (
    <Field
      component={InputField}
      end={endInput}
      name={name || 'password'}
      typeInput={isPasswordHidden ? 'password' : 'text'}
      fullWidth
      placeholder={placeholder || intl.formatMessage(messages.password)}
      customClasses={passwordFieldCustomClasses}
      customErrorClass={customErrorClass || classes.error_input_join}
      autoComplete={autoComplete}
      onKeyDown={event => {
        if (event.key === 'Enter' && onEnter) {
          event.preventDefault();
          onEnter();
        }
      }}
    />
  );
}

PasswordField.propTypes = {
  intl: intlShape.isRequired,
  password: PropTypes.string,
  autoComplete: PropTypes.string,
  classes: PropTypes.object,
  name: PropTypes.string,
  customClasses: PropTypes.object,
  customErrorClass: PropTypes.object,
  placeholder: PropTypes.any,
  onEnter: PropTypes.func,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(PasswordField);
