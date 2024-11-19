import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles, Tooltip } from '@material-ui/core/';

import { IconAssessmentKeyboardShortcuts } from 'components/Svgs';

import messages from './messages';
import { styles } from './styles';

const KeyboardShortcutsIcon = ({ classes, color, onClick }) => (
  <div>
    <Tooltip title={<FormattedMessage {...messages.keyboardShortcuts} />} arrow placement="bottom">
      <div className={classes.helper_icon} onClick={onClick} style={{ color }} role="button" tabIndex={-1}>
        <IconAssessmentKeyboardShortcuts />
        <FormattedMessage {...messages.shortcuts} />
      </div>
    </Tooltip>
  </div>
);

KeyboardShortcutsIcon.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default withStyles(styles)(KeyboardShortcutsIcon);
