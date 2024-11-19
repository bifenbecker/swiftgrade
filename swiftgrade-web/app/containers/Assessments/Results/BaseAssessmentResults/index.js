import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import _, { get as lodashGet } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';

import ControlledJoyrideTutorial from 'components/ControlledJoyrideTutorial';
import { ChecklistTutorialModal, VideoPlayerModal } from 'components/Modals';
import {
  getCurrentUserRequest,
  getCurrentUserChecklistRequest,
  updateCurrentUserRequest,
} from 'containers/App/actions';
import { makeSelectCurrentUser, makeSelectCurrentUserChecklist } from 'containers/App/selectors';
import AssessmentAnalysis from 'containers/Assessments/Results/AssessmentAnalysis';
import AssessmentAnswers from 'containers/Assessments/Results/AssessmentAnswers';
import AssessmentAverages from 'containers/Assessments/Results/AssessmentAverages';
import AssessmentResults from 'containers/Assessments/Results/AssessmentResults';
import Logic from 'containers/Assessments/Results/AssessmentResults/Logic';
import { showModal, hideModal } from 'components/Modals/Modal/actions';
import { getUserData } from 'utils/helpers/usersHelper';
import { updatePulseButtons } from 'utils/helpers/common';
import { getEnabledPopups, getEnabledTutorials } from 'utils/helpers/tutorialHelpers';

import {
  POPUP_CHECKLIST_GET_RESULT,
  POPUP_WELCOME_VIEW_RESULTS_VIDEO,
  TUTORIAL_ANALYSIS,
  TUTORIAL_ANSWERS,
  TUTORIAL_RESULTS,
  TUTORIAL_RESULTS_HELP_ICON,
  TUTORIAL_SECOND_RESULTS_FILTERS,
  TUTORIAL_OPEN_RESULTS_PAGE,
  TUTORIAL_CLICK_ON_FILTERS_BUTTON,
  PULSE_RESULTS_FILTERS,
} from 'globalConstants';

import { TUTORIAL_TABS, VIDYARD_UUID_RESULTS } from './config';
import messages from './messages';
import { styles } from './styles';

const TABS = {
  analysis: AssessmentAnalysis,
  answers: AssessmentAnswers,
  averages: AssessmentAverages,
};

