import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

function FractionIcon(props) {
  const { classes, onChangeViewFraction } = props;
  return (
    <div className={classes.fraction_icon} role="button" onClick={() => onChangeViewFraction()} tabIndex={-1}>
      <div className={classes.fraction_icon_value} />
      <div className={classes.fraction_icon_line} />
      <div className={classes.fraction_icon_value} />
    </div>
  );
}

FractionIcon.propTypes = {
  classes: PropTypes.object,
  onChangeViewFraction: PropTypes.func,
};

export default withStyles(styles)(FractionIcon);
