import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { AppBar, Grid, withStyles, Tooltip } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { TutorialModal } from 'components/Modals';
import { STUDENT_INSTRUCTIONS_TUTORIAL_KEY } from 'components/Modals/TutorialModal/constants';

import AccuracyTips from 'components/AccuracyTips';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { styles } from './styles';
import messages from '../../messages';
import { makeSelectCurrentUser } from '../../../../App/selectors';

function Header(props) {
  const { classes, history, user } = props;
  const [studentInstructionsIsVisible, setStudentInstructionsIsVisible] = useState(false);
  const tooltip = (
    <div>
      <FormattedMessage {...messages.studentTip} />
      <ul>
        <li>
          <FormattedMessage {...messages.studentTipOne} />
        </li>
        <li>
          <FormattedMessage {...messages.studentTipTwo} />
        </li>
        <li>
          <FormattedMessage {...messages.studentTipThree} />
        </li>
        <li>
          <FormattedMessage {...messages.studentTipFour} />
        </li>
      </ul>
    </div>
  );

  return (
    <AppBar className={classes.app_bar} position="fixed" style={{ backgroundColor: 'white' }}>
      <Grid alignItems="flex-end" container direction="row" justify="space-between" className={classes.preview_header}>
        <Grid item className={classes.header_item}>
          <ArrowBackIcon className={classes.back_icon} onClick={() => history.push(`/`)} />
          <div style={{ color: 'black' }} className={classes.header_title}>
            <FormattedMessage {...messages.genericSheetHeader} />
            <Tooltip
              title={
                <div>
                  <FormattedMessage {...messages.generateSheetModalMessageFirst} />
                  <br />
                  <br />
                  <FormattedMessage {...messages.generateSheetModalMessageSecond} />
                </div>
              }
            >
              <InfoOutlinedIcon className={classes.info_icon} />
            </Tooltip>
          </div>
        </Grid>
      </Grid>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className={classes.student_instructions} onClick={() => setStudentInstructionsIsVisible(true)}>
        <Tooltip title={tooltip} arrow>
          <AccuracyTips
            containerStyles={{ color: 'black' }}
            tooltipMessage={messages.maximizeMCGradingAccuracyInstructions}
          />
        </Tooltip>
      </div>
      {studentInstructionsIsVisible && (
        <TutorialModal
          okCallback={() => setStudentInstructionsIsVisible(false)}
          tutorialKey={STUDENT_INSTRUCTIONS_TUTORIAL_KEY}
          user={user}
        />
      )}
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const withConnect = connect(mapStateToProps);

export default withStyles(styles, withConnect)(Header);
