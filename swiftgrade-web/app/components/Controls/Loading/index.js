import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    color: '#695eff',
  },
};

function Loading(props) {
  const { classes, ...other } = props;
  return (
    <div className={classes.root}>
      <CircularProgress {...other} />
    </div>
  );
}

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  classes: PropTypes.object.isRequired,
};

Loading.defaultProps = {
  size: 50,
  color: '#695eff',
};

export default withStyles(styles)(Loading);
