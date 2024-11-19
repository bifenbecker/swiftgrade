import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import SubmissionError from 'redux-form/lib/SubmissionError';
import { FormattedMessage } from 'react-intl';
import { Grid } from '@material-ui/core';
import { IconClosePopup } from 'components/Svgs';
import { Loading } from 'components/Controls';
import { Map } from 'immutable';
import _, { get as lodashGet } from 'lodash';
import { isDirty } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { formatAssessmentsItems } from 'utils/helpers/assessments';
import { getUserData } from 'utils/helpers/usersHelper';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { getGroupRequest, setGroup } from 'containers/Groups/actions';
import { makeSelectGroup } from 'containers/Groups/selectors';
import { getCurrentUserRequest, resetForm, updateCurrentUserRequest } from 'containers/App/actions';
import { withStyles } from '@material-ui/core/styles';
import ControlledJoyrideTutorial from 'components/ControlledJoyrideTutorial';
import { VideoPlayerModal } from 'components/Modals';
import { showModal, hideModal } from 'components/Modals/Modal/actions';
import {
  ASSESSMENT_RESULTS_HELP_TUTORIAL,
  CREATE_ASSESSMENT_HELP_TUTORIAL,
  CREATE_CUSTOM_SHEET_VIDEO_POPUP,
  POPUP_WELCOME_CREATE_ASSESSMENT_VIDEO,
  TUTORIAL_ASSESSMENT_ANSWERS_CREATION,
} from 'globalConstants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import { isPopupDisplayable, isTutorialDisplayable } from 'utils/helpers/tutorialHelpers';
import { isTutorialDisplayable } from 'utils/helpers/tutorialHelpers';

import groupsReducer from 'containers/Groups/reducer';
import groupsSaga from 'containers/Groups/saga';

import {
  checkAssessmentNameRequest,
  createAssessmentRequest,
  getAssessmentNameRequest,
  setAssessmentDetails,
  setCalculator,
} from '../../config/actions';
import { makeSelectCalculator, makeSelectAssessmentDetails } from '../../config/selectors';
import reducer from '../../config/reducer';
import saga from '../../config/saga';
import { styles } from './styles';

import { Calculator, Content, Header, LeaveModalView, SelectTypeModalView } from '../Views';
import messages from './messages';
import { onInternetConnectionLoss, showAnswersErrors } from '../Views/modals';
import { TUTORIAL_STEPS_ANSWER_KEY, VIDYARD_UUID_ANSWER_KEY } from './config';

class CreateAssessment extends Component {
  constructor(props) {
    super(props);
    this.page = React.createRef();

    this.state = {
      tutorialIsRunning: false,
      // tutorialModalIsVisible: false,
      tutorialStepIndex: 0,
    };
  }

  componentDidMount() {
    const { user } = this.props;

    if (!user) {
      const handleSuccess = data => {
        this.setTutorialModalVisibility(data);
      };
      const userData = getUserData();
      this.props.getCurrentUserRequest({ userId: userData.user_id, handleSuccess });
    } else {
      this.setTutorialModalVisibility(user);
    }
  }

  componentWillMount() {
    const { groupId, group } = this.props;
    if (!(group && group.id && group.id === Number(group.id))) {
      this.props.getGroupRequest({ groupId });
    }
    this.props.getAssessmentNameRequest({ groupId });
  }

  componentDidUpdate(prevProps) {
    const { assessmentDetails: details } = this.props;
    const { assessmentDetails: prevDetails } = prevProps;

    const scrollTo = details.get('scrollTo');
    const prevScrollTo = prevDetails.get('scrollTo');

    const { user } = this.props;
    const enabledTutorials = lodashGet(user, 'enabled_tutorials');

    if (prevScrollTo !== scrollTo && scrollTo === 'top') {
      const assessmentName = document.getElementById('assessment-name');

      if (assessmentName) {
        assessmentName.scrollIntoView(false);
      }

      const assessmentDetails = details.set('scrollTo', null);
      this.props.setAssessmentDetails(assessmentDetails);
    }

    if (enabledTutorials && enabledTutorials[TUTORIAL_ASSESSMENT_ANSWERS_CREATION]) {
      return {
        tutorialIsRunning: true,
      };
    }
  }

