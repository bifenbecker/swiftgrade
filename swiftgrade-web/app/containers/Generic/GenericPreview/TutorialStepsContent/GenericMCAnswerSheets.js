import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const GenericMCAnswerSheets = ({ classes }) => (
  <div className={classes.tutorial_modal}>
    <div className={classes.tutorial_modal_body}>
      <FormattedMessage {...messages.mcSheetsModalMessageFirst} />
      <br />
      <br />
      <FormattedMessage {...messages.mcSheetsModalMessageSecond} />
    </div>
  </div>
);

GenericMCAnswerSheets.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(GenericMCAnswerSheets);
