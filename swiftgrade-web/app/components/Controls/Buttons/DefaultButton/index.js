/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

import { useStyles } from './styles';

function DefaultButton(props) {
  const { className, customClasses, disabled, icon, onClick, tabIndex, type, onMouseDown, ...other } = props;
  const classes = useStyles(other);
  return (
    <Button
      className={classNames(classes.default, className)}
      classes={customClasses}
      disabled={disabled}
      type={type}
      onClick={onClick}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      tabIndex={tabIndex}
      onMouseDown={() => {
        if (_.isFunction(onMouseDown)) {
          onMouseDown();
        }
      }}
    >
      {props.text}
    </Button>
  );
}

DefaultButton.propTypes = {
  className: PropTypes.any,
  customClasses: PropTypes.object,
  tabIndex: PropTypes.any,
  disabled: PropTypes.bool,
  borderRadius: PropTypes.number,
  /** The text for the button */
  text: PropTypes.any,
  type: PropTypes.string,
  /** The color for the button */
  backgroundColor: PropTypes.string,
  /** The color of the text for the button */
  color: PropTypes.string,
  /**  */
  icon: PropTypes.object,
  startIcon: PropTypes.object,
  endIcon: PropTypes.object,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
};

DefaultButton.defaultProps = {
  backgroundColor: 'grey',
  borderRadius: 0,
  color: 'grey',
  customClasses: null,
  endIcon: null,
  icon: null,
  onMouseDown: null,
  startIcon: null,
  text: 'Button text',
  type: 'button',
};

export default DefaultButton;
