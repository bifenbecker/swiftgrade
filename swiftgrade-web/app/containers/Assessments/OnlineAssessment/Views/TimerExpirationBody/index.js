import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { DefaultButton } from 'components/Controls';
import { styles } from './styles';
import messages from './messages';

function TimerExpirationBody(props) {
  const { classes, color, onClick } = props;
  return (
    <Fragment>
      <div className={classes.out_of_time_body}>
        <FormattedMessage {...messages.outOfTimeBody} />
      </div>
      <div className={classes.okay_btn}>
        <DefaultButton
          backgroundColor={color}
          borderRadius={4}
          text={<FormattedMessage {...messages.okay} />}
          onClick={onClick}
        />
      </div>
    </Fragment>
  );
}

TimerExpirationBody.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default withStyles(styles)(TimerExpirationBody);
