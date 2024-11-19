import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const StudentClassStep = ({ classes }) => (
  <div className={classes.tutorial_student_settings}>
    <FormattedMessage {...messages.portalStudentsClassOne} />
  </div>
);

StudentClassStep.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(StudentClassStep);
