import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import messages from './messages';
import { styles } from './styles';

const ResultsSavingStatus = ({ classes, group, loading, isSaved, isMobile }) => {
  let statusMessage;

  if (loading) {
    statusMessage = messages.saving;
  } else if (isSaved) {
    statusMessage = messages.allChangesSaved;
  }

  if (statusMessage) {
    return (
      <span
        className={classNames(classes.saving_title, { isMobile })}
        style={{ color: isMobile ? 'white' : group.color }}
      >
        <FormattedMessage {...statusMessage} />
      </span>
    );
  }

  return <></>;
};

ResultsSavingStatus.propTypes = {
  classes: PropTypes.object,
  group: PropTypes.object,
  loading: PropTypes.bool,
  isSaved: PropTypes.bool,
  isMobile: PropTypes.bool,
};

export default withStyles(styles)(ResultsSavingStatus);
