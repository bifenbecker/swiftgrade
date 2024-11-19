import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { get as lodashGet } from 'lodash';
import {
  POPUP_CHECKLIST_GET_AS,
  POPUP_CHECKLIST_GET_RESULT,
  TUTORIAL_AFTER_DOWNLOAD_MC_AS,
  TUTORIAL_AFTER_DOWNLOAD_WRITTEN_AS,
  TUTORIAL_AFTER_RELEASE_ONLINE_AS,
} from 'globalConstants';
import { MUButton } from 'components/Controls';
import { ChecklistTutorial } from 'components/DataDisplay';
import { IconArrowRight, IconChecklistCongratulations } from 'components/Svgs';
import { getEnabledTutorials } from 'utils/helpers/tutorialHelpers';

import { styles } from './styles';

const ChecklistTutorialModal = props => {
  const {
    bodyCongratulationsTitle,
    bodyTitle,
    classes,
    data,
    headerTitle,
    history,
    footerTitle,
    name,
    footerButtonTitle,
    showFooterArrow,
    user,
    hideModal,
  } = props;
  const isPassed = name === POPUP_CHECKLIST_GET_RESULT;

  useEffect(() => {
    props.showModal({
      customBodyClass: classes.checklist_body,
      customStyles: { maxWidth: '460px' },
      title: renderHeader(),
      withBorder: false,
      body: (
        <div className={classes.checklist_modal_wrapper}>
          <ChecklistTutorial
            bodyCongratulationsTitle={bodyCongratulationsTitle}
            bodyTitle={bodyTitle}
            data={data}
            isPassed={isPassed}
          />
          {renderFooter()}
        </div>
      ),
    });
  }, []);

  const onClick = () => {
    const handleSuccess = () => {
      hideModal();
    };
    const updatedEnabledPopups = { ...user.enabled_popups, [name]: false };
    const enabledTutorials = getEnabledTutorials(user);
    let updatedTutorialValues = {};
    if (name === POPUP_CHECKLIST_GET_AS) {
      if (lodashGet(history, 'location.state.generatedGenericSheet')) {
        updatedTutorialValues = {
          [TUTORIAL_AFTER_DOWNLOAD_WRITTEN_AS]: true,
          [TUTORIAL_AFTER_RELEASE_ONLINE_AS]: true,
        };
      } else if (lodashGet(history, 'location.state.customSheetGenerated')) {
        updatedTutorialValues = {
          [TUTORIAL_AFTER_DOWNLOAD_MC_AS]: true,
          [TUTORIAL_AFTER_RELEASE_ONLINE_AS]: true,
        };
      } else if (lodashGet(history, 'location.state.onlineSheetReleased')) {
        updatedTutorialValues = {
          [TUTORIAL_AFTER_DOWNLOAD_MC_AS]: true,
          [TUTORIAL_AFTER_DOWNLOAD_WRITTEN_AS]: true,
        };
      }
    }
    props.updateCurrentUserRequest({
      data: {
        enabled_popups: updatedEnabledPopups,
        enabled_tutorials: { ...enabledTutorials, ...updatedTutorialValues },
      },
      userId: user.id,
      handleSuccess,
    });
  };

  const renderFooter = () => (
    <div className={classes.footer}>
      <div className={classes.footer_title_wrapper}>
        <div className={classes.footer_title}>{footerTitle}</div>
        {showFooterArrow && <IconArrowRight className={classes.arrow_icon} />}
      </div>
      <div className={classes.button_container}>
        <MUButton
          className={classNames(classes.button_wrapper, { isPassed })}
          text={footerButtonTitle}
          onClick={onClick}
        />
      </div>
    </div>
  );

  const renderHeader = () => (
    <div className={classes.header_wrapper}>
      {isPassed && (
        <div>
          <IconChecklistCongratulations className={classes.icon_congratulations} />
        </div>
      )}
      <div>
        <span className={classNames(classes.header_title, { isPassed })}>{headerTitle}</span>
      </div>
    </div>
  );

  return <></>;
};

ChecklistTutorialModal.propTypes = {
  bodyCongratulationsTitle: PropTypes.any,
  bodyTitle: PropTypes.any,
  data: PropTypes.object,
  headerTitle: PropTypes.any,
  classes: PropTypes.object,
  footerButtonTitle: PropTypes.any,
  footerTitle: PropTypes.any,
  history: PropTypes.object,
  name: PropTypes.string,
  showFooterArrow: PropTypes.bool,
  user: PropTypes.object,
  hideModal: PropTypes.func,
  showModal: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
};

export default withStyles(styles)(ChecklistTutorialModal);
