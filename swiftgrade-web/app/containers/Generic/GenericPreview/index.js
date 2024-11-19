import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';

import Loading from 'components/Controls/Loading';
import ControlledJoyrideTutorial from 'components/ControlledJoyrideTutorial';
import { PNGAnswerSheetModal, SmallerASModal } from 'components/Modals';
import { makeSelectIsModalActive } from 'components/Modals/Modal/selectors';
import { showModal, hideModal } from 'components/Modals/Modal/actions';
import { getCurrentUserRequest, updateCurrentUserRequest } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import reducer from 'containers/Generic/reducer';
import saga from 'containers/Generic/saga';
import { getGroupsRequest, setGroups } from 'containers/Groups/actions';
import groupsReducer from 'containers/Groups/reducer';
import groupsSaga from 'containers/Groups/saga';
import { makeSelectGroups } from 'containers/Groups/selectors';
import {
  GENERIC_PREVIEW_CUSTOMIZE_ID,
  GENERIC_PREVIEW_DOWNLOAD_BUTTON_ID,
  GENERIC_PREVIEW_PAGE_TUTORIAL,
  GENERIC_PREVIEW_STUDENT_INFO_ID,
  GENERIC_SHEET_DISPLAYABLE_TUTORIAL_PROGRESS,
  GENERIC_PREVIEW_DOWNLOAD_BUTTON_LABEL_ID,
  BODY_ID,
} from 'globalConstants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getUserData } from 'utils/helpers/usersHelper';

import { styles } from './styles';
import Header from './Views/Header';
import Content from './Views/Content';
import { createDownloadGenericRequest, createGenericPreviewRequest, createGenericPreviewSuccess } from '../actions';
import { makeSelectLoading, makeSelectorGenericPreview } from '../selectors';
import {
  GenericMCAnswerSheets,
  GenericPreviewDownloadASStepContent,
  GenericPreviewStudentInfoStepContent,
} from './TutorialStepsContent';

import {
  DEFAULT_FILE_FORMAT,
  DEFAULT_NUMBER_OF_ANSWERS,
  DEFAULT_NUMBER_OF_LETTERS,
  DEFAULT_SHEETS_PER_PAGE,
} from './config';
import messages from './messages';

class GenericPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answersAmount: DEFAULT_NUMBER_OF_ANSWERS,
      downloadClicked: false,
      fileFormat: DEFAULT_FILE_FORMAT,
      group: null,
      height: window.innerHeight,
      isLoadingPdf: true,
      lettersAmount: DEFAULT_NUMBER_OF_LETTERS,
      selectedClasses: [],
      selectedClassIndex: null,
      sheetsPerPageAmount: DEFAULT_SHEETS_PER_PAGE,
      sheetsPerPageDisbled: false,
      studentNamesIncluded: false,
      tutorialIsRunning: false,
      tutorialKey: GENERIC_PREVIEW_PAGE_TUTORIAL,
      tutorialModalIsVisible: false,
      tutorialStepIndex: 0,
      tutorialSteps: [
        {
          target: BODY_ID,
          content: <FormattedMessage {...messages.generateMCAnswer} />,
          placement: 'center',
        },
        {
          target: BODY_ID,
          content: <GenericMCAnswerSheets />,
          placement: 'center',
        },
        {
          target: `div[id="${GENERIC_PREVIEW_STUDENT_INFO_ID}"] div[class*="MuiToggleButtonGroup-root"]`,
          content: <GenericPreviewStudentInfoStepContent />,
          disableBeacon: true,
        },
        {
          target: `div[id*="${GENERIC_PREVIEW_CUSTOMIZE_ID}"]`,
          content: <FormattedMessage {...messages.attachAssessmentCustomizeDescription} />,
          disableBeacon: true,
          placement: 'right',
        },
        {
          target: `button[id="${GENERIC_PREVIEW_DOWNLOAD_BUTTON_ID}"] span[class*="${GENERIC_PREVIEW_DOWNLOAD_BUTTON_LABEL_ID}"]`,
          content: <GenericPreviewDownloadASStepContent />,
          locale: { last: <FormattedMessage {...messages.done} /> },
          disableBeacon: true,
        },
      ],
    };
  }

  componentWillMount() {
    return new Promise(() => {
      const handleSuccess = groups => {
        if (_.isArray(groups)) {
          const { selectedClasses, selectedClassIndex, studentNamesIncluded } = this.setSelectedClass(groups);
          this.setState({
            group: selectedClasses.length > 0 ? selectedClasses[selectedClassIndex] : null,
            selectedClasses,
            selectedClassIndex,
            studentNamesIncluded, // selectedClasses.length > 0,
          });
          if (
            !_.isEmpty(selectedClasses) &&
            !_.isNull(selectedClassIndex) &&
            selectedClasses[selectedClassIndex].selected === true
          ) {
            this.createGenericPreview({
              id: selectedClasses[selectedClassIndex].id,
              name: selectedClasses[selectedClassIndex].name,
            });
          } else {
            this.createGenericPreview(null);
          }
        }
      };
      this.props.getGroupsRequest({
        handleSuccess,
      });
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);

    const handleSuccess = responseData => {
      if (_.get(responseData, `tutorials_progress.${GENERIC_SHEET_DISPLAYABLE_TUTORIAL_PROGRESS}`) === true) {
        const tutorialsProgress = {
          ...responseData.tutorials_progress,
          [GENERIC_SHEET_DISPLAYABLE_TUTORIAL_PROGRESS]: false,
        };

        this.props.updateCurrentUserRequest({
          data: { tutorials_progress: tutorialsProgress },
          userId: responseData.id,
        });
      }
    };

    const userData = getUserData();
    this.props.getCurrentUserRequest({ userId: userData.user_id, handleSuccess });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);

    this.props.createGenericPreviewSuccess(null);
    this.props.setGroups(null);
  }

  createGenericPreview = (
    className,
    answersAmount = this.state.answersAmount,
    lettersAmount = this.state.lettersAmount,
    sheetsPerPageAmount = this.state.sheetsPerPageAmount,
  ) => {
    const { isLoadingPdf } = this.state;

    const promise = new Promise(() => {
      const handleSuccess = () => {
        this.setState({ isLoadingPdf: false });
      };
      this.props.createGenericPreviewRequest({
        genericPreviewData: {
          class_name: className,
          number_of_answers: answersAmount,
          number_of_letters: lettersAmount,
          sheets_per_page: sheetsPerPageAmount,
        },
        handleSuccess,
      });
    });

    if (isLoadingPdf) {
      return promise;
    }
    this.setState(
      {
        isLoadingPdf: true,
      },
      () => promise,
    );
  };

  getFirstSelectedClassName = () => {
    const { groups } = this.props;
    const firstSelectedClass = groups.find((obj, index) => this.state.selectedClasses[index].selected === true);

    return firstSelectedClass ? { id: firstSelectedClass.id, name: firstSelectedClass.name } : null;
  };

  onChangeFileFormat = fileFormat => {
    const { classes, user } = this.props;
    const { answersAmount, lettersAmount, sheetsPerPageAmount } = this.state;

    const className = this.getFirstSelectedClassName();

    if (fileFormat !== DEFAULT_FILE_FORMAT) {
      if (
        user &&
        _.has(user, 'enabled_popups') &&
        (!_.has(user.enabled_popups, 'png_format') || user.enabled_popups.png_format)
      ) {
        PNGAnswerSheetModal({
          classes,
          user,
          hideModal: this.props.hideModal,
          showModal: this.props.showModal,
          onDoNotShowModal: this.onDoNotShowModal,
        });
      }

      if (sheetsPerPageAmount !== DEFAULT_SHEETS_PER_PAGE) {
        this.setState({ sheetsPerPageAmount: DEFAULT_SHEETS_PER_PAGE });
        this.createGenericPreview(className, answersAmount, lettersAmount, DEFAULT_SHEETS_PER_PAGE);
      }
      this.setState({ sheetsPerPageDisbled: true });
    } else {
      this.setState({ sheetsPerPageDisbled: false });
    }
    this.setState({ fileFormat });
  };

  onChangeNumberOfAnswers = answersAmount => {
    const { lettersAmount, sheetsPerPageAmount } = this.state;
    const className = this.getFirstSelectedClassName();

    this.createGenericPreview(className, answersAmount, lettersAmount, sheetsPerPageAmount);
    this.setState({ answersAmount });
  };

  onChangeNumberOfLetters = lettersAmount => {
    const { answersAmount, sheetsPerPageAmount } = this.state;
    const className = this.getFirstSelectedClassName();

    this.createGenericPreview(className, answersAmount, lettersAmount, sheetsPerPageAmount);
    this.setState({ lettersAmount });
  };

  onChangeSelectedClasses = selectedClasses => this.setState({ selectedClasses });

  onChangeSheetsPerPage = sheetsPerPageAmount => {
    const { answersAmount, lettersAmount } = this.state;
    const { classes, user } = this.props;
    const className = this.getFirstSelectedClassName();

    this.createGenericPreview(className, answersAmount, lettersAmount, sheetsPerPageAmount);
    this.setState({ sheetsPerPageAmount });

    if (
      [4, 6].includes(sheetsPerPageAmount) &&
      user &&
      _.has(user, 'enabled_popups') &&
      (!_.has(user.enabled_popups, 'smaller_as') || user.enabled_popups.smaller_as)
    ) {
      SmallerASModal({
        classes,
        user,
        hideModal: this.props.hideModal,
        showModal: this.props.showModal,
        onDoNotShowModal: this.onDoNotShowModal,
      });
    }
  };

  onChangeStudentNamesIncluded = studentNamesIncluded => {
    const { selectedClasses, selectedClassIndex } = this.state;
    if (!studentNamesIncluded) {
      this.createGenericPreview(null);
    } else if (!_.isEmpty(selectedClasses) && !_.isNull(selectedClassIndex)) {
      const newSelectedClasses = _.cloneDeep(selectedClasses);
      newSelectedClasses[selectedClassIndex].selected = true;
      this.setState({ selectedClasses: newSelectedClasses, group: newSelectedClasses[selectedClassIndex] });
      this.createGenericPreview({
        id: selectedClasses[selectedClassIndex].id,
        name: selectedClasses[selectedClassIndex].name,
      });
    }
    this.setState({ studentNamesIncluded });
  };

  onChangeCheckboxValue = (classId, isChecked) => {
    const { group, selectedClasses } = this.state;

    const index = selectedClasses.findIndex(obj => obj.id === Number(classId));
    const newSelectedClasses = _.cloneDeep(selectedClasses);
    newSelectedClasses[index].selected = isChecked;
    this.setState({ selectedClasses: newSelectedClasses });

    const selectClasses = _.filter(newSelectedClasses, i => i.selected);
    const selectClass = _.isEmpty(selectClasses) ? null : selectClasses[0];

    if (!_.isEqual(selectClass, group)) {
      this.setState({ group: selectClass });
      this.createGenericPreview(selectClass ? { id: selectClass.id, name: selectClass.name } : null);
    }
  };

  onDoNotShowModal = (user, modalField) => {
    const enabledPopups = {
      ...user.enabled_popups,
      ...modalField,
    };

    this.props.updateCurrentUserRequest({
      data: { enabled_popups: enabledPopups },
      userId: user.id,
    });
  };

  onDownload = () => {
    const { groups, history } = this.props;
    const { answersAmount, fileFormat, lettersAmount, selectedClasses, sheetsPerPageAmount } = this.state;

    return new Promise(() => {
      const handleSuccess = data => {
        if (_.has(data, 'document_url')) {
          const url = data.document_url.replace('/public/', '/download/');
          window.location.replace(url);
          setTimeout(() => {
            window.open('', '_self').close();
          }, 1000);
        }
        history.push({
          pathname: '/teacher/',
          state: { generatedGenericSheet: true },
        });
      };
      const selectedClassNames = groups
        .filter((obj, index) => selectedClasses[index].selected === true)
        .map(obj => ({ id: obj.id, name: obj.name }));
      this.props.createDownloadGenericRequest({
        genericPreviewData: {
          class_names: selectedClassNames,
          file_format: fileFormat,
          number_of_answers: answersAmount,
          number_of_letters: lettersAmount,
          sheets_per_page: sheetsPerPageAmount,
        },
        handleSuccess,
      });
      this.setState({ downloadClicked: true });
    });
  };

  onResize = () => {
    this.setState({ height: window.innerHeight });
  };

  setTutorialModalVisibility = isVisible => {
    this.setState({ tutorialModalIsVisible: isVisible });
  };

  setSelectedClass = groups => {
    const selectedClasses = [];
    let studentNamesIncluded = false;
    let selectedClass = false;
    let selectedClassIndex = null;
    groups.forEach((group, index) => {
      selectedClass = false;
      if (group.students_count > 0 && studentNamesIncluded === false) {
        selectedClass = true;
        studentNamesIncluded = true;
        selectedClassIndex = index;
      }
      selectedClasses.push({
        id: group.id,
        name: group.name,
        selected: selectedClass,
        selectDisabled: group.students_count === 0,
      });
    });
    return { selectedClasses, selectedClassIndex, studentNamesIncluded };
  };

  render() {
    const { classes, genericPreview, groups, isLoading, isModalActive, history } = this.props;
    const {
      answersAmount,
      downloadClicked,
      fileFormat,
      height,
      isLoadingPdf,
      lettersAmount,
      selectedClasses,
      sheetsPerPageAmount,
      sheetsPerPageDisbled,
      studentNamesIncluded,
      tutorialIsRunning,
      tutorialKey,
      tutorialModalIsVisible,
      tutorialStepIndex,
      tutorialSteps,
    } = this.state;

    if (_.isNull(this.props.genericPreview) || !_.isArray(groups)) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }

    return (
      <div className={classes.page}>
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

        <Header history={history} />
        <Content
          answersAmount={answersAmount}
          downloadClicked={downloadClicked}
          fileFormat={fileFormat}
          genericPreview={genericPreview}
          groups={groups}
          height={height}
          history={history}
          isLoading={isLoading}
          isLoadingPdf={isLoadingPdf}
          isModalActive={isModalActive}
          lettersAmount={lettersAmount}
          selectedClasses={selectedClasses}
          sheetsPerPageAmount={sheetsPerPageAmount}
          sheetsPerPageDisbled={sheetsPerPageDisbled}
          studentNamesIncluded={studentNamesIncluded}
          user={this.props.user}
          onChangeNumberOfAnswers={this.onChangeNumberOfAnswers}
          onChangeNumberOfLetters={this.onChangeNumberOfLetters}
          onChangeCheckboxValue={this.onChangeCheckboxValue}
          onChangeFileFormat={this.onChangeFileFormat}
          onChangeSelectedClasses={this.onChangeSelectedClasses}
          onChangeSheetsPerPage={this.onChangeSheetsPerPage}
          onChangeStudentNamesIncluded={this.onChangeStudentNamesIncluded}
          onDownload={this.onDownload}
          setTutorialModalVisibility={this.setTutorialModalVisibility}
          updateCurrentUserRequest={this.props.updateCurrentUserRequest}
        />
      </div>
    );
  }
}

