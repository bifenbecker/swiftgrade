import React, { Component, Fragment } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _, { get as lodashGet } from 'lodash';
import SubmissionError from 'redux-form/lib/SubmissionError';
import { createStructuredSelector } from 'reselect';
import { Loading } from 'components/Controls';
import ControlledJoyrideTutorial from 'components/ControlledJoyrideTutorial';
import { ChecklistTutorialBottom } from 'components/DataDisplay';
import { makeSelectIsModalActive } from 'components/Modals/Modal/selectors';
import { ChecklistTutorialModal, MobileWarningModal, TutorialModal, UsernameIsEmailModal } from 'components/Modals';
import {
  getCurrentUserRequest,
  getCurrentUserChecklistRequest,
  updateCurrentUserRequest,
  verifyEmailRequest,
} from 'containers/App/actions';
import {
  WELCOME_STUDENT_PORTAL_POPUP,
  POPUP_WELCOME_TEACHER,
  POPUP_CHECKLIST_DASHBOARD,
  POPUP_CHECKLIST_CREATE_CLASS,
  PULSE_DASHBOARD_CREATE_CLASS,
  POPUP_HOW_TO_USE_SWIFTGRADE,
  POPUP_CHECKLIST_GET_AS,
  TUTORIAL_AFTER_DOWNLOAD_MC_AS,
  TUTORIAL_PRINT_MC_SHEETS,
  TUTORIAL_AFTER_PRINT_MC_SHEETS,
  POPUP_USERNAME_IS_NOW_EMAIL,
  POPUP_VERIFY_EMAIL,
} from 'globalConstants';
import {
  getTutorialDashboard,
  isCreateClassChecklistActive,
  setColorsForGroups,
  setModalKeys,
} from 'utils/helpers/groupsHelper';
import { isTeacher, getUserData } from 'utils/helpers/usersHelper';
import { updatePulseButtons } from 'utils/helpers/common';
import { makeSelectCurrentUser, makeSelectCurrentUserChecklist } from 'containers/App/selectors';
import { getEnabledPopups, getEnabledTutorials } from 'utils/helpers/tutorialHelpers';
import { CHECKLIST_DATA, FORMS, MAX_CLASS_NAME_LENGTH } from './constants';

import './font/style.scss';
import Cards from './Cards';

import Header from './Header';
import CheckYourEmail from './CheckYourEmail';
import { BannerView, WelcomeStudentModalView, WelcomeTeacherModalView } from './Views';
import messages from './messages';
import { styles } from './styles';
import {
  createGroupsRequest,
  deleteGroupRequest,
  copyGroupRequest,
  renameGroupRequest,
  joinGroupRequest,
  setIsNewSession,
} from '../actions';
import { makeSelectGroups, makeSelectLoading, makeSelectIsNewSession } from '../selectors';
import { PlaylistPreviewInfoStepContent } from './TutorialStepsHome';

class GroupsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupId: null,
      // isShowWelcomeVideo: false,
      popupKey: null,
      tutorialModalKey: null,
      tutorialIsRunning: false,
      tutorialStepIndex: 0,
      // tutorialSteps: TUTORIAL_STEPS_DASHBOARD,
      tutorialModalIsVisible: false,
      clickOnVerifyEmail: false,
    };
  }

  componentDidMount() {
    const userData = getUserData();
    this.props.getCurrentUserRequest({ userId: userData.user_id });
    this.props.getCurrentUserChecklistRequest({ userId: userData.user_id });
  }

  componentDidUpdate() {
    const { history, user } = this.props;
    const { popupKey, tutorialModalIsVisible, tutorialModalKey } = this.state;
    // const { popupKey, tutorialModalIsVisible, tutorialModalKey, tutorialIsRunning } = this.state;
    const generatedGenericSheet = _.get(history, 'location.state.generatedGenericSheet');
    const enabledPopups = getEnabledPopups(user);
    const enabledTutorials = getEnabledTutorials(user);

    if (
      !this.state.tutorialIsRunning &&
      ((!enabledPopups[POPUP_CHECKLIST_GET_AS] &&
        generatedGenericSheet &&
        enabledTutorials[TUTORIAL_AFTER_DOWNLOAD_MC_AS]) ||
        (enabledTutorials[TUTORIAL_PRINT_MC_SHEETS] && enabledTutorials[TUTORIAL_AFTER_PRINT_MC_SHEETS]))
    ) {
      this.updateSetState({ tutorialIsRunning: true });
    }

    if (
      isTeacher(user) &&
      generatedGenericSheet &&
      !enabledPopups[POPUP_CHECKLIST_GET_AS] &&
      !enabledTutorials[TUTORIAL_AFTER_DOWNLOAD_MC_AS]
    ) {
      setModalKeys({ popupKey, tutorialModalIsVisible, tutorialModalKey, user, updateState: this.updateSetState });
    }
    // if (user && user.role === 'student' && enabledPopups[WELCOME_STUDENT_PORTAL_POPUP] && tutorialIsRunning) {
    //   console.log('in stud logic strange');
    //   // eslint-disable-next-line react/no-did-update-set-state
    //   this.setState({ tutorialIsRunning: false });
    // }
    // if (
    //   (user &&
    //     user.role === 'student' &&
    //     !enabledPopups[WELCOME_STUDENT_PORTAL_POPUP] &&
    //     enabledTutorials[TUTORIAL_STUDENT_PORTAL] &&
    //     !tutorialIsRunning) ||
    //   (enabledTutorials[TUTORIAL_PRINT_MC_SHEETS] &&
    //     enabledTutorials[TUTORIAL_AFTER_PRINT_MC_SHEETS] &&
    //     !tutorialIsRunning)
    // ) {
    //   console.log('in stud logic');
    //   // eslint-disable-next-line react/no-did-update-set-state
    //   this.setState({ tutorialIsRunning: true });
    // }
  }

  updateSetState = updatedValues => {
    this.setState(prevState => ({ ...prevState, ...updatedValues }));
  };

  markStepAsCompleted = (setStateCallback = () => {}) => {
    const { popupKey } = this.state;
    // this.setTutorialModalVisibility(false, setStateCallback);
    const handleSuccess = () => {
      this.setTutorialModalVisibility(false, setStateCallback);
    };
    this.updateEnabledPopups(popupKey, handleSuccess);
  };

  setTutorialModalVisibility = (isVisible, callback = () => {}) => {
    this.setState({ tutorialModalIsVisible: isVisible }, callback);
  };

  onCancel = formName => {
    this.props.hideModal();
    this.props.resetForm(formName);
  };

  onOkayMobileModal = () => {
    // this.setState({ isShowWelcomeVideo: true });
    this.props.setIsNewSession();
    this.props.hideModal();
  };

  onDeleteGroup = group =>
    new Promise(() => {
      const handleSuccess = () => {
        this.setState({ groupId: null });
        this.props.hideModal();
      };

      this.props.deleteGroupRequest({ groupId: group.id, handleSuccess });
    });

  onCopyGroup = formData => {
    const { groupId } = this.state;
    const { groups } = this.props;
    const data = formData && formData.toJS ? formData.toJS() : null;
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };
      const handleSuccess = () => {
        this.setState({ groupId: null });
        this.onCancel('GroupsCopyForm');
      };

      const groupsArray = [];
      groupsArray.push(data);

      const color = _.isArray(groups) && !_.isEmpty(groups) ? groups[0].color : null;
      data.color = setColorsForGroups(groupsArray, color)[0].color;
      data.group_id = groupId;

      this.props.copyGroupRequest({
        groupId,
        data,
        handleErrors,
        handleSuccess,
      });
    });
  };

  onRenameGroup = formData => {
    const { groupId } = this.state;
    const data = formData && formData.toJS ? formData.toJS() : null;
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };
      const handleSuccess = () => {
        this.setState({ groupId: null });
        this.onCancel('GroupsRenameForm');
      };
      this.props.renameGroupRequest({
        data,
        groupId,
        handleErrors,
        handleSuccess,
      });
    });
  };

  onCreateGroups = formData => {
    const { groups, isConnected, user } = this.props;
    if (!isConnected) {
      return null;
    }

    const data = formData && formData.toJS ? formData.toJS() : null;
    if (data) {
      data.groups.forEach(group => {
        if (group.name.length > MAX_CLASS_NAME_LENGTH) {
          group.name = group.name.slice(0, MAX_CLASS_NAME_LENGTH);
        }
      });
    }
    return new Promise((resolve, reject) => {
      const handleSuccess = () => {
        updatePulseButtons(this.props.user, this.props.updateCurrentUserRequest, PULSE_DASHBOARD_CREATE_CLASS);
        this.props.getCurrentUserChecklistRequest({ userId: user.id });
        this.onCancel('GroupsCreateForm');
        resolve();
      };
      const handleErrors = response => {
        const errors = _.has(response.errors, 'groups')
          ? response.errors
          : { groups: [{ name: response.errors.name[0] }] };
        reject(new SubmissionError(errors));
      };
      data.groups = data.groups.map(group => ({ ...group, name: group.name ? group.name.trim() : group.name }));
      const color = _.isArray(groups) && !_.isEmpty(groups) ? groups[0].color : null;
      data.groups = setColorsForGroups(data.groups, color);
      this.props.createGroupsRequest({ data, handleSuccess, handleErrors });
    });
  };

  onJoinClass = formData => {
    const { isConnected } = this.props;
    if (!isConnected) {
      return null;
    }
    const data = formData && formData.toJS ? formData.toJS() : null;
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };
      const handleSuccess = () => {
        this.onCancel('CodeForm');
        resolve();
      };
      this.props.joinGroupRequest({ data, handleSuccess, handleErrors });
    });
  };

  renderCheckYourEmailModal = () => {
    this.props.showModal({
      withoutTitle: true,
      body: <CheckYourEmail />,
    });
    localStorage.clear();
  };

  onVerifyEmail = formData => {
    const { user, groups } = this.props;
    const data = formData && formData.toJS ? formData.toJS() : null;
    data.group_id = groups[0].id;
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };
      const handleSuccess = () => {
        this.onCancel('VerifyEmailForm');
        this.setState({ clickOnVerifyEmail: true });
        this.renderCheckYourEmailModal();
      };
      this.props.verifyEmailRequest({ data, userId: user.id, handleSuccess, handleErrors });
    });
  };

  onSkipVerifyEmail = () => {
    this.props.setIsNewSession();
    this.onCancel('VerifyEmailForm');
  };

  onChange = (key, group) => {
    this.setState({ groupId: group.id });
    this.onShowModal(key, group);
  };

  onChangeValue = (key, data) => {
    const funcs = {
      copy: this.onCopyGroup,
      create: this.onCreateGroups,
      delete: this.onDeleteGroup,
      join: this.onJoinClass,
      rename: this.onRenameGroup,
      verify: this.onVerifyEmail,
    };
    return funcs[key](data);
  };

  onShowModal = (key, group = null) => {
    const Form = FORMS[key].form;
    this.props.showModal({
      title: FORMS[key].title,
      body: (
        <Form
          group={group}
          onCancel={() => this.onCancel(FORMS[key].name)}
          onSkipVerifyEmail={() => this.onSkipVerifyEmail()}
          onSubmit={formData => this.onChangeValue(key, formData)}
          onFormDidMount={() => setTimeout(() => this.setState({ tutorialIsRunning: true }), 1)}
        />
      ),
    });
  };

  onShowPlayerButtonModal = () => {
    const { classes } = this.props;
    this.props.showModal({
      customStyles: {
        top: '5.5rem',
        right: '6rem',
        width: '17rem',
      },
      isCloseByOutClick: true,
      title: (
        <span className={classes.player_button_modal_title}>
          <FormattedMessage {...messages.gettingStarted} />
        </span>
      ),
      body: (
        <PlaylistPreviewInfoStepContent
          onHide={this.props.hideModal}
          onFormDidMount={() => setTimeout(() => this.setState({ tutorialIsRunning: true }), 1)}
        />
      ),
    });
  };

  onWelcomeModalClose = () => {
    const { user } = this.props;
    this.props.hideModal();
    const key = isTeacher(user) ? POPUP_WELCOME_TEACHER : WELCOME_STUDENT_PORTAL_POPUP;
    this.updateEnabledPopups(key);
  };

  onUsernameIsEmailModalClose = () => {
    this.props.hideModal();
    this.updateEnabledPopups(POPUP_USERNAME_IS_NOW_EMAIL);
  };

  updateEnabledPopups = (popupKey, handleSuccess = null) => {
    const { user } = this.props;
    const enabledPopups = {
      ...user.enabled_popups,
      [popupKey]: false,
    };
    this.props.updateCurrentUserRequest({
      data: { enabled_popups: enabledPopups },
      userId: user.id,
      handleSuccess,
    });
  };

  renderHeader = genericPdfStatus => {
    const { groups, history, isModalActive, user } = this.props;
    return (
      <Header
        genericPdfStatus={genericPdfStatus}
        groups={groups}
        history={history}
        isModalActive={isModalActive}
        onDownloadFile={this.props.onDownloadFile}
        onShowModal={this.onShowModal}
        onShowPlayerModal={this.onShowPlayerButtonModal}
        hideModal={this.props.hideModal}
        showModal={this.props.showModal}
        user={user}
      />
    );
  };

  renderLoading = classes => (
    <div className={classes.loading}>
      <Loading />
    </div>
  );

  renderChecklistModal = (checklist, name, user) => {
    const checklistData = lodashGet(CHECKLIST_DATA, name, {});
    return (
      <ChecklistTutorialModal
        bodyTitle={checklistData.bodyTitle}
        data={checklist}
        footerTitle={checklistData.footerTitle}
        footerButtonTitle={checklistData.footerButtonTitle}
        headerTitle={checklistData.headerTitle}
        name={name}
        showFooterArrow
        user={user}
        hideModal={this.props.hideModal}
        showModal={this.props.showModal}
        updateCurrentUserRequest={this.props.updateCurrentUserRequest}
      />
    );
  };

  renderTutorialModal = () => {
    const { history } = this.props;
    const { tutorialModalIsVisible, tutorialModalKey } = this.state;

    // tutorialModalIsVisible && !tutorialIsRunning && tutorialModalKey && (
    if (tutorialModalIsVisible && tutorialModalKey) {
      return (
        <TutorialModal
          group={null}
          history={history}
          tutorialKey={tutorialModalKey}
          okCallback={() => this.setTutorialModalVisibility(false)}
          onDoNotShowClick={() => this.markStepAsCompleted()}
        />
      );
    }
  };

  renderAdditionalModal = () => {
    const { checklist, groups, history, isMobile, user, isNewSession } = this.props;
    const { clickOnVerifyEmail } = this.state;
    const enabledPopups = getEnabledPopups(user);
    const enabledTutorials = getEnabledTutorials(user);
    const generatedGenericSheet = _.get(history, 'location.state.generatedGenericSheet');

    const isChecklistActive =
      enabledPopups &&
      !enabledPopups[POPUP_WELCOME_TEACHER] &&
      (enabledPopups[POPUP_CHECKLIST_DASHBOARD] ||
        isCreateClassChecklistActive(groups, enabledPopups, enabledTutorials) ||
        (generatedGenericSheet && enabledPopups[POPUP_CHECKLIST_GET_AS]));
    // if (isTeacher(user)) {
    //   if (enabledPopups[POPUP_WELCOME_TEACHER]) {
    //     return <WelcomeTeacherModalView onClick={this.onWelcomeModalClose} showModal={this.props.showModal} />;
    //   }
    //   if (enabledPopups[POPUP_CHECKLIST_DASHBOARD]) {
    //     return this.renderChecklistModal(checklist, POPUP_CHECKLIST_DASHBOARD, user);
    //   }
    //   if (isCreateClassChecklistActive(groups, enabledPopups, enabledTutorials)) {
    //     return this.renderChecklistModal(checklist, POPUP_CHECKLIST_CREATE_CLASS, user);
    //   }
    //   const generatedGenericSheet = _.get(history, 'location.state.generatedGenericSheet');
    //   if (enabledPopups[POPUP_CHECKLIST_GET_AS] && generatedGenericSheet) {
    //     return this.renderChecklistModal(checklist, POPUP_CHECKLIST_GET_AS, user);
    //   }
    // }
    // }
    const checklistPopupsList = [POPUP_CHECKLIST_DASHBOARD, POPUP_CHECKLIST_CREATE_CLASS, POPUP_CHECKLIST_GET_AS];
    const checklistKey = isChecklistActive
      ? checklistPopupsList.find(item => enabledPopups && enabledPopups[item])
      : null;

    if (user.role === 'student' && isNewSession && !clickOnVerifyEmail && enabledPopups[POPUP_VERIFY_EMAIL]) {
      this.onShowModal('verify');
      return <></>;
    }

    if (user.role === 'teacher' && isMobile && isNewSession && !clickOnVerifyEmail) {
      return <MobileWarningModal hideModal={this.onOkayMobileModal} showModal={this.props.showModal} />;
    }

    const showUsernameIsEmailModal =
      user &&
      user.role === 'student' &&
      enabledPopups[POPUP_USERNAME_IS_NOW_EMAIL] &&
      !enabledPopups[POPUP_VERIFY_EMAIL];

    const showWelcomeStudentModal =
      user &&
      user.role === 'student' &&
      !showUsernameIsEmailModal &&
      !clickOnVerifyEmail &&
      enabledPopups[WELCOME_STUDENT_PORTAL_POPUP];

    return (
      <>
        {isTeacher(user) && enabledPopups[POPUP_WELCOME_TEACHER] && enabledPopups[POPUP_CHECKLIST_DASHBOARD] && (
          <WelcomeTeacherModalView onClick={this.onWelcomeModalClose} showModal={this.props.showModal} />
        )}
        {isTeacher(user) && isChecklistActive && this.renderChecklistModal(checklist, checklistKey, user)}
        {showUsernameIsEmailModal && (
          <UsernameIsEmailModal onClick={this.onUsernameIsEmailModalClose} showModal={this.props.showModal} />
        )}
        {showWelcomeStudentModal && (
          <WelcomeStudentModalView
            isMobile={isMobile}
            onClick={this.onWelcomeModalClose}
            showModal={this.props.showModal}
          />
        )}
      </>
    );
  };

  render() {
    const {
      classes,
      checklist,
      genericPdfStatus,
      groups,
      history,
      intl,
      isMobile,
      isModalActive,
      loading,
      user,
    } = this.props;
    const { tutorialIsRunning, tutorialStepIndex } = this.state;
    if (_.isNull(groups) || loading || !_.isObject(user) || !_.isObject(checklist)) {
      return (
        <Fragment>
          {this.renderHeader()}
          {this.renderLoading(classes)}
        </Fragment>
      );
    }

    const { continuous, tutorialKey, tutorialSteps } = getTutorialDashboard({
      groups,
      history,
      isModalActive,
      tutorialIsRunning,
      user,
      updateState: this.updateSetState,
    });
    return (
      <div>
        <Helmet>
          <title>{intl.formatMessage(messages.swiftgrade)}</title>
        </Helmet>
        {!(isModalActive && isMobile && this.props.isNewSession) && (
          <ControlledJoyrideTutorial
            continuous={continuous}
            ignoreDidMount={[TUTORIAL_AFTER_DOWNLOAD_MC_AS, TUTORIAL_AFTER_PRINT_MC_SHEETS].includes(tutorialKey)}
            setTutorialIsRunning={isRunning => this.setState({ tutorialIsRunning: isRunning })}
            setTutorialStepIndex={stepIndex => this.setState({ tutorialStepIndex: stepIndex })}
            tutorialIsRunning={tutorialIsRunning}
            tutorialStepIndex={tutorialStepIndex}
            tutorialSteps={tutorialSteps}
            tutorialKey={tutorialKey}
            disableScrolling={isMobile}
            disableScrollParentFix={isMobile}
          />
        )}
        {isTeacher(user) && (
          <BannerView
            classes={classes}
            user={user}
            hideModal={this.props.hideModal}
            showModal={this.props.showModal}
            updateEnabledPopups={this.updateEnabledPopups}
          />
        )}
        {this.renderHeader(genericPdfStatus)}
        <Cards
          groups={groups}
          user={user}
          onDoNotShowModal={() => this.updateEnabledPopups(POPUP_HOW_TO_USE_SWIFTGRADE)}
          onChange={this.onChange}
        />
        {isTeacher(user) && (
          <ChecklistTutorialBottom
            data={checklist}
            user={user}
            showModal={this.props.showModal}
            hideModal={this.props.hideModal}
            updateCurrentUserRequest={this.props.updateCurrentUserRequest}
          />
        )}
        {/* <WelcomeVideoPlayerModal
          classes={classes}
          isMobile={isMobile}
          isShowWelcomeVideo={this.state.isShowWelcomeVideo}
          user={user}
          hideModal={this.props.hideModal}
          showModal={this.props.showModal}
          updateCurrentUserRequest={this.props.updateCurrentUserRequest}
        /> */}
        {this.renderAdditionalModal()}
        {this.renderTutorialModal()}
      </div>
    );
  }
}

