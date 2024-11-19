import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SubmissionError from 'redux-form/lib/SubmissionError';
import { FormattedMessage } from 'react-intl';
import { Grid } from '@material-ui/core';
import { Loading, DefaultButton } from 'components/Controls';
import { Map } from 'immutable';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import { showModal, hideModal } from 'components/Modals/Modal/actions';
import { resetForm, updateCurrentUserRequest, getCurrentUserRequest } from 'containers/App/actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { formatAssessmentsItems } from 'utils/helpers/assessments';
import {
  getAssessmentRequest,
  getResultsRequest,
  setAssessment,
  setAssessmentDetails,
  setCalculator,
  updateAssessmentRequest,
} from 'containers/Assessments/config/actions';
import {
  makeSelectAnswerSheetPreview,
  makeSelectAssessment,
  makeSelectAssessmentDetails,
  makeSelectResults,
  makeSelectCalculator,
} from 'containers/Assessments/config/selectors';
import reducer from 'containers/Assessments/config/reducer';
import saga from 'containers/Assessments/config/saga';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { getUserData } from 'utils/helpers/usersHelper';
import { styles } from './styles';

import {
  AssessmentValidationInfo,
  Calculator,
  Content,
  Header,
  LeaveModalView,
  RemarkManualGradingBody,
  RemarkResultsModalView,
} from '../Views';
import messages from './messages';
import { onInternetConnectionLoss, showAnswersErrors } from '../Views/modals';

class Assessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAssessmentChanged: false,
    };
  }

  componentWillMount() {
    const { assessmentId } = this.props;
    const userData = getUserData();
    const userHandleSuccess = user => {
      const handleSuccess = assessmentData => {
        if (assessmentData && assessmentData.results_exist && user && user.enabled_popups.edit_assessment) {
          this.onRemarkResultsModal();
        }
      };
      this.props.getAssessmentRequest({ assessmentId, data: { key: 'edit' }, handleSuccess });
    };
    this.props.getCurrentUserRequest({ userId: userData.user_id, handleSuccess: userHandleSuccess });
  }

  componentWillUnmount() {
    this.props.resetForm('AssessmentForm');
    this.props.hideModal();
    this.props.setAssessment(null);
    this.props.setAssessmentDetails(
      Map({
        errors: null,
        is_calculator: false,
        name: null,
        scrollTo: null,
      }),
    );
    this.props.setCalculator(null);
  }

  componentDidUpdate(prevProps) {
    const { assessment } = this.props;
    const { assessment: prevAssessment } = prevProps;

    const assessmentExists = prevAssessment !== assessment && _.has(assessment, 'status');

    if (assessmentExists && assessment.compare_by_characters && !_.isNil(assessment.group)) {
      this.onValidationInfo();
    }
    if (
      assessmentExists &&
      !_.isNull(assessment.group) &&
      assessment.status === 'ready_for_scan' &&
      assessment.kind === 'custom'
    ) {
      this.onWarningModal();
    }
  }

  getCompareByCharactersNumbers = assessmentItems => {
    const compareByCharactersIndexes = [];
    let compareByCharactersAnswer = '';
    assessmentItems.forEach(item => {
      if (item.kind === 'mf' && _.has(item, 'answers')) {
        item.answers.forEach(answer => {
          if (
            _.has(answer, 'body') &&
            _.has(answer.body, 'valid') &&
            answer.body.valid === false &&
            !compareByCharactersIndexes.includes(item.number)
          ) {
            compareByCharactersIndexes.push(item.number);
          }
        });
      }
    });
    if (compareByCharactersIndexes.length > 0) {
      compareByCharactersIndexes.forEach((value, index) => {
        if (index === 0) {
          compareByCharactersAnswer = `Answer #${value}`;
        } else if (index + 1 === compareByCharactersIndexes.length) {
          compareByCharactersAnswer += ` and ${value}`;
        } else {
          compareByCharactersAnswer += `, ${value}`;
        }
      });
    }
    return { compare_by_characters: compareByCharactersAnswer };
  };

  getRemarkType = (assessment, remarkData) => {
    if (assessment.results_exist && assessment.is_manually_graded) {
      return remarkData ? remarkData.remark_type : '';
    }
    return null;
  };

  onAssessmentChange = () => {
    this.setState({ isAssessmentChanged: true });
  };

  onBackButtonClick = () => {
    const { assessment, history } = this.props;
    this.props.showModal({
      title: <FormattedMessage {...messages.leavePageTitle} />,
      body: <LeaveModalView group={assessment.group} history={history} hideModal={this.props.hideModal} />,
    });
  };

  onRemarkTypeModal = (formData, compareByCharacters) => {
    const { assessment } = this.props;
    this.props.showModal({
      title: <FormattedMessage {...messages.replaceManualGrading} />,
      body: (
        <RemarkManualGradingBody
          assessment={assessment}
          onCancel={this.props.hideModal}
          onSubmit={remarkTypeData => this.updateAssessment(formData, compareByCharacters, remarkTypeData)}
        />
      ),
    });
  };

  onRemarkResultsModal = () => {
    // const { assessment } = this.props;

    this.props.showModal({
      title: <FormattedMessage {...messages.remarkResultsTitle} />,
      body: (
        <RemarkResultsModalView
          hideModal={this.props.hideModal}
          onClickDoNotShowAgain={this.updateUser}
          // groupColor={assessment.group.color}
        />
      ),
    });
  };

  // onValidationInfo = () => {
  //   const { assessment } = this.props;
  //   const { group } = assessment;
  //   const validationInfo = this.getCompareByCharactersNumbers(assessment.assessment_items);
  //
  //   if (validationInfo.compare_by_characters.length > 0) {
  //     this.props.showModal({
  //       title: <FormattedMessage {...messages.MFCouldNotBeValidatedTitle} />,
  //       body: (
  //         <AssessmentValidationInfo data={validationInfo} group={group} onClose={this.props.hideModal} action="edit" />
  //       ),
  //     });
  //   }
  // };

  onValidationInfo = () => {
    const { assessment } = this.props;
    const { group } = assessment;

    this.props.showModal({
      title: <FormattedMessage {...messages.MFCouldNotBeValidatedTitle} />,
      body: (
        <AssessmentValidationInfo
          data={this.getCompareByCharactersNumbers(assessment.assessment_items)}
          group={group}
          onClose={this.props.hideModal}
          action="edit"
        />
      ),
    });
  };

  onWarningModal = () => {
    this.props.showModal({
      title: <FormattedMessage {...messages.warning} />,
      body: this.onWarningModalBody(),
    });
  };

  onWarningModalBody = () => {
    const { assessment, classes } = this.props;
    return (
      <Fragment>
        <div>
          <FormattedMessage {...messages.warningBodyFirst} />
          <br />
          <br />
          <FormattedMessage {...messages.warningBodySecond} />
        </div>
        <div className={classes.warning_modal_button}>
          <DefaultButton
            backgroundColor={assessment.group.color}
            onClick={() => this.props.hideModal()}
            text={<FormattedMessage {...messages.okay} />}
          />
        </div>
      </Fragment>
    );
  };

  updateAssessment = (formData, compareByCharacters = null, remarkTypeData = null) => {
    const {
      assessment,
      assessmentId,
      assessmentDetails,
      classes,
      groupId,
      history,
      isOnline,
      showModal: onShowModal,
      hideModal: onClose,
    } = this.props;
    const group = assessment && assessment.group ? assessment.group : null;

    if (!isOnline && group) {
      const data = { classes, group, onClose, onShowModal };
      onInternetConnectionLoss(data);
      return null;
    }

    const data = formData && formData.toJS ? formData.toJS() : null;
    if (!_.isNull(data)) {
      return new Promise((resolve, reject) => {
        const handleErrors = response => {
          if (_.isEqual(Object.keys(response.errors), ['remark_type'])) {
            this.onRemarkTypeModal(formData, compareByCharacters);
          } else {
            const assessmentProps = {
              assessmentDetails,
              group,
              formData,
              onClose,
              onShowModal,
              updateAssessment: this.updateAssessment,
            };
            showAnswersErrors(response.errors, assessmentProps);
          }
          reject(new SubmissionError(response.errors));
        };
        const handleSuccess = () => {
          this.props.hideModal();
          this.props.resetForm('AssessmentForm');
          history.push(`/groups/${groupId}/assessments/`);
        };
        const items = formatAssessmentsItems(data.assessment_items, groupId);
        const remarkData = remarkTypeData && remarkTypeData.toJS ? remarkTypeData.toJS() : null;

        this.props.updateAssessmentRequest({
          assessmentId,
          data: {
            assessment_items: items,
            compare_by_characters: compareByCharacters,
            remark_type: this.getRemarkType(assessment, remarkData),
          },
          groupId,
          handleErrors,
          handleSuccess,
          isEditAssessmentItems: true,
        });
      });
    }
  };

  updateUser = () => {
    const { user } = this.props;
    const enabledPopups = _.cloneDeep(user.enabled_popups);
    enabledPopups.edit_assessment = false;
    this.props.updateCurrentUserRequest({
      data: { enabled_popups: enabledPopups },
      userId: user.id,
    });
    this.props.hideModal();
  };

  renderCalculatorComponent = () => {
    const { assessmentDetails, calculator, isMobile, size } = this.props;
    return (
      !_.isEmpty(calculator) && (
        <Calculator
          assessmentDetails={assessmentDetails}
          calculator={calculator}
          isMobile={isMobile}
          size={size}
          setAssessmentDetails={this.props.setAssessmentDetails}
          setCalculator={this.props.setCalculator}
        />
      )
    );
  };

  render() {
    const { assessment, assessmentDetails, calculator, classes, history, isMobile, size } = this.props;
    const { isAssessmentChanged } = this.state;

    if (_.isNull(assessment) || assessment.isLoading) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }

    return (
      <Grid container direction="column" justify="space-between" alignItems="flex-start">
        <Header
          assessment={assessment}
          group={assessment.group}
          history={history}
          isDirty={isAssessmentChanged}
          onBackButtonClick={this.onBackButtonClick}
        />
        <Content
          assessmentDetails={assessmentDetails}
          assessment={assessment}
          group={assessment.group}
          isAssessmentChanged={isAssessmentChanged}
          isMobile={isMobile}
          size={size}
          onAssessmentChange={this.onAssessmentChange}
          updateAssessment={this.updateAssessment}
          calculator={calculator}
          renderCalculatorComponent={
            calculator && calculator.key === 'unit' && isMobile && this.renderCalculatorComponent()
          }
        />
        {calculator && ((isMobile && calculator.key !== 'unit') || !isMobile) && this.renderCalculatorComponent()}
      </Grid>
    );
  }
}