GenericPreview.propTypes = {
  classes: PropTypes.object,
  createDownloadGenericRequest: PropTypes.func,
  createGenericPreviewRequest: PropTypes.func,
  createGenericPreviewSuccess: PropTypes.func,
  genericPreview: PropTypes.object,
  getCurrentUserRequest: PropTypes.func,
  getGroupsRequest: PropTypes.func,
  groups: PropTypes.any,
  hideModal: PropTypes.func,
  history: PropTypes.object,
  isLoading: PropTypes.bool,
  isModalActive: PropTypes.bool,
  setGroups: PropTypes.func,
  showModal: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
  user: PropTypes.object,
};

const mapDispatchToProps = {
  createDownloadGenericRequest,
  createGenericPreviewRequest,
  createGenericPreviewSuccess,
  getCurrentUserRequest,
  getGroupsRequest,
  hideModal,
  setGroups,
  showModal,
  updateCurrentUserRequest,
};

const mapStateToProps = createStructuredSelector({
  genericPreview: makeSelectorGenericPreview(),
  groups: makeSelectGroups(),
  isLoading: makeSelectLoading(),
  isModalActive: makeSelectIsModalActive(),
  user: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withGroupReducer = injectReducer({ key: 'groups', reducer: groupsReducer });
const withGroupSaga = injectSaga({ key: 'groups', saga: groupsSaga });
const withReducer = injectReducer({ key: 'generic_preview', reducer });
const withSaga = injectSaga({ key: 'generic_preview', saga });

export default compose(
  withReducer,
  withSaga,
  withGroupReducer,
  withGroupSaga,
  withConnect,
  withStyles(styles),
)(GenericPreview);
