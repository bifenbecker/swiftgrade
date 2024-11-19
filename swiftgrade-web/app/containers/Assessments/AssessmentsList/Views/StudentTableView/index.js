import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AssessmentsStudentsTitle, Table } from 'components/DataDisplay';
import { FormattedMessage } from 'react-intl';
import { IconFolder, IconEmptyCompletedAssessments } from 'components/Svgs';
import _, { get as lodashGet } from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ControlledJoyrideTutorial from 'components/ControlledJoyrideTutorial';

import { TUTORIAL_STUDENT_AVAILABLE_TAB } from 'globalConstants';
import { TUTORIAL_TABS } from './config';

import { ASSIGNED_COLUMNS } from '../../tableConfigs/assigned_config';
import { COMPLETED_COLUMNS } from '../../tableConfigs/completed_config';
import {
  MOBILE_PORTRAIT_TABLE_STYLE,
  MOBILE_PORTRAIT_TABLE_CONTAINER_STYLE,
  TABLE_STYLE,
} from '../../tableConfigs/config';

import { styles } from './styles';
import '../../styles.scss';
import messages from './messages';

class StudentTableView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tutorialIsRunning: false,
      tutorialStepIndex: 0,
      tutorialSteps: TUTORIAL_TABS,
    };
  }

  componentDidMount() {
    const { user } = this.props;
    const enabledTutorials = lodashGet(user, 'enabled_tutorials');

    if (enabledTutorials && enabledTutorials[TUTORIAL_STUDENT_AVAILABLE_TAB]) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ tutorialIsRunning: true });
    }
  }

  onAction = (e, assessment, key) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    const { group, history } = this.props;
    if (key === 'ready_to_start') {
      history.push(`/groups/${group.id}/assessments/${assessment.id}/start/`);
    } else {
      history.push(
        `/groups/${group.id}/assessments/${assessment.id}/student_results/${
          assessment.completed_assessment_id
        }/?kind=result`,
      );
    }
  };

  renderTitle = (classes, kind) => (
    <div className={classes.title}>
      <div className={classes.assessments_students_title_block}>
        <AssessmentsStudentsTitle keyName={`${kind}_assessments`} />
      </div>
    </div>
  );

  getTabsTutorial = () => {
    const { user } = this.props;
    const { tutorialKey, tutorialSteps } = this.state;
    const enabledTutorials = lodashGet(user, 'enabled_tutorials');

    if (user && enabledTutorials && enabledTutorials[TUTORIAL_STUDENT_AVAILABLE_TAB]) {
      return {
        tutorialKey: TUTORIAL_STUDENT_AVAILABLE_TAB,
        tutorialSteps: TUTORIAL_TABS[TUTORIAL_STUDENT_AVAILABLE_TAB],
      };
    }

    return {
      tutrialKey: tutorialKey,
      tutorialSteps: tutorialSteps[tutorialKey],
    };
  };

  renderTutorial = () => {
    const { tutorialIsRunning, tutorialStepIndex } = this.state;
    const { tutorialKey, tutorialSteps } = this.getTabsTutorial();
    return (
      <ControlledJoyrideTutorial
        continuous
        ignoreDidMount
        setTutorialIsRunning={isRunning => this.setState({ tutorialIsRunning: isRunning })}
        setTutorialStepIndex={stepIndex => this.setState({ tutorialStepIndex: stepIndex })}
        tutorialIsRunning={tutorialIsRunning}
        tutorialStepIndex={tutorialStepIndex}
        tutorialSteps={tutorialSteps}
        tutorialKey={tutorialKey}
      />
    );
  };

  render() {
    const { assessments, classes, group, isMobilePortrait, kind, user, size, isMobile } = this.props;
    const tableHeight = size.height - 70;

    if (_.isEmpty(assessments)) {
      const Icon = kind === 'completed' ? IconEmptyCompletedAssessments : IconFolder;
      const message = kind === 'completed' ? messages.noCompletedWork : messages.teacherNotAssignedAnything;

      return (
        <>
          {this.renderTutorial()}
          <div className={classes.empty_assessments_container}>
            {this.renderTitle(classes, kind)}
            <div className={classes.empty_assessments}>
              <div className={classes.empty_student_assessments}>
                <Icon className={classes.empty_student_assessments_icon} color={group.color} />
                <div className={classNames(classes.empty_assessments_text)}>
                  <FormattedMessage {...message} />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    const COLUMNS = kind === 'completed' ? COMPLETED_COLUMNS : ASSIGNED_COLUMNS;
    const tableStyle = isMobilePortrait ? MOBILE_PORTRAIT_TABLE_STYLE : TABLE_STYLE;

    return (
      <>
        {this.renderTutorial()}
        <Table
          columns={COLUMNS({
            classes,
            group,
            isMobilePortrait,
            user,
            onAction: this.onAction,
            isMobile,
          })}
          containerStyle={isMobilePortrait ? MOBILE_PORTRAIT_TABLE_CONTAINER_STYLE : { maxHeight: tableHeight }}
          data={assessments}
          stickyHeader={false}
          style={tableStyle}
          tableRootClass={classNames(classes.table_root_class, { isMobilePortrait })}
          title={this.renderTitle(classes)}
        />
      </>
    );
  }
}

StudentTableView.propTypes = {
  assessments: PropTypes.array,
  classes: PropTypes.object,
  color: PropTypes.string,
  group: PropTypes.object,
  history: PropTypes.object,
  isMobilePortrait: PropTypes.bool,
  kind: PropTypes.string,
  size: PropTypes.object,
  user: PropTypes.object,
  isMobile: PropTypes.bool,
  getAssessments: PropTypes.func,
};

export default compose(withStyles(styles))(StudentTableView);
