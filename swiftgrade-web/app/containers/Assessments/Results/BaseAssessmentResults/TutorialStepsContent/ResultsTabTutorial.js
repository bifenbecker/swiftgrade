import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const ResultsTabTutorial = ({ classes }) => (
  <div className={classes.tutorial_help}>
    <span>
      <FormattedMessage {...messages.resultsTabDescription} />
    </span>
  </div>
);

ResultsTabTutorial.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ResultsTabTutorial);
