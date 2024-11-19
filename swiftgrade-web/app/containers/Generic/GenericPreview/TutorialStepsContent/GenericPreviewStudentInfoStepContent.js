import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const GenericPreviewStudentInfoStepContent = ({ classes }) => (
  <div className={classes.tutorial_modal}>
    <div className={classes.tutorial_modal_body}>
      <FormattedMessage {...messages.inputStudentPreFillInstructionOne} />
      <br />
      <br />
      <FormattedMessage {...messages.inputStudentPreFillInstructionTwo} />
    </div>
  </div>
);

GenericPreviewStudentInfoStepContent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(GenericPreviewStudentInfoStepContent);
