import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select as MaterialSelect } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import _ from 'lodash';
import { MenuProps, SelectInput } from './styles';

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  getStyle = value => {
    const { multiple, value: values } = this.props;

    if (multiple && _.isArray(values)) {
      const index = values.findIndex(v => v === value);
      return index >= 0 ? { background: '#64b5f6' } : {};
    }

    return {};
  };

  getStyleDetails = () => {
    const { coefficient, keyName } = this.props;

    const anchorOrigin = { vertical: 'bottom', horizontal: 'center' };
    const transformOrigin = { vertical: 'top', horizontal: 'center' };

    const elem = document.getElementById(keyName);

    let maxHeight = window.innerHeight * coefficient;

    if (!_.isNull(elem)) {
      const top = Number(elem.offsetTop);
      const bottom = window.innerHeight + elem.offsetHeight - top;

      if (keyName === 'add-row') {
        if (top > bottom) {
          anchorOrigin.vertical = 'top';
          transformOrigin.vertical = 'bottom';
          maxHeight = top;
        } else {
          maxHeight = bottom;
        }
      }
    }
    return { maxHeight, anchorOrigin, transformOrigin };
  };

  render() {
    const {
      classes,
      keyName,
      options,
      optionProps,
      selectInput,
      selectRootClass,
      value,
      iconColor,
      iconSize,
      ...other
    } = this.props;
    const input = _.isObject(selectInput) ? selectInput : <SelectInput />;
    const styleDetails = this.getStyleDetails();
    const { isOpen } = this.state;
    return (
      <MaterialSelect
        input={input}
        MenuProps={MenuProps(styleDetails)}
        value={value}
        classes={{ root: selectRootClass }}
        onOpen={() => this.setState({ isOpen: !isOpen })}
        onClose={() => this.setState({ isOpen: !isOpen })}
        IconComponent={() => (
          <ArrowDropDownIcon
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              right: 0,
              fontSize: iconSize,
              color: iconColor,
              transform: isOpen && 'rotate(180deg)',
            }}
          />
        )}
        {...other}
      >
        {options.map(option => (
          <MenuItem key={option.key} value={option.value} style={this.getStyle(option.value)} {...optionProps}>
            {option.label}
          </MenuItem>
        ))}
      </MaterialSelect>
    );
  }
}

Select.propTypes = {
  coefficient: PropTypes.number,
  keyName: PropTypes.string,
  value: PropTypes.any,
  multiple: PropTypes.bool,
  options: PropTypes.array,
  classes: PropTypes.object,
  optionProps: PropTypes.object,
  selectInput: PropTypes.object,
  onChange: PropTypes.func,
  selectRootClass: PropTypes.any,
  iconSize: PropTypes.any,
  iconColor: PropTypes.string,
};

Select.defaultProps = {
  coefficient: 0.8,
  keyName: 'default',
  multiple: false,
  optionProps: {},
  options: [{ label: 'Ten', value: 10 }, { label: 'Twenty', value: 20 }, { label: 'Thirty', value: 30 }],
  selectInput: null,
  value: 10,
  iconSize: '1.5rem',
  iconColor: 'rgba(0, 0, 0, 0.54)',
};

export default Select;
