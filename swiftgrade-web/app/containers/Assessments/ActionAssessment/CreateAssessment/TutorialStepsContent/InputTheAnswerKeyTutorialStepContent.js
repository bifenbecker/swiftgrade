import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const InputTheAnswerKeyTutorialStepContent = ({ classes }) => (
  <div className={classes.tutorial_help}>
    <span>
      <FormattedMessage
        {...messages.inputTheAnswerKeyTutorial}
        values={{
          answers: (
            <span style={{ textDecoration: 'underline' }}>
              <FormattedMessage {...messages.answers} />
            </span>
          ),
        }}
      />
    </span>
    <br />
    <span>
      <FormattedMessage {...messages.giveStudentsQuestions} />
    </span>
  </div>
);

InputTheAnswerKeyTutorialStepContent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(InputTheAnswerKeyTutorialStepContent);
