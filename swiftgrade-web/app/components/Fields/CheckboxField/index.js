import React from 'react';
import PropTypes from 'prop-types';
import MUCheckbox from 'components/Controls/MUCheckbox';

function CheckboxField(props) {
  const { checkboxClasses, disabled, input, label } = props;
  return (
    <MUCheckbox
      checked={input.value}
      checkboxClasses={checkboxClasses}
      disabled={disabled}
      label={label}
      onChange={e => input.onChange(e.target.checked)}
    />
  );
}

CheckboxField.propTypes = {
  checkboxClasses: PropTypes.object,
  disabled: PropTypes.bool,
  input: PropTypes.any,
  label: PropTypes.any,
};

CheckboxField.defaultProps = {
  checkboxClasses: { label: {}, checkbox: {} },
  disabled: false,
};

export default CheckboxField;
