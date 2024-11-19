import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

function EmailMessage(props) {
  const { classes, isEmailMsg } = props;
  if (isEmailMsg) {
    return (
      <Grid item xs={12} className={classes.email_msg}>
        <FormattedMessage {...messages.emailSentSuccessfullyMsg} />
      </Grid>
    );
  }
  return null;
}

EmailMessage.propTypes = {
  isEmailMsg: PropTypes.bool,
  classes: PropTypes.object,
};

export default compose(withStyles(styles))(EmailMessage);
