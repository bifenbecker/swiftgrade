import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { AppBar, CircularProgress, Grid } from '@material-ui/core';
// import { YouTube, NavigateNext } from '@material-ui/icons';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FileSaver from 'file-saver';

import { ShortcutsCommonSymbols, ShortcutsExpressionEntry } from 'images';
import { DefaultButton, MUButton } from 'components/Controls';
import AccuracyTips from 'components/AccuracyTips';
import HelpIcon from 'components/DataDisplay/HelpIcon';
import KeyboardShortcutsIcon from 'components/DataDisplay/KeyboardShortcutsIcon';
import {
  ACCURACY_TIPS_FILE_NAME,
  ASSESSMENT_RESULTS_TEST_STRING,
  CREATE_ASSESSMENT_TEST_STRING,
  EDIT_ASSESSMENT_TEST_STRING,
  PREVIEW_ASSESSMENT_TEST_STRING,
} from 'components/Layouts/AssessmentLayout/constants';
import { SETTINGS_HELP_TUTORIAL_KEY } from 'components/Modals/TutorialModal/constants';
import { hideModal, showModal } from 'components/Modals/Modal/actions';
import { LottieAndPlayerModalBody } from 'components/Modals/TutorialModal/Views';
import { getAccuracyTipsRequest } from 'containers/Assessments/config/actions';
import { CREATE_ASSESSMENT_HELP_ICON_ID, HELP_ICON_CONTENT_ID, CREATE_ANSWERS_TYPE } from 'globalConstants';
import { getLightColor } from 'utils/helpers/colorHelpers';
import { IconClosePopup } from 'components/Svgs';
import HelpModal from 'components/Modals/HelpModal';

import messages from './messages';
import { styles } from './styles';