  getAssessmentTutorialAnswerKey = () => {
    const { user } = this.props;
    const { tutorialIsRunning } = this.state;
    const enabledTutorials = lodashGet(user, 'enabled_tutorials');
    const enabledPopups = lodashGet(user, 'enabled_popups');

    if (user && !enabledPopups[POPUP_WELCOME_CREATE_ASSESSMENT_VIDEO]) {
      // if (!tutorialIsRunning) {
      //   this.setState({ tutorialIsRunning: true });
      // }
      if (enabledTutorials[TUTORIAL_ASSESSMENT_ANSWERS_CREATION]) {
        return {
          continuous: true,
          tutorialKey: TUTORIAL_ASSESSMENT_ANSWERS_CREATION,
          tutorialSteps: TUTORIAL_STEPS_ANSWER_KEY[TUTORIAL_ASSESSMENT_ANSWERS_CREATION],
        };
      }
      if (!tutorialIsRunning) {
        this.setState({ tutorialIsRunning: true });
      }
      if (enabledTutorials[ASSESSMENT_RESULTS_HELP_TUTORIAL]) {
        return {
          continuous: false,
          tutorialKey: ASSESSMENT_RESULTS_HELP_TUTORIAL,
          tutorialSteps: TUTORIAL_STEPS_ANSWER_KEY[ASSESSMENT_RESULTS_HELP_TUTORIAL],
        };
      }
    }

    return {
      continuous: false,
      tutrialKey: null,
      tutorialSteps: [],
    };
  };

  componentWillUnmount() {
    this.props.resetForm('AssessmentForm');
    this.props.setAssessmentDetails(
      Map({
        errors: null,
        is_calculator: false,
        name: null,
        scrollTo: null,
      }),
    );
    this.props.hideModal();
    this.props.setCalculator(null);
    this.props.setGroup(null);
  }

  createAssessment = (formData, type, compareByCharacters = null) => {
    const {
      assessmentDetails,
      classes,
      group,
      groupId,
      history,
      isOnline,
      hideModal: onClose,
      showModal: onShowModal,
    } = this.props;

    if (!isOnline) {
      const data = { classes, group, onClose, onShowModal };
      onInternetConnectionLoss(data);
      return null;
    }

    const data = formData && formData.toJS ? formData.toJS() : null;
    if (!_.isNull(data)) {
      return new Promise((resolve, reject) => {
        const handleErrors = response => {
          const assessmentProps = {
            assessmentDetails,
            group,
            onClose,
            onShowSelectTypeModal: this.onShowSelectTypeModal,
            onShowModal,
            setAssessmentDetails: this.props.setAssessmentDetails,
            createAssessment: this.createAssessment,
            formData,
          };
          showAnswersErrors(response.errors, assessmentProps);
          reject(new SubmissionError(response.errors));
        };

        const handleSuccess = responseData => {
          this.props.hideModal();
          this.props.resetForm('AssessmentForm');
          history.push({
            pathname: `/groups/${groupId}/assessments/`,
            state: {
              sheetKind: responseData.kind,
              sheetType: responseData.type,
            },
          });
        };

        const items = formatAssessmentsItems(data.assessment_items, groupId);
        this.props.createAssessmentRequest({
          data: {
            assessment_items: items,
            group_id: groupId,
            name: data.name,
            type,
            compare_by_characters: compareByCharacters,
          },
          handleErrors,
          handleSuccess,
        });
      });
    }
  };

