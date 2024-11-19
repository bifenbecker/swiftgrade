import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@material-ui/core';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { getSelectionValue } from 'utils/helpers/assessments';
import { styles } from './styles';

class InputField extends React.Component {
  onChange = e => {
    const { input } = this.props;
    const { value } = e.target;

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
    const isError = meta.touched && meta.invalid;

    let classesData = withBorder ? { root: classes.root, input: classes.input_e } : {};
    if (!_.isNull(customClasses)) {
      classesData = customClasses;
    }

    return (
      <Fragment>
        <Input
          autoComplete={autoComplete}
          classes={classesData}
          disabled={disabled}
          disableUnderline
          id={`input_field_${input.name}`}
          type={typeInput}
          value={input.value}
          onChange={e => this.onChange(e)}
          onBlur={() => input.onBlur()}
          onKeyDown={e => this.onKeyDown(e)}
          onPaste={e => this.onPaste(e)}
          onFocus={e => this.onFocus(e)}
          endAdornment={end}
          {...other}
        />
        {isError && <div className={customErrorClass || classes.error}>{meta.error}</div>}
      </Fragment>
    );
  }
}

InputField.propTypes = {
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

InputField.defaultProps = {
  autoComplete: 'off',
  customClasses: null,
  customErrorClass: null,
  end: null,
  max: null,
  typeInput: null,
  withBorder: true,
  disabled: false,
};

export default withStyles(styles)(InputField);
