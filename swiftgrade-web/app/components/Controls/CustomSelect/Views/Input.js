import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment } from '@material-ui/core';
import { IconArrowDropUp } from 'components/Svgs';
import _ from 'lodash';
import { CustomSelectInput } from '../styles';

const STYLE = (iconStyle, transform) => {
  if (_.isObject(iconStyle)) {
    return { ...iconStyle, transform };
  }
  return { color: 'rgba(0, 0, 0, 0.54)', width: 6, height: 6, marginRight: 1, transform };
};

function Input(props) {
  const {
    classes,
    icon,
    iconStyle,
    isOpen,
    params,
    placeholder,
    selectClasses,
    selectInput,
    onMouseDown,
    typeInput,
  } = props;
  const BaseInput = _.isObject(selectInput) ? selectInput : CustomSelectInput;
  const style = isOpen ? STYLE(iconStyle, 'none') : STYLE(iconStyle, 'rotate(180deg)');
  const Icon = _.isNil(icon) ? IconArrowDropUp : icon;
  params.inputProps.tabIndex = -1;
  return (
    <BaseInput
      classes={selectClasses}
      value={placeholder}
      type={typeInput}
      endAdornment={
        <InputAdornment position="end" className={classes.icon_wrapper} ref={params.InputProps.ref}>
          <Icon style={style} />
        </InputAdornment>
      }
      readOnly
      placeholder={placeholder}
      ref={params.InputProps.ref}
      onMouseDown={() => {
        if (!params.disabled) {
          onMouseDown();
        }
      }}
      {...params}
    />
  );
}

Input.propTypes = {
  placeholder: PropTypes.any,
  isOpen: PropTypes.bool,
  icon: PropTypes.any,
  iconStyle: PropTypes.any,
  selectInput: PropTypes.any,
  classes: PropTypes.object,
  params: PropTypes.object,
  onMouseDown: PropTypes.func,
  selectClasses: PropTypes.any,
  typeInput: PropTypes.any,
};

export default Input;
