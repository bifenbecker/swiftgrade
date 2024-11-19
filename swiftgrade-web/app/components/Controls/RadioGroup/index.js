import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, RadioGroup as MaterialRadioGroup, Radio } from '@material-ui/core';

function RadioGroup(props) {
  const { customClasses, input, options, size } = props;
  return (
    <MaterialRadioGroup value={input.value} onChange={(e, value) => input.onChange(value)}>
      {options.map(option => (
        <FormControlLabel
          classes={customClasses}
          disabled={option.disabled || false}
          value={option.value}
          control={<Radio color="primary" size={size} />}
          label={option.label}
        />
      ))}
    </MaterialRadioGroup>
  );
}

RadioGroup.propTypes = {
  customClasses: PropTypes.object,
  options: PropTypes.array,
  input: PropTypes.object,
  size: PropTypes.string,
};

RadioGroup.defaultProps = {
  customClasses: { root: {}, label: {} },
  size: 'medium',
};

export default RadioGroup;