GroupsList.propTypes = {
  checklist: PropTypes.object,
  classes: PropTypes.object,
  loading: PropTypes.bool,
  hideModal: PropTypes.func,
  genericPdfStatus: PropTypes.string,
  groups: PropTypes.any,
  history: PropTypes.object,
  intl: intlShape.isRequired,
  isConnected: PropTypes.bool,
  isMobile: PropTypes.bool,
  isModalActive: PropTypes.bool,
  isNewSession: PropTypes.bool,
  user: PropTypes.object,
  copyGroupRequest: PropTypes.func,
  createGroupsRequest: PropTypes.func,
  deleteGroupRequest: PropTypes.func,
  getCurrentUserRequest: PropTypes.func,
  getCurrentUserChecklistRequest: PropTypes.func,
  joinGroupRequest: PropTypes.func,
  onDownloadFile: PropTypes.func,
  renameGroupRequest: PropTypes.func,
  resetForm: PropTypes.func,
  setIsNewSession: PropTypes.func,
  showModal: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
  verifyEmailRequest: PropTypes.func,
};

const mapDispatchToProps = {
  copyGroupRequest,
  createGroupsRequest,
  deleteGroupRequest,
  getCurrentUserRequest,
  getCurrentUserChecklistRequest,
  joinGroupRequest,
  renameGroupRequest,
  updateCurrentUserRequest,
  setIsNewSession,
  verifyEmailRequest,
};

const mapStateToProps = createStructuredSelector({
  checklist: makeSelectCurrentUserChecklist(),
  user: makeSelectCurrentUser(),
  groups: makeSelectGroups(),
  loading: makeSelectLoading(),
  isModalActive: makeSelectIsModalActive(),
  isNewSession: makeSelectIsNewSession(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
  withStyles(styles),
)(GroupsList);
