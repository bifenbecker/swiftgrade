import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const SecondResultsFiltersTutorial = ({ classes }) => (
  <div className={classes.tutorial_help}>
    <FormattedMessage {...messages.resultsTabSecondFilters} />
  </div>
);

SecondResultsFiltersTutorial.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SecondResultsFiltersTutorial);
