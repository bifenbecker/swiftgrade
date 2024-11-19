import React from 'react';
import PropTypes from 'prop-types';
import WarningIcon from '@material-ui/icons/Warning';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from '../../messages';

function WarningView(props) {
  const { classes } = props;
  const msg = <FormattedMessage {...messages.answerError} />;
  return (
    <Tooltip title={msg} placement="left" arrow classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}>
      <WarningIcon className={classes.warning_icon} />
    </Tooltip>
  );
}

WarningView.propTypes = {
  isError: PropTypes.bool,
  classes: PropTypes.object,
  meta: PropTypes.object,
};

export default withStyles(styles)(WarningView);
