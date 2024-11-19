import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import _ from 'lodash';
import { SubmissionError } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';

import ControlledJoyrideTutorial from 'components/ControlledJoyrideTutorial';
import { Loading } from 'components/Controls';
import { AssessmentSettingsForm } from 'components/Forms';
import { AssessmentLayout } from 'components/Layouts';
import saga from 'containers/Assessments/config/saga';
import reducer from 'containers/Assessments/config/reducer';
import {
  ASSESSMENTS_SETTINGS_ANTI_CHEATING_ID,
  ASSESSMENTS_SETTINGS_ANTI_CHEATING_LABEL_ID,
  ASSESSMENTS_SETTINGS_ATTACHMENTS_ID,
  ASSESSMENTS_SETTINGS_RELEASE_BTN_ID,
  ASSESSMENTS_SETTINGS_RELEASE_ID,
  BODY_ID,
} from 'globalConstants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import messages from './messages';
import { styles } from './styles';
import {
  AssessmentSettingsAntiCheatingStepContent,
  AssessmentSettingsAttachmentsStepContent,
  AssessmentSettingsReleaseStepContent,
  AssessmentSettingsBodyStepContent,
} from './TutorialStepsContent';
import { assignAssessmentRequest, getAssessmentRequest, setAssessment } from '../config/actions';
import { makeSelectAssessment } from '../config/selectors';

class AssessmentSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keySubmit: 'submit',
      tutorialIsRunning: false,
      tutorialKey: 'assessment_settings_page',
      tutorialStepIndex: 0,
      tutorialSteps: [
        {
          target: BODY_ID,
          content: <AssessmentSettingsBodyStepContent />,
          disableBeacon: true,
          placement: 'center',
        },
        {
          target: `div[id="${ASSESSMENTS_SETTINGS_ATTACHMENTS_ID}"]`,
          content: <AssessmentSettingsAttachmentsStepContent />,
          placement: 'left',
          disableBeacon: true,
          stepStyle: { maxWidth: '600px' },
        },
        {
          target: `div[id="${ASSESSMENTS_SETTINGS_ANTI_CHEATING_ID}"] label[class*="${ASSESSMENTS_SETTINGS_ANTI_CHEATING_LABEL_ID}"]`,
          content: <AssessmentSettingsAntiCheatingStepContent />,
          stepStyle: { maxWidth: '600px' },
          disableBeacon: true,
          placement: 'right',
        },
        {
          target: `div[id*="${ASSESSMENTS_SETTINGS_RELEASE_ID}"] button[class*="${ASSESSMENTS_SETTINGS_RELEASE_BTN_ID}"]`,
          content: <AssessmentSettingsReleaseStepContent />,
          locale: { last: <FormattedMessage {...messages.done} /> },
          disableBeacon: true,
        },
      ],
    };
  }

  componentWillMount() {
    const { assessmentId } = this.props;
    this.props.getAssessmentRequest({ assessmentId, data: {} });
  }

  componentWillUnmount() {
    this.props.setAssessment(null);
  }

  getTimerValue = data => {
    const value = data.timer_value;
    if (_.isNull(value)) {
      return null;
    }
    if (['0', ''].includes(value.trim())) {
      return 0;
    }
    return parseInt(value, 10);
  };

  assignAssessment = formData => {
    if (this.state.keySubmit === 'cancel') {
      return null;
    }
    const { assessmentId, groupId } = this.props;
    const data = formData && formData.toJS ? formData.toJS() : null;
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };
      const handleSuccess = () => {
        const { history } = this.props;
        history.push({
          pathname: `/groups/${groupId}/assessments/`,
          state: { onlineSheetReleased: true, assessment_id: Number(assessmentId) },
        });
      };
      data.group_id = groupId;
      data.timer_value = this.getTimerValue(data);
      this.props.assignAssessmentRequest({ data, assessmentId, handleSuccess, handleErrors });
    });
  };

  renderHeader = () => {
    const { assessment, classes, history } = this.props;
    return (
      <AssessmentLayout group={assessment.group} history={history}>
        <div className={classes.assessment_name}>
          <FormattedMessage {...messages.assessmentSettingsTitle} values={{ name: assessment.name }} />
        </div>
      </AssessmentLayout>
    );
  };

  render() {
    const { assessment, assessmentId, classes } = this.props;
    const { tutorialIsRunning, tutorialKey, tutorialStepIndex, tutorialSteps } = this.state;

    if (_.isNull(assessment) || (assessment && assessment.isLoading)) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }

    return (
      <Fragment>
        <ControlledJoyrideTutorial
          continuous
          setTutorialIsRunning={isRunning => this.setState({ tutorialIsRunning: isRunning })}
          setTutorialStepIndex={stepIndex => this.setState({ tutorialStepIndex: stepIndex })}
          tutorialIsRunning={tutorialIsRunning}
          tutorialKey={tutorialKey}
          tutorialStepIndex={tutorialStepIndex}
          tutorialSteps={tutorialSteps}
        />

        {this.renderHeader()}
        <AssessmentSettingsForm
          assessment={assessment}
          assessmentId={assessmentId}
          onSubmit={this.assignAssessment}
          setKeySubmit={key => {
            this.setState({ keySubmit: key });
          }}
        />
      </Fragment>
    );
  }
}

AssessmentSettings.propTypes = {
  assessment: PropTypes.object,
  assessmentId: PropTypes.string,
  assignAssessmentRequest: PropTypes.func,
  classes: PropTypes.object,
  getAssessmentRequest: PropTypes.func,
  groupId: PropTypes.string,
  history: PropTypes.object,
  location: PropTypes.object,
  setAssessment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  assessment: makeSelectAssessment(),
});

const mapDispatchToProps = {
  assignAssessmentRequest,
  getAssessmentRequest,
  setAssessment,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'assessments', saga });
const withReducer = injectReducer({ key: 'assessments', reducer });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  withStyles(styles),
)(AssessmentSettings);