export class BaseAssessmentResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      continuous: true,
      tutorialIsRunning: false,
      tutorialStepIndex: 0,
    };
  }

  componentDidMount() {
    const userData = getUserData();
    this.props.getCurrentUser({ userId: userData.user_id });
    this.props.getCurrentUserChecklistRequest({ userId: userData.user_id });
  }

  componentDidUpdate(prevProps) {
    const { tab, user } = this.props;
    const { tutorialIsRunning } = this.state;
    const enabledTutorials = getEnabledTutorials(user);
    if (
      (tab !== prevProps.tab &&
        ((tab === 'answers' && enabledTutorials[TUTORIAL_ANSWERS]) ||
          (tab === 'analysis' && enabledTutorials[TUTORIAL_ANALYSIS]))) ||
      (tab === 'results' &&
        tab === prevProps.tab &&
        enabledTutorials[TUTORIAL_RESULTS_HELP_ICON] &&
        !enabledTutorials[TUTORIAL_RESULTS] &&
        !tutorialIsRunning) ||
      (tab === 'results' &&
        tab === prevProps.tab &&
        !enabledTutorials[TUTORIAL_RESULTS] &&
        !enabledTutorials[TUTORIAL_CLICK_ON_FILTERS_BUTTON] &&
        enabledTutorials[TUTORIAL_SECOND_RESULTS_FILTERS] &&
        enabledTutorials[TUTORIAL_OPEN_RESULTS_PAGE] &&
        !tutorialIsRunning)
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ tutorialIsRunning: true, tutorialStepIndex: 0 });
    }
  }

  componentWillUnmount() {
    const { user } = this.props;
    const enabledTutorials = {
      ...user.enabled_tutorials,
      open_results_page: true,
    };

    this.props.updateCurrentUser({
      data: { enabled_tutorials: enabledTutorials },
      userId: user.id,
    });
  }

  getTutorialConfigData = (tutorialKey, isContinuous = null) => {
    const { continuous } = this.state;
    return {
      continuous: !_.isNull(isContinuous) ? isContinuous : continuous,
      tutorialKey,
      tutorialSteps: TUTORIAL_TABS[tutorialKey],
    };
  };

  getTabsTutorial = () => {
    const { user, tab } = this.props;
    const { continuous } = this.state;
    const enabledTutorials = getEnabledTutorials(user);
    const enabledPopups = getEnabledPopups(user);

    if (user && !enabledPopups[POPUP_CHECKLIST_GET_RESULT] && !enabledPopups[POPUP_WELCOME_VIEW_RESULTS_VIDEO]) {
      if (tab === 'results' && enabledTutorials[TUTORIAL_RESULTS]) {
        return this.getTutorialConfigData(TUTORIAL_RESULTS);
      }
      if (tab === 'results' && enabledTutorials[TUTORIAL_RESULTS_HELP_ICON]) {
        return this.getTutorialConfigData(TUTORIAL_RESULTS_HELP_ICON, false);
      }
      if (
        tab === 'results' &&
        !enabledTutorials[TUTORIAL_CLICK_ON_FILTERS_BUTTON] &&
        enabledTutorials[TUTORIAL_SECOND_RESULTS_FILTERS] &&
        enabledTutorials[TUTORIAL_OPEN_RESULTS_PAGE]
      ) {
        updatePulseButtons(this.props.user, this.props.updateCurrentUser, PULSE_RESULTS_FILTERS, true);
        return this.getTutorialConfigData(TUTORIAL_SECOND_RESULTS_FILTERS, false);
      }
      if (tab === 'answers' && enabledTutorials[TUTORIAL_ANSWERS]) {
        return this.getTutorialConfigData(TUTORIAL_ANSWERS);
      }
      if (tab === 'analysis' && enabledTutorials[TUTORIAL_ANALYSIS]) {
        return this.getTutorialConfigData(TUTORIAL_ANALYSIS);
      }
    }
    return {
      continuous,
      tutrialKey: null,
      tutorialSteps: [],
    };
  };

  renderResults = (assessment, data) => {
    const { activeResultsData, color, size, setActiveResultsData, user, isMobile } = this.props;
    return (
      <Logic
        activeResultsData={activeResultsData}
        assessment={assessment}
        data={data}
        setActiveResultsData={setActiveResultsData}
      >
        <AssessmentResults
          color={color}
          size={size}
          user={user}
          isMobile={isMobile}
          updateCurrentUserRequest={this.props.updateCurrentUser}
          onChangeIsEmailMsg={this.props.onChangeIsEmailMsg}
        />
      </Logic>
    );
  };

  renderTab = (assessment, data) => {
    const { activeResultsData, tab, isMobile } = this.props;
    const Tab = TABS[tab];
    return (
      <Tab
        activeResultsData={activeResultsData}
        assessment={assessment}
        data={data}
        isMobile={isMobile}
        setActiveResultsData={this.props.setActiveResultsData}
      />
    );
  };

  renderViewResultsVideoPlayerModal = user =>
    lodashGet(user, 'enabled_popups.welcome_view_results_video', false) && (
      <VideoPlayerModal
        name={POPUP_WELCOME_VIEW_RESULTS_VIDEO}
        titleContent={
          <div>
            <FormattedMessage {...messages.viewResultsVideoTitle} />
          </div>
        }
        uuid={VIDYARD_UUID_RESULTS}
        user={user}
        hideModal={() => {
          this.setState({ tutorialIsRunning: true });
          this.props.hideModal();
        }}
        showModal={this.props.showModal}
        updateCurrentUserRequest={this.props.updateCurrentUser}
      />
    );

  render() {
    const { assessment, checklist, data, tab, user, isMobile } = this.props;
    const { tutorialIsRunning, tutorialStepIndex } = this.state;

    const { continuous, tutorialKey, tutorialSteps } = this.getTabsTutorial();
    const isChecklistActive = lodashGet(user, 'enabled_popups.checklist_get_result', false) && checklist;

    const content = {
      analysis: this.renderTab,
      answers: this.renderTab,
      averages: this.renderTab,
      results: this.renderResults,
    };
    const customTutorialsProps = tutorialKey === TUTORIAL_ANALYSIS ? { disableScrolling: true } : {};

    return (
      <>
        <ControlledJoyrideTutorial
          continuous={continuous}
          customTutorialsProps={customTutorialsProps}
          ignoreDidMount={[TUTORIAL_SECOND_RESULTS_FILTERS].includes(tutorialKey)}
          setTutorialIsRunning={isRunning => this.setState({ tutorialIsRunning: isRunning })}
          setTutorialStepIndex={stepIndex => this.setState({ tutorialStepIndex: stepIndex })}
          tutorialIsRunning={tutorialIsRunning}
          tutorialStepIndex={tutorialStepIndex}
          tutorialSteps={tutorialSteps}
          tutorialKey={tutorialKey}
          disableScrolling={isMobile}
        />
        {content[tab](assessment, data)}
        {!isChecklistActive && this.renderViewResultsVideoPlayerModal(user)}
        {isChecklistActive && (
          <ChecklistTutorialModal
            bodyCongratulationsTitle={
              <div style={{ paddingTop: 20 }}>
                <FormattedMessage {...messages.scanGetResultsBodyTitle} />
              </div>
            }
            data={checklist}
            footerButtonTitle={<FormattedMessage {...messages.scanGetResultsFooterButtonTitle} />}
            headerTitle={<FormattedMessage {...messages.scanGetResultsTitle} />}
            name={POPUP_CHECKLIST_GET_RESULT}
            user={user}
            hideModal={this.props.hideModal}
            showModal={this.props.showModal}
            updateCurrentUserRequest={this.props.updateCurrentUser}
          />
        )}
      </>
    );
  }
}

BaseAssessmentResults.propTypes = {
  activeResultsData: PropTypes.object,
  assessment: PropTypes.object,
  checklist: PropTypes.object,
  color: PropTypes.string,
  data: PropTypes.any,
  getCurrentUser: PropTypes.func,
  getCurrentUserChecklistRequest: PropTypes.func,
  group: PropTypes.object,
  setActiveResultsData: PropTypes.func,
  setTutorialModalVisibility: PropTypes.func,
  size: PropTypes.object,
  tab: PropTypes.string,
  isMobile: PropTypes.bool,
  tutorialModalIsVisible: PropTypes.bool,
  hideModal: PropTypes.func,
  showModal: PropTypes.func,
  updateCurrentUser: PropTypes.func,
  user: PropTypes.object,
  onChangeIsEmailMsg: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  checklist: makeSelectCurrentUserChecklist(),
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  getCurrentUser: getCurrentUserRequest,
  getCurrentUserChecklistRequest,
  hideModal,
  showModal,
  updateCurrentUser: updateCurrentUserRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(BaseAssessmentResults);
