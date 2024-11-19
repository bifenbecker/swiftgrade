import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from 'react-compound-timer';
import { FormattedMessage } from 'react-intl';
import { Grid, Tooltip } from '@material-ui/core';
import { IconTimer } from 'components/Svgs';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

const DATA = [
  { key: 'days', component: Timer.Days, message: messages.days },
  { key: 'hours', component: Timer.Hours, message: messages.hrs },
  { key: 'min', component: Timer.Minutes, message: messages.min },
  { key: 'sec', component: Timer.Seconds, message: messages.sec },
];

class TimerDisplay extends Component {
  renderIcon = classes => <IconTimer className={classes.timer_icon} />;

  renderTimerItem = (classes, item) => {
    const TimerItem = item.component;
    return (
      <Grid key={item.key} item className={classes.timer_wrapper}>
        <div className={classes.timer_item_msg}>
          <TimerItem />
        </div>
        <div className={classes.timer_item_msg}>
          <FormattedMessage {...item.message} />
        </div>
      </Grid>
    );
  };

  renderTimer = (classes, limit) => (
    <Tooltip className="tooltip_wrapper" title={<FormattedMessage {...messages.timer} />}>
      <div>
        <Timer
          initialTime={limit * 1000}
          direction="backward"
          checkpoints={[
            {
              time: 0,
              callback: () => {
                this.props.onTimerExpiration();
              },
            },
          ]}
        >
          {() => (
            <Grid container direction="row" justify="space-between" alignItems="center">
              {DATA.map(item => this.renderTimerItem(classes, item))}
            </Grid>
          )}
        </Timer>
      </div>
    </Tooltip>
  );

  render() {
    const { classes, limit } = this.props;
    return (
      <div className={classNames(classes.timer_wrapper, 'default')}>
        {this.renderIcon(classes)}
        {this.renderTimer(classes, limit)}
      </div>
    );
  }
}

TimerDisplay.propTypes = {
  limit: PropTypes.number,
  classes: PropTypes.object,
  onTimerExpiration: PropTypes.func,
};

TimerDisplay.defaultProps = {};

export default withStyles(styles)(TimerDisplay);
