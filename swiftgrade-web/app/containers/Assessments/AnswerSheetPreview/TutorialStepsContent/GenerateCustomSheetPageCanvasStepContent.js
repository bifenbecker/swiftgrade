import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { styles } from '../styles';

const GenerateCustomSheetPageCanvasStepContent = ({ classes }) => {
  const spanText = (
    <u>
      <FormattedMessage {...messages.only} />
    </u>
  );

  return (
    <div className={classes.tutorial_custom_pdf}>
      <FormattedMessage {...messages.ASCompatibilityWarning} values={{ only: spanText }} />
    </div>
  );
};

GenerateCustomSheetPageCanvasStepContent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(GenerateCustomSheetPageCanvasStepContent);
