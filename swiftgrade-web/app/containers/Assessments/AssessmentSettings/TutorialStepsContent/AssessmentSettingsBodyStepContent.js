import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const AssessmentSettingsBodyStepContent = ({ classes }) => (
  <div className={classes.tutorial_assessment_settings}>
    <span className={classes.tutorial_assessment_settings_block_with_margin}>
      <FormattedMessage {...messages.aboutPage} />
    </span>
  </div>
);

AssessmentSettingsBodyStepContent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(AssessmentSettingsBodyStepContent);
