import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const CreateAnswerKeyTutorialStepContent = ({ classes }) => (
  <div className={classes.tutorial_help}>
    <span>
      <FormattedMessage {...messages.createAnswerKeyTutorial} />
    </span>
  </div>
);

CreateAnswerKeyTutorialStepContent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(CreateAnswerKeyTutorialStepContent);
