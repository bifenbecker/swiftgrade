import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { withStyles, Tooltip } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import { get as lodashGet, isEmpty as lodashIsEmpty } from 'lodash';
import classNames from 'classnames';

import ControlledJoyrideTutorial from 'components/ControlledJoyrideTutorial';
import { DefaultButton } from 'components/Controls';
import { AssessmentsStudentsTitle, Table } from 'components/DataDisplay';
import { IconArrowAddAssessment, IconCup } from 'components/Svgs';
import {
  ASSESSMENTS_LIST_PAGE_TUTORIAL,
  ASSESSMENTS_LIST_TIPS_DISPLAYABLE_TUTORIAL_PROGRESS,
  CREATE_BUTTON_ID,
  POPUP_CHECKLIST_CREATE_ASSESSMENT,
  TUTORIAL_ASSESSMENT_CONGRATULATIONS,
  TUTORIAL_ASSESSMENT_CREATION,
  TUTORIAL_WELCOME_ASSESSMENT,
  TUTORIAL_ASSESSMENT_EXPLANATION,
  TUTORIAL_AFTER_DOWNLOAD_WRITTEN_AS,
  PULSE_ASSESSMENTS_CREATE_ANSWER_KEY,
  TUTORIAL_RELEASE_ONLINE_AS,
  TUTORIAL_AFTER_RELEASE_ONLINE_AS,
  POPUP_CHECKLIST_GET_AS,
} from 'globalConstants';
import { NEW_TAB_LINKS } from 'utils/helpers/assessments/constants';
import { getPulseButtonValue } from 'utils/helpers/common';
import { getEnabledPopups, getEnabledTutorials } from 'utils/helpers/tutorialHelpers';

import '../../styles.scss';
import DefaultTableTutorialModal from './DefaultTableTutorialModal';
import messages from './messages';
import { styles } from './styles';

import { COLUMNS, MOBILE_PORTRAIT_COLUMNS } from '../../tableConfigs/default_config';
import {
  MOBILE_PORTRAIT_TABLE_CONTAINER_STYLE,
  MOBILE_PORTRAIT_TABLE_STYLE,
  TABLE_STYLE,
} from '../../tableConfigs/config';
import { TUTORIAL_STEPS } from './config';

