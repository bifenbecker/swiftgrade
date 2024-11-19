import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const AssessmentSettingsAttachmentsStepContent = ({ classes }) => (
  <div className={classes.tutorial_assessment_settings}>
    <FormattedMessage {...messages.attachFiles} />
    <ul className={classes.tutorial_assessment_settings_body}>
      <li>
        <FormattedMessage {...messages.quizeAndFormulaSheet} />
      </li>
      <li>
        <FormattedMessage {...messages.pdfAndWord} />
      </li>
      <li>
        <FormattedMessage {...messages.otherFileTypes} />
      </li>
    </ul>
  </div>
);

AssessmentSettingsAttachmentsStepContent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(AssessmentSettingsAttachmentsStepContent);
