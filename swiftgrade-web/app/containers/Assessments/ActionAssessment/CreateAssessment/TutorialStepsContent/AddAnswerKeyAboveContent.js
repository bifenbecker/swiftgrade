import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const AddAnswerKeyAboveContent = ({ classes }) => (
  <div className={classes.tutorial_help}>
    <span>
      <FormattedMessage
        {...messages.onceDoneAnswerKey}
        values={{ quote: <span style={{ fontStyle: 'italic' }}>&apos;</span> }}
      />
    </span>
  </div>
);

AddAnswerKeyAboveContent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(AddAnswerKeyAboveContent);
