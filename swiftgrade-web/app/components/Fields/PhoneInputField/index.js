import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import PhoneInput from 'react-phone-input-2';

import { withStyles } from '@material-ui/core/styles';
import { getSelectionValue } from 'utils/helpers/assessments';

import { styles } from './styles';
import 'react-phone-input-2/lib/material.css';
import './styles.scss';

class PhoneInputField extends React.Component {
  onChange = value => {
    const { input } = this.props;

    input.onChange(value);
  };

  onKeyDown = e => {
    const { input, max } = this.props;
    const count = input.value.length;
    const selectedValue = getSelectionValue(`input_field_${input.name}`);
    if (
      max &&
      count - selectedValue.length >= max &&
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key) &&
      !(e.metaKey || e.ctrlKey)
    ) {
      e.preventDefault();
      return false;
    }
  };

  onPaste = e => {
    const { input, max } = this.props;
    const inputData = input.value;
    const selectedValue = getSelectionValue(`input_field_${input.name}`);
    const clipboardData = e.clipboardData.getData('text');

    if (max && inputData.toString().length + clipboardData.length - selectedValue.length > max) {
      e.preventDefault();
      return false;
    }
  };

  onFocus = e => {
    const { autoSelect } = this.props;
    if (autoSelect) {
      e.currentTarget.select();
    }
  };

  render() {
    const {
      autoComplete,
      classes,
      customClasses,
      customErrorClass,
      disabled,
      end,
      input,
      meta,
      typeInput,
      withBorder,
      ...other
    } = this.props;
    let classesData = withBorder ? { root: classes.root, input: classes.input_e } : {};
    if (!_.isNull(customClasses)) {
      classesData = customClasses;
    }

    return (
      <Fragment>
        <PhoneInput
          country="ca"
          className={classesData}
          type={typeInput}
          value={input.value}
          disabled={disabled}
          onChange={e => this.onChange(e)}
          onKeyDown={e => this.onKeyDown(e)}
          onFocus={e => this.onFocus(e)}
          {...other}
        />
      </Fragment>
    );
  }
}

PhoneInputField.propTypes = {
  autoComplete: PropTypes.string,
  autoSelect: PropTypes.bool,
  customClasses: PropTypes.any,
  customErrorClass: PropTypes.any,
  end: PropTypes.any,
  max: PropTypes.any,
  typeInput: PropTypes.any,
  disabled: PropTypes.bool,
  withBorder: PropTypes.bool,
  classes: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
};

PhoneInputField.defaultProps = {
  autoComplete: 'off',
  customClasses: null,
  customErrorClass: null,
  end: null,
  max: null,
  typeInput: null,
  withBorder: true,
  disabled: false,
};

export default withStyles(styles)(PhoneInputField);