  checkAssessmentName = name => {
    const { assessmentDetails, groupId } = this.props;

    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        const details = assessmentDetails.set('errors', response.errors);
        this.props.setAssessmentDetails(details);
        reject();
      };
      const handleSuccess = () => {
        resolve();
      };
      this.props.checkAssessmentNameRequest({
        data: { name, group_id: groupId },
        handleSuccess,
        handleErrors,
      });
    });
  };

  markStepAsCompleted = () => {
    const { user } = this.props;
    const dataToUpdate = { tutorialModalIsVisible: false };

    if (isTutorialDisplayable(user, CREATE_ASSESSMENT_HELP_TUTORIAL)) {
      dataToUpdate.tutorialIsRunning = true;
    }

    this.setState(dataToUpdate);
    const enabledPopups = {
      ...user.enabled_popups,
      [CREATE_CUSTOM_SHEET_VIDEO_POPUP]: false,
    };
    this.props.updateCurrentUserRequest({
      data: { enabled_popups: enabledPopups },
      userId: user.id,
    });
  };

  onShowSelectTypeModal = (formData, compareByCharacters = false) => {
    const { classes, hideModal: onClose } = this.props;
    this.props.showModal({
      title: (
        <Fragment>
          <div className={classes.select_type_modal_title}>
            <FormattedMessage {...messages.selectType} />
          </div>
          <span className={classes.select_type_modal_close}>
            <IconClosePopup onClick={onClose} />
          </span>
        </Fragment>
      ),
      body: (
        <SelectTypeModalView
          formData={formData}
          onCreate={(data, type) => this.createAssessment(formData, type, compareByCharacters)}
        />
      ),
      withBorder: false,
    });
  };

  onBackButtonClick = () => {
    const { group, history } = this.props;
    this.props.showModal({
      title: <FormattedMessage {...messages.leavePageTitle} />,
      body: <LeaveModalView group={group} history={history} hideModal={this.props.hideModal} />,
    });
  };

  setTutorialModalVisibility = userData => {
    // if (isPopupDisplayable(userData, CREATE_CUSTOM_SHEET_VIDEO_POPUP)) {
    //  this.setState({ tutorialModalIsVisible: true });
    // } else
    if (isTutorialDisplayable(userData, CREATE_ASSESSMENT_HELP_TUTORIAL)) {
      this.setState({ tutorialIsRunning: true });
    }
  };

  tutorialOkClick = () => {
    const { user } = this.props;
    // this.setState({ tutorialModalIsVisible: false });

    if (isTutorialDisplayable(user, CREATE_ASSESSMENT_HELP_TUTORIAL)) {
      this.setState({ tutorialIsRunning: true });
    }
  };

  renderLoading = classes => (
    <div className={classes.loading}>
      <Loading />
    </div>
  );

  renderCreateAssessmentVideoPlayerModal = user =>
    lodashGet(user, 'enabled_popups.welcome_create_assessment_video', false) && (
      <VideoPlayerModal
        name={POPUP_WELCOME_CREATE_ASSESSMENT_VIDEO}
        titleContent={
          <div>
            <FormattedMessage {...messages.createAssessmentTutorialTitle} />
          </div>
        }
        uuid={VIDYARD_UUID_ANSWER_KEY}
        user={user}
        hideModal={this.props.hideModal}
        showModal={this.props.showModal}
        updateCurrentUserRequest={this.props.updateCurrentUserRequest}
      />
    );

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
    const {
      assessmentDetails,
      calculator,
      classes,
      group,
      history,
      isFormDirty,
      isMobile,
      isMobilePortrait,
      size,
      user,
    } = this.props;
    // const { tutorialIsRunning, tutorialStepIndex, tutorialModalIsVisible } = this.state;
    const { tutorialIsRunning, tutorialStepIndex } = this.state;
    const { continuous, tutorialKey, tutorialSteps } = this.getAssessmentTutorialAnswerKey();
    // console.log('tutorialModalIsVisible', tutorialModalIsVisible); // check if this variable is needed

    if (_.isNull(group) || group.isLoading) {
      return this.renderLoading(classes);
    }

    return (
      <>
        <ControlledJoyrideTutorial
          continuous={continuous}
          // ignoreDidMount
          setTutorialIsRunning={isRunning => this.setState({ tutorialIsRunning: isRunning })}
          setTutorialStepIndex={stepIndex => this.setState({ tutorialStepIndex: stepIndex })}
          tutorialIsRunning={tutorialIsRunning}
          tutorialStepIndex={tutorialStepIndex}
          tutorialSteps={tutorialSteps}
          tutorialKey={tutorialKey}
        />

        <Grid id="create-assessment" alignItems="flex-start" container direction="column" justify="space-between">
          <Header
            group={group}
            history={history}
            isDirty={isFormDirty}
            isMobilePortrait={isMobilePortrait}
            checkAssessmentName={this.checkAssessmentName}
            hideModal={this.props.hideModal}
            onBackButtonClick={this.onBackButtonClick}
            // setTutorialModalVisibility={() => {
            //   this.setState({ tutorialModalIsVisible: true });
            // }}
          />
          <Content
            assessmentDetails={assessmentDetails}
            group={group}
            history={history}
            isMobile={isMobile}
            size={size}
            calculator={calculator}
            renderCalculatorComponent={
              calculator && calculator.key === 'unit' && isMobile && this.renderCalculatorComponent()
            }
            selectAssessmentType={data => {
              this.createAssessment(data, '').catch(({ errors }) => {
                if (_.isEqual(Object.keys(errors), ['type'])) {
                  this.onShowSelectTypeModal(data);
                }
              });
            }}
          />
          {calculator && ((isMobile && calculator.key !== 'unit') || !isMobile) && this.renderCalculatorComponent()}
        </Grid>
        {this.renderCreateAssessmentVideoPlayerModal(user)}
      </>
    );
  }
}

