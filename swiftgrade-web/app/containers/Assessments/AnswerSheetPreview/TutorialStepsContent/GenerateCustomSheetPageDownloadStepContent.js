import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const GenerateCustomSheetPageDownloadStepContent = ({ classes }) => (
  <div className={classes.tutorial_modal}>
    <FormattedMessage {...messages.downloadAnswerSheetBody} />
  </div>
);

GenerateCustomSheetPageDownloadStepContent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(GenerateCustomSheetPageDownloadStepContent);
