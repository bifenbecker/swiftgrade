import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import messages from './messages';

const TIMER_DATA = [
  { key: 'days', message: messages.days },
  { key: 'hours', message: messages.hrs },
  { key: 'min', message: messages.min },
];

function TableTimeLimitView(props) {
  const { classes, text, value } = props;

  return (
    <Fragment>
      {value.is_timer ? (
        <Grid container direction="row" justify="center" alignItems="center">
          {TIMER_DATA.map(item => (
            <Grid key={item.key} item className={classes.timer_wrapper}>
              <div className={classes.timer_item_value}>{text[item.key]}</div>
              <div className={classes.timer_item_msg}>
                <FormattedMessage {...item.message} />
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        'N/A'
      )}
    </Fragment>
  );
}

TableTimeLimitView.propTypes = {
  classes: PropTypes.object,
  text: PropTypes.string,
  value: PropTypes.object,
};

export default TableTimeLimitView;
