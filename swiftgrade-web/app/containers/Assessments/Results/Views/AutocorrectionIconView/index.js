import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { styles } from './styles';

function AutoCorrectionIconView(props) {
  const { autocorrectTextClass, classes, isShowAutocorrectionIcon, tooltipTitle } = props;

  if (!isShowAutocorrectionIcon) {
    return null;
  }
  return (
    <Tooltip placement="top" title={tooltipTitle} classes={{ tooltip: classes.autocorrection_tooltip }}>
      <div className={classes.autocorrection_icon}>
        <div className={autocorrectTextClass}>AC</div>
      </div>
    </Tooltip>
  );
}

AutoCorrectionIconView.propTypes = {
  autocorrectTextClass: PropTypes.string,
  classes: PropTypes.object,
  isShowAutocorrectionIcon: PropTypes.bool,
  tooltipTitle: PropTypes.any,
};

export default withStyles(styles)(AutoCorrectionIconView);
