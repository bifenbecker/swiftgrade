import React from 'react';
import PropTypes from 'prop-types';
import MUCheckbox from 'components/Controls/MUCheckbox';
import _ from 'lodash';

class CheckboxGroupField extends React.Component {
  onChange = (e, key) => {
    const { input } = this.props;
    const value = input.value && input.value.toJS ? _.cloneDeep(input.value.toJS()) : _.cloneDeep(input.value);
    if (e.target.checked) {
      value.push(key);
    } else {
      const index = value.indexOf(key);
      value.splice(index, 1);
    }
    input.onChange(value);
  };

  render() {
    const { checkboxClasses, input, optionsList } = this.props;
    return optionsList.map(item => (
      <MUCheckbox
        label={item.label}
        checked={input.value && input.value.includes(item.key)}
        checkboxClasses={checkboxClasses}
        onChange={e => this.onChange(e, item.key)}
      />
    ));
  }
}

CheckboxGroupField.propTypes = {
  checkboxClasses: PropTypes.object,
  optionsList: PropTypes.array,
  input: PropTypes.any,
};

CheckboxGroupField.defaultProps = {
  optionsList: [],
  checkboxClasses: { label: {}, checkbox: {} },
};

export default CheckboxGroupField;
