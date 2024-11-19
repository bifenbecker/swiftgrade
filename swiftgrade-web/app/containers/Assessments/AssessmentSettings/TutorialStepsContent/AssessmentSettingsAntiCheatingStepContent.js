import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const AssessmentSettingsAntiCheatingStepContent = ({ classes }) => (
  <div className={classes.tutorial_assessment_settings}>
    <span className={classes.tutorial_assessment_settings_block_with_margin}>
      <FormattedMessage {...messages.onlyCurrentAnswerIsVisible} />
    </span>
    <FormattedMessage {...messages.antiGlancingProtection} />
  </div>
);

AssessmentSettingsAntiCheatingStepContent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(AssessmentSettingsAntiCheatingStepContent);
