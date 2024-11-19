import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

function FractionContent(props) {
  const { data, classes } = props;
  return (
    <div className={classes.fraction_content}>
      <div className={classes.symbol}>=</div>
      <div className={classes.fraction_item}>
        {data.s === -1 && <div className={classes.symbol}>-</div>}
        <div className={classes.fraction_item_value}>
          <div className={classes.fraction_item_value_n}>{data.n}</div>
          <div>{data.d}</div>
        </div>
      </div>
    </div>
  );
}

FractionContent.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
};

export default withStyles(styles)(FractionContent);
