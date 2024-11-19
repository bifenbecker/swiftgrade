/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { IconButton as Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import classNames from 'classnames';

import { useStyles } from './styles';

function IconButton(props) {
  const { className, disabled, onClick, tabIndex, style } = props;
  const classes = useStyles(props);
  return (
    <Button
      className={classNames(classes.default, className)}
      disabled={disabled}
      onClick={onClick}
      tabIndex={tabIndex}
      style={style}
      {...props}
    >
      {props.icon}
    </Button>
  );
}

IconButton.propTypes = {
  disabled: PropTypes.bool,
  /** The color for the button * */
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  /** The color of the text for the button * */
  color: PropTypes.string,
  /** The icon for the button * */
  icon: PropTypes.object,
  id: PropTypes.string,
  /**  */
  onClick: PropTypes.func,
  tabIndex: PropTypes.any,
  style: PropTypes.object,
};

IconButton.defaultProps = {
  backgroundColor: 'grey',
  color: 'grey',
  disabled: false,
  icon: <HomeIcon style={{ fontSize: 20, marginRight: 4 }} />,
};

export default IconButton;
