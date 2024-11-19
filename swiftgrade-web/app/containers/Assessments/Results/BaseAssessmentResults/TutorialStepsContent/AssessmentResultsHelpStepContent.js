import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const AssessmentResultsHelpStepContent = ({ classes }) => (
  <div className={classes.tutorial_help}>
    <span className={classes.tutorial_help_title}>
      <FormattedMessage {...messages.needMoreHelp} />
    </span>
    <span>
      <FormattedMessage {...messages.referToHelpSectionInResults} />
    </span>
  </div>
);

AssessmentResultsHelpStepContent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(AssessmentResultsHelpStepContent);