Assessment.propTypes = {
  answerSheetPreview: PropTypes.object,
  assessment: PropTypes.object,
  assessmentId: PropTypes.any,
  assessmentDetails: PropTypes.any,
  calculator: PropTypes.object,
  classes: PropTypes.object,
  getAssessmentRequest: PropTypes.func,
  getResultsRequest: PropTypes.func,
  groupId: PropTypes.any,
  hideModal: PropTypes.func,
  history: PropTypes.object,
  isMobile: PropTypes.bool,
  isOnline: PropTypes.bool,
  resetForm: PropTypes.func,
  results: PropTypes.array,
  setAssessment: PropTypes.func,
  setAssessmentDetails: PropTypes.func,
  setCalculator: PropTypes.func,
  showModal: PropTypes.func,
  size: PropTypes.object,
  getCurrentUserRequest: PropTypes.func,
  updateAssessmentRequest: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  answerSheetPreview: makeSelectAnswerSheetPreview(),
  assessment: makeSelectAssessment(),
  assessmentDetails: makeSelectAssessmentDetails(),
  calculator: makeSelectCalculator(),
  results: makeSelectResults(),
  user: makeSelectCurrentUser(),
  // isFormDirty: state => isDirty('AssessmentForm')(state),
});

const mapDispatchToProps = {
  getAssessmentRequest,
  getCurrentUserRequest,
  getResultsRequest,
  resetForm,
  setAssessment,
  setAssessmentDetails,
  setCalculator,
  hideModal,
  showModal,
  updateAssessmentRequest,
  updateCurrentUserRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'assessments', reducer });
const withSaga = injectSaga({ key: 'assessments', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  withStyles(styles),
)(Assessment);
