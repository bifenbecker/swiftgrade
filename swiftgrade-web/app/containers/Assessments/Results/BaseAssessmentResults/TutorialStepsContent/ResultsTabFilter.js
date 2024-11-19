import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const ResultsTabFilter = ({ classes }) => (
  <div className={classes.tutorial_help}>
    <div>
      <FormattedMessage {...messages.resultsTabHeaderFilter} />
      <br />
      <br />
      <FormattedMessage {...messages.resultsTabHeaderFilterTwo} />
    </div>
  </div>
);

ResultsTabFilter.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ResultsTabFilter);
