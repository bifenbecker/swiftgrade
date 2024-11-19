import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const StudentManuallyAddStep = ({ classes }) => (
  <div className={classes.tutorial_student_settings}>
    <FormattedMessage {...messages.manuallyAddTutorialThird} />
    <br />
    <FormattedMessage {...messages.manuallyAddTutorialFourth} />
  </div>
);

StudentManuallyAddStep.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(StudentManuallyAddStep);
