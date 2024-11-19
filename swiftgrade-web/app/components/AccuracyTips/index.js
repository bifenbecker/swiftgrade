import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { IconAccuracyTips } from 'components/Svgs';

import messages from './messages';
import { styles } from './styles';

const AccuracyTips = ({ classes, containerStyles, onClick, tooltipMessage }) => (
  <div className={classes.accuracy_tips_container} style={containerStyles}>
    <Tooltip title={<FormattedMessage {...tooltipMessage} />}>
      <div className={classes.accuracy_tips_body} onClick={onClick} role="button" tabIndex={-1}>
        <IconAccuracyTips />
        <FormattedMessage {...messages.accuracyTips} />
      </div>
    </Tooltip>
  </div>
);

AccuracyTips.propTypes = {
  classes: PropTypes.object,
  containerStyles: PropTypes.object,
  onClick: PropTypes.func,
  tooltipMessage: PropTypes.object,
};

AccuracyTips.defaultProps = {
  containerStyles: {},
  onClick: () => {},
};

export default withStyles(styles)(AccuracyTips);
