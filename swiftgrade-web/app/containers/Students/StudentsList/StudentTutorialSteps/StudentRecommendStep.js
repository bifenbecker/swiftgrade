import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const StudentRecommendStep = ({ classes }) => (
  <div className={classes.tutorial_student_settings}>
    <FormattedMessage {...messages.addStudentsTabRecommend} />

    <ul className={classes.tutorial_student_settings_body}>
      <li>
        <FormattedMessage {...messages.addStudentsRecommendOne} />
      </li>
      <li>
        <FormattedMessage {...messages.addStudentsRecommendTwo} />
      </li>
      <li>
        <FormattedMessage {...messages.addStudentsRecommendThree} />
      </li>
    </ul>
  </div>
);

StudentRecommendStep.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(StudentRecommendStep);
