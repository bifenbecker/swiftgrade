import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const RepeatAnswersAssessmentContent = ({ classes }) => (
  <div className={classes.tutorial_help}>
    <span>
      <FormattedMessage
        {...messages.repeatUntilAnswersAssessment}
        values={{ quote: <span style={{ fontStyle: 'italic' }}>&apos;</span> }}
      />
    </span>
  </div>
);

RepeatAnswersAssessmentContent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(RepeatAnswersAssessmentContent);
