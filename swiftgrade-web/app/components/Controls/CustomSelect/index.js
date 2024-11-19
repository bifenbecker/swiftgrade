/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { ClickAwayListener } from '@material-ui/core';
import _ from 'lodash';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import Input from './Views/Input';
import Option from './Views/Option';

import messages from './messages';

class CustomSelect extends React.Component {
  constructor(props) {
    super(props);

    this.data = {
      // disabled: props.disabled,
      id: props.id,
      value: props.value,
    };
    this.state = {
      isOpen: false,
      isScroll: false,
    };
  }

  componentDidMount() {
    const { id, options } = this.props;
    const isWindows = navigator.platform.toLowerCase().indexOf('win') > -1;

    if (id) {
      const optionsHeight = options ? 22 * options.length : null;
      const maxDropdownHeight = this.getStyle(id).maxHeight;

      this.setState({ isOpen: this.props.isOpen, isScroll: maxDropdownHeight < optionsHeight && isWindows });
    } else {
      this.setState({ isOpen: this.props.isOpen });
    }
  }

  getStyle = id => {
    const { multiple } = this.props;
    const elem = document.getElementById(id);
    const defaultStyle = {
      maxHeight: 350,
      padding: '4px 0',
      overflow: 'auto',
      listStyle: 'none',
      zIndex: 10000,
      fontSize: window.outerWidth < 450 || window.outerHeight < 450 ? 13 : 14,
    };
    if (!_.isNull(elem)) {
      const { top, height } = elem.getBoundingClientRect();
      const bottom = window.innerHeight - height - top - 20;
      if (multiple) {
        defaultStyle.maxHeight = '65vh';
      } else {
        defaultStyle.maxHeight = top > bottom ? top : bottom - 20;
      }
    }
    return defaultStyle;
  };

  onChange = value => {
    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(value);
    }
  };

  renderInput = params => {
    const { classes, icon, iconStyle, id, intl, selectInput, value, selectClasses, inputTypeItem } = this.props;
    const { isOpen } = this.state;

    let placeholder = '';
    if (id === 'add-row-actions') {
      placeholder =
        value.length === 1
          ? intl.formatMessage(messages.addRowValue)
          : intl.formatMessage(messages.addRowsValue, { count: value.length });
    }
    return (
      <Input
        classes={classes}
        icon={icon}
        iconStyle={iconStyle}
        id={id}
        isOpen={isOpen}
        params={params}
        placeholder={placeholder}
        selectClasses={selectClasses}
        selectInput={selectInput}
        typeInput={inputTypeItem}
        onMouseDown={() => {
          if (id === 'add-row-actions') {
            this.setState({ isOpen: true });
          } else {
            this.setState({ isOpen: !isOpen });
          }
        }}
      />
    );
  };

  renderInputValue = value => {
    const { id, intl, options, isLabel } = this.props;
    const item = options.find(option => option.value === value);

    if (_.isObject(item)) {
      if (id === 'tolerance') {
        return `${value}%`;
      }
      const label = isLabel ? item.label : item.value;
      return _.has(item, 'message') ? intl.formatMessage(item.message) : label;
    }
    return '';
  };

  renderOption = (option, value, isWindows) => {
    const { classes, id, intl, optionProps } = this.props;
    const { isScroll } = this.state;

    return (
      <Option
        classes={classes}
        id={id}
        intl={intl}
        isScroll={isScroll}
        isWindows={isWindows}
        option={option}
        optionProps={optionProps}
        value={value}
      />
    );
  };

  renderAddRowSelect = (classes, id, isOpen, optionProps, value) => (
    <ClickAwayListener onClickAway={() => this.props.onClose()}>
      <Autocomplete
        {...this.props}
        filterOptions={data => data}
        ListboxProps={{ style: this.getStyle(id) }}
        multiple
        open
        classes={{ paper: classes.paper, ...optionProps.classes }}
        getOptionLabel={option => String(option.value)}
        getOptionSelected={(option, v) => String(option.value) === String(v)}
        renderInput={params => this.renderInput(params)}
        renderOption={option => this.renderOption(option, value)}
      />
    </ClickAwayListener>
  );

  render() {
    const {
      classes,
      disabled,
      id,
      isBlurOnSelect,
      maxWidth,
      options,
      optionProps,
      value,
      customPoperClass,
      popperComponent,
    } = this.props;
    const { isOpen, isScroll } = this.state;

    if (id === 'add-row-actions') {
      return this.renderAddRowSelect(classes, id, isOpen, optionProps, value);
    }

    const isWindows = navigator.platform.toLowerCase().indexOf('win') > -1;
    let paperClassName = classes.paper;
    if (maxWidth || (isWindows && id.includes('marks') && isScroll)) {
      paperClassName = maxWidth ? classes.paper_with_max_width : classes.paper_with_expended_width;
    }

    const defaultClasses = { paper: paperClassName, ...optionProps.classes };
    if (customPoperClass) {
      defaultClasses.popper = customPoperClass;
    }

    return (
      <Autocomplete
        blurOnSelect={isBlurOnSelect}
        classes={defaultClasses}
        disabled={disabled}
        PopperComponent={popperComponent}
        filterOptions={data => data}
        inputValue={this.renderInputValue(value)}
        ListboxProps={{ style: this.getStyle(id) }}
        open={isOpen}
        options={options}
        renderInput={params => this.renderInput(params)}
        renderOption={option => this.renderOption(option, value, isWindows)}
        getOptionLabel={option => String(option.value)}
        getOptionSelected={option => String(option.value) === String(value)}
        onChange={(e, option) => this.onChange(option.value)}
        onClose={() => this.setState({ isOpen: false })}
        onOpen={() => {
          if (_.isFunction(this.props.onOpen)) {
            this.props.onOpen();
          }
          this.setState({ isOpen: true });
        }}
        {...this.data}
      />
    );
  }
}

CustomSelect.propTypes = {
  intl: intlShape.isRequired,
  disabled: PropTypes.bool,
  isBlurOnSelect: PropTypes.bool,
  isLabel: PropTypes.bool,
  isOpen: PropTypes.bool,
  maxWidth: PropTypes.bool,
  multiple: PropTypes.bool,
  iconStyle: PropTypes.any,
  selectClasses: PropTypes.any,
  value: PropTypes.any,
  id: PropTypes.string,
  multipleRows: PropTypes.array,
  options: PropTypes.array,
  classes: PropTypes.object,
  optionProps: PropTypes.object,
  selectInput: PropTypes.object,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  customPoperClass: PropTypes.any,
  popperComponent: PropTypes.any,
  inputTypeItem: PropTypes.any,
  icon: PropTypes.any,
};

CustomSelect.defaultProps = {
  isBlurOnSelect: false,
  isLabel: true,
  disabled: false,
  icon: null,
  iconStyle: null,
  id: 'custom-select',
  isOpen: false,
  maxWidth: false,
  onClose: null,
  onOpen: null,
  optionProps: { actions: {}, classes: {}, style: {} },
  options: [{ key: 'ten', label: 'Ten', value: 10 }, { key: 'twenty', label: 'Twenty', value: 20 }],
  selectInput: null,
  value: 10,
  customPoperClass: null,
  popperComponent: undefined,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(CustomSelect);
