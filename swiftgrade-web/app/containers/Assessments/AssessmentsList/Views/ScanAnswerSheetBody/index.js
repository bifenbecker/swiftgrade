import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { LottieAndPlayerModalBody } from 'components/Modals/TutorialModal/Views';
import messages from './messages';
import { styles } from './styles';

function ScanAnswerSheetBody(props) {
  const { classes, group, isButtonActive, tutorialKey, onClose } = props;
  return (
    <div className={classes.body_container}>
      <LottieAndPlayerModalBody
        group={group}
        lottieHeight="100%"
        lottieWidth="100%"
        parentClasses={props.classes}
        showModal={props.showModal}
        tutorialKey={tutorialKey}
        onCloseInternalModal={props.onClose}
      />
      {isButtonActive && (
        <div className={classes.ok_btn_wrap}>
          <a role="button" tabIndex={-1} className={classes.got_btn} onClick={onClose}>
            <FormattedMessage {...messages.gotIt} />
          </a>
        </div>
      )}
    </div>
  );
}

ScanAnswerSheetBody.propTypes = {
  classes: PropTypes.object,
  downloadAppBodyMessage: PropTypes.object,
  group: PropTypes.object,
  isButtonActive: PropTypes.bool,
  tutorialKey: PropTypes.string,
  onClose: PropTypes.func,
  showModal: PropTypes.object,
};

ScanAnswerSheetBody.defaultValues = {
  tutorialKey: 'ScanWrittenAS',
};

export default withStyles(styles)(ScanAnswerSheetBody);