class DefaultTableView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tutorialIsRunning: false,
      tutorialModalIsVisible: false,
      tutorialStepIndex: 0,
    };
  }

  componentDidMount() {
    const { user } = this.props;
    const { tutorialIsRunning } = this.state;

    const enabledTutorials = lodashGet(user, 'enabled_tutorials');
    // const isTutorialEnabled =
    //   enabledTutorials &&
    //   // ((enabledTutorials[TUTORIAL_DOWNLOAD_WRITTEN_AS] && enabledTutorials[TUTORIAL_AFTER_DOWNLOAD_WRITTEN_AS]) ||
    //     // ((enabledTutorials[TUTORIAL_DOWNLOAD_MC_AS] && enabledTutorials[TUTORIAL_AFTER_DOWNLOAD_MC_AS]) ||
    //     ((enabledTutorials[TUTORIAL_RELEASE_ONLINE_AS] && enabledTutorials[TUTORIAL_AFTER_RELEASE_ONLINE_AS]));
    const isTutorialEnabled =
      enabledTutorials &&
      enabledTutorials[TUTORIAL_RELEASE_ONLINE_AS] &&
      enabledTutorials[TUTORIAL_AFTER_RELEASE_ONLINE_AS]; // TODO: check if needed
    if (isTutorialEnabled && !tutorialIsRunning) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ tutorialIsRunning: true });
    }
  }

  componentDidUpdate(prevProps) {
    const { user: prevUser } = prevProps;
    const { user } = this.props;

    const prevEnabledTutorials = lodashGet(prevUser, 'enabled_tutorials');
    const enabledTutorials = lodashGet(user, 'enabled_tutorials');
    if (
      prevEnabledTutorials &&
      enabledTutorials &&
      prevEnabledTutorials !== enabledTutorials &&
      enabledTutorials[ASSESSMENTS_LIST_PAGE_TUTORIAL] &&
      lodashGet(user, `tutorials_progress.${ASSESSMENTS_LIST_TIPS_DISPLAYABLE_TUTORIAL_PROGRESS}`, true)
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ tutorialIsRunning: true });
    }
  }

  getTutorialConfigData = (tutorialKey, continuous = true) => ({
    continuous,
    tutorialKey,
    tutorialSteps: TUTORIAL_STEPS[tutorialKey],
  });

  getAssessmentTutorial = () => {
    const { assessments, history, isChecklistActive, user, groups } = this.props;
    const { tutorialIsRunning } = this.state;
    const enabledPopups = getEnabledPopups(user);
    const enabledTutorial = getEnabledTutorials(user);
    const totalAssessmentToUser = Object.values(groups).reduce((acc, group) => acc + group.assessments_count, 0);
    if (user) {
      if (
        assessments.length === 0 &&
        enabledTutorial[TUTORIAL_WELCOME_ASSESSMENT] &&
        enabledTutorial[TUTORIAL_ASSESSMENT_CREATION]
      ) {
        return this.getTutorialConfigData(TUTORIAL_WELCOME_ASSESSMENT);
      }
      if (assessments.length > 0 && !isChecklistActive) {
        if (
          !enabledPopups[POPUP_CHECKLIST_CREATE_ASSESSMENT] &&
          lodashGet(history, `location.state.sheetKind`) &&
          enabledTutorial[TUTORIAL_ASSESSMENT_CONGRATULATIONS]
        ) {
          if (!tutorialIsRunning) {
            this.setState({ tutorialIsRunning: true });
          }
          return this.getTutorialConfigData(TUTORIAL_ASSESSMENT_CONGRATULATIONS, false);
        }
        if (
          !enabledTutorial[TUTORIAL_WELCOME_ASSESSMENT] &&
          !enabledTutorial[TUTORIAL_ASSESSMENT_CONGRATULATIONS] &&
          !enabledPopups[POPUP_CHECKLIST_CREATE_ASSESSMENT] &&
          enabledTutorial[TUTORIAL_ASSESSMENT_EXPLANATION] &&
          enabledTutorial[TUTORIAL_ASSESSMENT_CREATION]
        ) {
          if (!tutorialIsRunning) {
            this.setState({ tutorialIsRunning: true });
          }
          if (lodashGet(history, `location.state.sheetKind`)) {
            if (totalAssessmentToUser === 1) {
              return this.getTutorialConfigData(TUTORIAL_ASSESSMENT_EXPLANATION);
            }
            return {
              continuous: false,
              tutorialKey: null,
              tutorialSteps: [],
            };
          }
          return this.getTutorialConfigData(TUTORIAL_ASSESSMENT_CREATION);
        }
        if (
          enabledTutorial[TUTORIAL_WELCOME_ASSESSMENT] &&
          // !enabledTutorial[TUTORIAL_ASSESSMENT_CONGRATULATIONS] && // TODO: check if needed
          enabledTutorial[TUTORIAL_ASSESSMENT_CREATION]
        ) {
          return this.getTutorialConfigData(TUTORIAL_ASSESSMENT_CREATION);
        }
        if (
          !enabledPopups[POPUP_CHECKLIST_GET_AS] &&
          lodashGet(history, 'location.state.customSheetGenerated') &&
          enabledTutorial[TUTORIAL_AFTER_DOWNLOAD_WRITTEN_AS]
        ) {
          return this.getTutorialConfigData(TUTORIAL_AFTER_DOWNLOAD_WRITTEN_AS, false);
        }
        if (
          !enabledPopups[POPUP_CHECKLIST_GET_AS] &&
          lodashGet(history, 'location.state.onlineSheetReleased') &&
          enabledTutorial[TUTORIAL_AFTER_RELEASE_ONLINE_AS]
        ) {
          return this.getTutorialConfigData(TUTORIAL_AFTER_RELEASE_ONLINE_AS, false);
        }
      }
    }

    return {
      continuous: false,
      tutorialKey: null,
      tutorialSteps: [],
    };
  };

  onOrderByChange = (columnId, orderBy) => {
    const orderField = columnId === orderBy ? `-${columnId}` : columnId;
    this.props.onOrderByChange(orderField);
  };

  setTutorialModalVisibility = (isVisible, callback = () => {}) => {
    this.setState({ tutorialModalIsVisible: isVisible }, callback);
  };

  renderTitle = (classes, group, assessments) => {
    const { isMobilePortrait, user } = this.props;
    const tooltipText = <FormattedMessage {...messages.createAnswerKey} />;
    const enabledTutorials = getEnabledTutorials(user);
    const isAssessmentsCreateAnswerKeyEnabled = getPulseButtonValue(user, PULSE_ASSESSMENTS_CREATE_ANSWER_KEY);
    const isTutorialPassed =
      !enabledTutorials[TUTORIAL_WELCOME_ASSESSMENT] || !enabledTutorials[TUTORIAL_ASSESSMENT_CREATION];

    return (
      <div className={classNames(classes.title, { isMobilePortrait })}>
        <div className={classNames(classes.assessments_students_title_block, { isMobilePortrait })}>
          <AssessmentsStudentsTitle keyName="assessments" />
        </div>
        <div className={classNames(classes.create_btn_container, { isMobilePortrait })}>
          <Tooltip title={tooltipText} arrow placement="right">
            <div id={CREATE_BUTTON_ID} className={classes.tooltip_wrapper}>
              <DefaultButton
                className={
                  assessments.length === 0 && isAssessmentsCreateAnswerKeyEnabled && isTutorialPassed
                    ? classNames(classes.create_btn, classes.pulse)
                    : classes.create_btn
                }
                borderRadius={20}
                backgroundColor={group.color}
                startIcon={<AddIcon style={{ marginRight: 4 }} />}
                onClick={() => this.props.history.push(NEW_TAB_LINKS(null, group.id, 'create'))}
                text={<FormattedMessage {...messages.create} />}
              />
            </div>
          </Tooltip>
          {lodashIsEmpty(assessments) && (
            <div>
              <IconArrowAddAssessment className={classes.add_new_assessment_note_arrow} />
              <span className={classes.add_new_assessment_note_text}>
                <FormattedMessage {...messages.createAnswerKey} />
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  renderEmptyAssessmentsImage = () => {
    const { classes, group, isMobilePortrait, assessments } = this.props;
    const { tutorialIsRunning, tutorialModalIsVisible, tutorialStepIndex } = this.state;
    const { tutorialKey, tutorialSteps } = this.getAssessmentTutorial();

    return (
      <>
        <div className={classNames(classes.empty_assessments_container, { isMobilePortrait })}>
          {this.renderTitle(classes, group, assessments)}
          <div className={classes.empty_assessments}>
            <IconCup className={classes.empty_assessments_icon} color={group.color} />
          </div>
        </div>
        {!tutorialModalIsVisible && (
          <ControlledJoyrideTutorial
            continuous
            setTutorialIsRunning={isRunning => this.setState({ tutorialIsRunning: isRunning })}
            setTutorialStepIndex={stepIndex => this.setState({ tutorialStepIndex: stepIndex })}
            tutorialIsRunning={tutorialIsRunning}
            tutorialKey={tutorialKey}
            tutorialStepIndex={tutorialStepIndex}
            tutorialSteps={tutorialSteps}
          />
        )}
      </>
    );
  };

  renderTutorialModal = (isChecklistActive, tutorialKey) => {
    const { group, user } = this.props;
    const { tutorialModalIsVisible } = this.state;
    const enabledTutorials = lodashGet(user, 'enabled_tutorials');
    if (
      enabledTutorials &&
      tutorialKey !== TUTORIAL_AFTER_DOWNLOAD_WRITTEN_AS &&
      tutorialKey !== TUTORIAL_AFTER_RELEASE_ONLINE_AS &&
      tutorialKey !== TUTORIAL_ASSESSMENT_CONGRATULATIONS &&
      tutorialKey !== TUTORIAL_ASSESSMENT_EXPLANATION &&
      !isChecklistActive
    ) {
      return (
        <DefaultTableTutorialModal
          group={group}
          setTutorialModalVisibility={this.setTutorialModalVisibility}
          tutorialModalIsVisible={tutorialModalIsVisible}
          user={user}
        />
      );
    }
  };

  render() {
    const {
      assessments,
      assessmentsIds,
      classes,
      color,
      group,
      isChecklistActive,
      isMobile,
      isMobilePortrait,
      isModalActive,
      orderBy,
      size,
      user,
    } = this.props;
    const { tutorialIsRunning, tutorialModalIsVisible, tutorialStepIndex } = this.state;

    const tableHeight = size.height - 70;

    if (lodashIsEmpty(assessments)) {
      return this.renderEmptyAssessmentsImage();
    }

    const allAssessmentsSelected = assessmentsIds.length === assessments.length;
    const tableColumns = isMobilePortrait ? MOBILE_PORTRAIT_COLUMNS : COLUMNS;
    const { continuous, tutorialKey, tutorialSteps } = this.getAssessmentTutorial();

    return (
      <>
        <Table
          columns={tableColumns(
            allAssessmentsSelected,
            assessmentsIds,
            classes,
            color,
            group,
            isMobile,
            isMobilePortrait,
            isModalActive,
            user,
            this.props.onAction,
            this.props.onAllAssessmentsSelect,
            this.props.onAssessmentsIdsChange,
            this.props.onTextButtonClick,
          )}
          containerStyle={
            isMobilePortrait ? MOBILE_PORTRAIT_TABLE_CONTAINER_STYLE : { maxHeight: tableHeight, overflowX: 'auto' }
          }
          data={assessments}
          orderBy={orderBy}
          stickyHeader={false}
          style={isMobilePortrait ? MOBILE_PORTRAIT_TABLE_STYLE : TABLE_STYLE}
          tableRootClass={classNames(classes.table_root_class, { isMobilePortrait })}
          title={this.renderTitle(classes, group, assessments)}
          onOrderByChange={this.onOrderByChange}
        />
        {this.renderTutorialModal(isChecklistActive, tutorialKey)}
        {!tutorialModalIsVisible && !isChecklistActive && (
          <ControlledJoyrideTutorial
            continuous={continuous}
            ignoreDidMount
            setTutorialIsRunning={isRunning => this.setState({ tutorialIsRunning: isRunning })}
            setTutorialStepIndex={stepIndex => this.setState({ tutorialStepIndex: stepIndex })}
            tutorialIsRunning={tutorialIsRunning}
            tutorialKey={tutorialKey}
            tutorialStepIndex={tutorialStepIndex}
            tutorialSteps={tutorialSteps}
          />
        )}
      </>
    );
  }
}

DefaultTableView.propTypes = {
  assessmentsIds: PropTypes.array,
  assessments: PropTypes.array,
  classes: PropTypes.object,
  color: PropTypes.string,
  goToPage: PropTypes.func,
  group: PropTypes.object,
  history: PropTypes.object,
  isChecklistActive: PropTypes.bool,
  isMobile: PropTypes.bool,
  isMobilePortrait: PropTypes.bool,
  isModalActive: PropTypes.bool,
  onAction: PropTypes.func,
  onAllAssessmentsSelect: PropTypes.func,
  onAssessmentsIdsChange: PropTypes.func,
  onOrderByChange: PropTypes.func,
  onTextButtonClick: PropTypes.func,
  orderBy: PropTypes.string,
  size: PropTypes.object,
  user: PropTypes.object,
  groups: PropTypes.object,
};

export default compose(
  withRouter,
  withStyles(styles),
)(DefaultTableView);
