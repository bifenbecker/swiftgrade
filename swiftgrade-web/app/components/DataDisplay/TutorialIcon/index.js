import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles, Tooltip } from '@material-ui/core/';

import { IconTutorial } from 'components/Svgs';

import messages from './messages';
import { styles } from './styles';

const TutorialIcon = ({ classes, color, onClick, tooltipTitle }) => (
  <div>
    <Tooltip title={tooltipTitle} arrow placement="bottom">
      <div className={classes.helper_icon} onClick={onClick} style={{ color }} role="button" tabIndex={-1}>
        <IconTutorial />
        <FormattedMessage {...messages.tooltipIcon} />
      </div>
    </Tooltip>
  </div>
);

TutorialIcon.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string,
  onClick: PropTypes.func,
  tooltipTitle: PropTypes.object,
};

export default withStyles(styles)(TutorialIcon);
