import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { InputField as Input } from 'components/Fields';

function InputField(props) {
  const { customClasses, customErrorClass, fullWidth, name, max, placeholder } = props;
  return (
    <Field
      component={Input}
      customClasses={customClasses}
      customErrorClass={customErrorClass}
      fullWidth={fullWidth}
      max={max}
      name={name}
      placeholder={placeholder}
    />
  );
}

InputField.propTypes = {
  fullWidth: PropTypes.bool,
  name: PropTypes.string,
  max: PropTypes.number,
  placeholder: PropTypes.object,
  customClasses: PropTypes.any,
  customErrorClass: PropTypes.any,
};

InputField.defaultProps = {
  customClasses: null,
  customErrorClass: null,
  fullWidth: false,
  max: 50,
};

export default InputField;
