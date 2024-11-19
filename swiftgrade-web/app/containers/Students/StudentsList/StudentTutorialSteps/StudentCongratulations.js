import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { Balloons } from 'images';

import messages from '../messages';
import { styles } from '../styles';

const StudentCongratulations = ({ classes }) => (
  <div className={classes.tutorial_student_settings}>
    <span>
      <FormattedMessage {...messages.addStudentsCongratulations} />
    </span>
    <br />
    <div className={classes.students_congratulations}>
      <img src={Balloons} alt="" />
    </div>
  </div>
);

StudentCongratulations.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(StudentCongratulations);
