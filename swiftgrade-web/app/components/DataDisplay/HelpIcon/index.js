import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles, Tooltip } from '@material-ui/core/';

import { IconAssessmentHelp } from 'components/Svgs';

import messages from './messages';
import { styles } from './styles';

const HelpIcon = ({ classes, color, tooltipTitle, onClick }) => (
  <div>
    <Tooltip title={tooltipTitle} arrow placement="bottom">
      <div className={classes.helper_icon} onClick={onClick} style={{ color }} role="button" tabIndex={-1}>
        <IconAssessmentHelp />
        <FormattedMessage {...messages.help} />
      </div>
    </Tooltip>
  </div>
);

HelpIcon.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string,
  onClick: PropTypes.func,
  tooltipTitle: PropTypes.any,
};

export default withStyles(styles)(HelpIcon);
