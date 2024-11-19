import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const HelpTutorialAssessment = ({ classes }) => (
  <div className={classes.tutorial_help}>
    <span>
      <FormattedMessage {...messages.clickMoreHelp} />
    </span>
  </div>
);

HelpTutorialAssessment.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HelpTutorialAssessment);
