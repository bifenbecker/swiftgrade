/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { IconButton as Button } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './styles';

function IconButton(props) {
  const { disabled, onClick, className } = props;
  const classes = useStyles(props);
  return (
    <Button className={classNames(classes.default, className)} disabled={disabled} onClick={onClick} tabIndex={-1}>
      {props.icon}
    </Button>
  );
}

IconButton.propTypes = {
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.any,
};

IconButton.defaultProps = {
  backgroundColor: 'grey',
  color: 'grey',
};

export default IconButton;
