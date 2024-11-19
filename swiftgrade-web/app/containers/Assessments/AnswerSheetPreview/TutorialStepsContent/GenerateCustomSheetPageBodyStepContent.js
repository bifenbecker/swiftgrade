import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const GenerateCustomSheetPageBodyStepContent = ({ classes }) => (
  <div className={classes.tutorial_modal}>
    <FormattedMessage {...messages.aboutPage} />
  </div>
);

GenerateCustomSheetPageBodyStepContent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(GenerateCustomSheetPageBodyStepContent);
