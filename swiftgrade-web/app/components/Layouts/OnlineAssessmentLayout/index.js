import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppBar, Grid, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { styles } from './styles';
import { IconExit } from '../../Svgs';
import messages from './messages';

function OnlineAssessmentLayout(props) {
  const { assessment, children, classes, group, isMobilePortrait, user } = props;
  const userName = user && (user.first_name || user.last_name) ? `${user.first_name} ${user.last_name}` : null;

  return (
    <AppBar position="relative" style={{ backgroundColor: group.color }}>
      <Grid
        alignItems="stretch"
        container
        direction="column"
        justify="space-between"
        classes={{ container: classNames(classes.header, { isMobilePortrait }) }}
      >
        <Grid xs={6} item className={classNames(classes.header_item, { isMobilePortrait })} justify="flex-start">
          <Tooltip title={<FormattedMessage {...messages.saveAndExitTitle} />} placement="right-end">
            <div className={classes.back_icon_wrapper}>
              <IconExit className={classes.back_icon} tabIndex={-1} onClick={props.onBackButtonClick} />
            </div>
          </Tooltip>
          <div className={classes.header_group_name}>{assessment.name}</div>
          <div className={classes.student_name}>{userName}</div>
        </Grid>
        <Grid xs={6} item className={classes.additional_content_wrapper}>
          {children}
        </Grid>
      </Grid>
    </AppBar>
  );
}

OnlineAssessmentLayout.propTypes = {
  assessment: PropTypes.object,
  children: PropTypes.any,
  classes: PropTypes.object,
  isDirty: PropTypes.bool,
  isMobilePortrait: PropTypes.bool,
  group: PropTypes.object,
  history: PropTypes.object,
  onBackButtonClick: PropTypes.func,
  user: PropTypes.object,
};

OnlineAssessmentLayout.defaultProps = {
  isDirty: false,
  children: null,
};

export default withStyles(styles)(OnlineAssessmentLayout);