const AssessmentLayout = ({
  children,
  classes,
  getAccuracyTips,
  group,
  history,
  isActionAssessment,
  isDirty,
  isMobilePortrait,
  keyName,
  previousPageKey,
  hideModal: onHideModal,
  onBackButtonClick,
  showModal: onShowModal,
}) => {
  const [tipsLoading, setTipsLoading] = useState(false);
  const [isShowHelpModal, setIsShowHelpModal] = useState(false);

  const downloadAccuracyTips = () => {
    const handleSuccess = responseData => {
      const { file_url: fileUrl, from_local_storage: fromLocalStorage } = responseData;

      if (fromLocalStorage) {
        FileSaver(fileUrl, ACCURACY_TIPS_FILE_NAME);
      } else {
        window.location.replace(fileUrl);
        setTimeout(() => {
          window.open('', '_self').close();
        }, 1000);
      }

      setTipsLoading(false);
    };
    const handleError = () => {
      // TODO: display some error notification ???
      setTipsLoading(false);
    };

    getAccuracyTips({ handleSuccess, handleError });
    setTipsLoading(true);
  };

  const onShortcutsModal = () => {
    onShowModal({
      customStyles: {
        top: '10%',
        bottom: '10%',
        overflow: 'auto',
        width: '80%',
        maxWidth: '880px',
      },
      maxBodyHeight: true,
      title: (
        <div className={classes.shortcutsTitle}>
          <FormattedMessage {...messages.createAssessmentShortcutsTitle} />
        </div>
      ),
      body: (
        <div className={classes.shortcutsBody}>
          <div className={classes.shortcutBodyTitle}>
            <FormattedMessage {...messages.createAssessmentShortcutsBody} />
            <br />
            <br />
            <i>
              <FormattedMessage {...messages.createAssessmentShortcutsRowsWithAsterisk} />
            </i>
          </div>
          <button className={classes.popup_close_icon} onClick={onHideModal} type="button">
            <IconClosePopup width={15} height={15} />
          </button>
          <br />
          <div className={classes.shortcutBodyImageTitle}>
            <FormattedMessage {...messages.createAssessmentShortcutsCommonAnswers} />
          </div>
          <img src={ShortcutsCommonSymbols} alt="" />
          <div className={classes.shortcutBodyImageTitle}>
            <FormattedMessage {...messages.createAssessmentShortcutsExpressionEntry} />
          </div>
          <img src={ShortcutsExpressionEntry} alt="" />
          <div className={classes.shortcutButton}>
            <DefaultButton
              text={<FormattedMessage {...messages.okay} />}
              onClick={onHideModal}
              backgroundColor={group.color}
            />
          </div>
        </div>
      ),
    });
  };

  const onSettingHelpModal = () => {
    onShowModal({
      title: <FormattedMessage {...messages.helpModalTitle} />,
      body: (
        <>
          <LottieAndPlayerModalBody
            parentClasses={classes}
            lottieWidth={280}
            tutorialKey={SETTINGS_HELP_TUTORIAL_KEY}
          />
          <div className={classes.gotit_btn_container}>
            <MUButton
              className={classes.gotit_button}
              customTextColor={group.color}
              text={<FormattedMessage {...messages.gotIt} />}
              onClick={onHideModal}
            />
          </div>
        </>
      ),
    });
  };

  // * comment tutorial icon from header on create assessment page
  // const renderTutorialIcon = () => {
  //   const { pathname } = history.location;

  //   if (CREATE_ASSESSMENT_TEST_STRING.test(pathname)) {
  //     return (
  //       <TutorialIcon
  //         color={getLightColor(group.color)}
  //         onClick={setTutorialModalVisibility}
  //         tooltipTitle={<FormattedMessage {...messages.tutorialIconCreateAssessmentHover} />}
  //       />
  //     );
  //   }
  // };

  const renderAssessmentActionHelper = () => (
    <>
      <KeyboardShortcutsIcon color={getLightColor(group.color)} onClick={onShortcutsModal} />
      <a id={HELP_ICON_CONTENT_ID} style={{ textDecoration: 'none' }}>
        <HelpIcon
          color={getLightColor(group.color)}
          tooltipTitle={<FormattedMessage {...messages.helpTooltip} />}
          onClick={() => setIsShowHelpModal(true)}
        />
      </a>
      {/* 
        // * comment whatsUp icon
        <a href={WHATSAPP_PAGE_URL} target="_blank" style={{ textDecoration: 'none' }}>
          <WhatsappIcon
            color={getLightColor(group.color)}
            tooltipTitle={<FormattedMessage {...messages.whatsappTooltip} />}
            onClick={() => {}}
          />
        </a> 
      */}
    </>
  );

  const renderSettingsHelper = () => (
    <a id={HELP_ICON_CONTENT_ID} style={{ textDecoration: 'none' }}>
      <HelpIcon
        color={getLightColor(group.color)}
        tooltipTitle={<FormattedMessage {...messages.settingsHelpTooltip} />}
        onClick={onSettingHelpModal}
      />
    </a>
  );

  const renderPreviewHelper = () => (
    <>
      {tipsLoading && (
        <div className={classes.loading}>
          <CircularProgress size={25} color="white" />
        </div>
      )}
      <AccuracyTips
        onClick={() => downloadAccuracyTips()}
        tooltipMessage={messages.maximizeGradingAccuracyInstructions}
      />
    </>
  );

  const renderHelperWithIcons = () => {
    const { pathname } = history.location;
    if (CREATE_ASSESSMENT_TEST_STRING.test(pathname) || EDIT_ASSESSMENT_TEST_STRING.test(pathname)) {
      return renderAssessmentActionHelper();
    }
    if (PREVIEW_ASSESSMENT_TEST_STRING.test(pathname)) {
      return renderPreviewHelper();
    }
    if (ASSESSMENT_RESULTS_TEST_STRING.test(pathname)) {
      return renderSettingsHelper();
    }
  };

  return (
    <AppBar
      className={classes.app_bar}
      position={keyName === 'preview' ? 'fixed' : 'relative'}
      style={{ backgroundColor: group.color }}
    >
      <Grid
        alignItems="flex-end"
        container
        direction="row"
        justify="space-between"
        classes={{
          container: classNames(keyName === 'preview' ? classes.preview_header : classes.header, {
            isMobilePortrait,
            tipsLoading,
          }),
        }}
      >
        <Grid xs={12} item className={classes.header_item}>
          <ArrowBackIcon
            className={classes.back_icon}
            tabIndex={-1}
            style={keyName === 'preview' ? { marginLeft: -4 } : { margin: '8px 0px -0px -4px' }}
            onClick={() => {
              if (isActionAssessment && isDirty) {
                onBackButtonClick();
              } else {
                history.push(`/groups/${group.id}/${previousPageKey}/`);
              }
            }}
          />
          <div className={classes.header_group_name}>{group.name}</div>
          {children}
        </Grid>
      </Grid>
      <div id={CREATE_ASSESSMENT_HELP_ICON_ID} className={classNames(classes.helper_icon, { isMobilePortrait })}>
        {renderHelperWithIcons()}
      </div>
      {isShowHelpModal && (
        <HelpModal
          type={CREATE_ANSWERS_TYPE}
          title={messages.needHelpTitle}
          onClose={() => setIsShowHelpModal(false)}
          customStyles={{
            customPaperStyles: {
              top: '6rem',
              right: '3rem',
              width: '12rem',
            },
          }}
        />
      )}
    </AppBar>
  );
};

AssessmentLayout.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object,
  getAccuracyTips: PropTypes.func,
  group: PropTypes.object,
  history: PropTypes.object,
  isActionAssessment: PropTypes.bool,
  isDirty: PropTypes.bool,
  isMobilePortrait: PropTypes.bool,
  keyName: PropTypes.string,
  previousPageKey: PropTypes.string,
  user: PropTypes.object,
  hideModal: PropTypes.func,
  showModal: PropTypes.func,
  onBackButtonClick: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
};

AssessmentLayout.defaultProps = {
  isActionAssessment: false,
  isDirty: false,
  previousPageKey: 'assessments',
};

const mapDispatchToProps = {
  getAccuracyTips: getAccuracyTipsRequest,
  hideModal,
  showModal,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  withStyles(styles),
)(AssessmentLayout);
