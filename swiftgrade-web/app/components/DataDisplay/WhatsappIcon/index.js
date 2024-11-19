import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles, Tooltip } from '@material-ui/core/';

import { IconWhatsapp } from 'components/Svgs';

import messages from './messages';
import { styles } from './styles';

const WhatsappIcon = ({ classes, color, onClick, tooltipTitle }) => (
  <Tooltip title={tooltipTitle} arrow placement="bottom">
    <div className={classes.whatsapp_icon} onClick={onClick} style={{ color }} role="button" tabIndex={-1}>
      <IconWhatsapp />
      <FormattedMessage {...messages.tooltipIcon} />
    </div>
  </Tooltip>
);

WhatsappIcon.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string,
  onClick: PropTypes.func,
  tooltipTitle: PropTypes.object,
};

export default withStyles(styles)(WhatsappIcon);