CreateAssessment.propTypes = {
  assessmentDetails: PropTypes.any,
  calculator: PropTypes.object,
  checkAssessmentNameRequest: PropTypes.func,
  classes: PropTypes.object,
  createAssessmentRequest: PropTypes.func,
  getAssessmentNameRequest: PropTypes.func,
  getCurrentUserRequest: PropTypes.func,
  getGroupRequest: PropTypes.func,
  group: PropTypes.object,
  groupId: PropTypes.any,
  hideModal: PropTypes.func,
  history: PropTypes.object,
  isFormDirty: PropTypes.bool,
  isMobile: PropTypes.bool,
  isMobilePortrait: PropTypes.bool,
  isOnline: PropTypes.bool,
  size: PropTypes.object,
  resetForm: PropTypes.func,
  setAssessmentDetails: PropTypes.func,
  setCalculator: PropTypes.func,
  setGroup: PropTypes.func,
  showModal: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  assessmentDetails: makeSelectAssessmentDetails(),
  calculator: makeSelectCalculator(),
  group: makeSelectGroup(),
  isFormDirty: state => isDirty('AssessmentForm')(state),
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  checkAssessmentNameRequest,
  createAssessmentRequest,
  getAssessmentNameRequest,
  getCurrentUserRequest,
  getGroupRequest,
  hideModal,
  resetForm,
  setAssessmentDetails,
  setCalculator,
  setGroup,
  showModal,
  updateCurrentUserRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withGroupsReducer = injectReducer({ key: 'groups', reducer: groupsReducer });
const withGroupsSaga = injectSaga({ key: 'groups', saga: groupsSaga });
const withReducer = injectReducer({ key: 'assessments', reducer });
const withSaga = injectSaga({ key: 'assessments', saga });

export default compose(
  withConnect,
  withGroupsReducer,
  withGroupsSaga,
  withReducer,
  withSaga,
  withStyles(styles),
)(CreateAssessment);
