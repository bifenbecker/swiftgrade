import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles, Tooltip } from '@material-ui/core/';

import { IconDownloadResults } from 'components/Svgs';

import messages from './messages';
import { styles } from './styles';

const DownloadGradesView = props => {
  const { classes, color, onClick } = props;
  return (
    <div className={classes.download_grades_button_wrapper}>
      <Tooltip arrow title={<FormattedMessage {...messages.downloadResults} />}>
        <div role="button">
          <IconDownloadResults color={color} className={classes.download_button} onClick={onClick} />
        </div>
      </Tooltip>
    </div>
  );
};

DownloadGradesView.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default withStyles(styles)(DownloadGradesView);
