import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

function Answer(props) {
  const { answer, classes } = props;
  return (
    <div className={classes.answer_content}>
      <div className={classes.symbol}>=</div>
      <div className={classes.answer_item}>{String(answer)}</div>
    </div>
  );
}

Answer.propTypes = {
  answer: PropTypes.any,
  classes: PropTypes.object,
};

export default withStyles(styles)(Answer);
