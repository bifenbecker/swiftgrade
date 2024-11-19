import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../../../Assessments/AssessmentSettings/messages';
import { styles } from '../../../Assessments/AssessmentSettings/styles';

const GenericPreviewCustomize = ({ classes }) => (
  <div className={classes.tutorial_assessment_settings}>
    <span className={classes.tutorial_assessment_settings_title}>
      <FormattedMessage {...messages.attachAssessmentCustomizeTitle} />
    </span>

    <div className={classes.tutorial_assessment_settings_body}>
      <FormattedMessage {...messages.attachAssessmentCustomizeDescription} />
    </div>
  </div>
);

GenericPreviewCustomize.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(GenericPreviewCustomize);
