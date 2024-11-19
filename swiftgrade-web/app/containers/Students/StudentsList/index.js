import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SubmissionError from 'redux-form/lib/SubmissionError';
import { Loading } from 'components/Controls';
import _, { isEmpty, get as lodashGet } from 'lodash';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getGroupRequest, getGroupsRequest } from 'containers/Groups/actions';
import { makeSelectGroup, makeSelectGroups } from 'containers/Groups/selectors';
import { showModal, hideModal } from 'components/Modals/Modal/actions';
import { withStyles } from '@material-ui/core/styles';
import hexRgb from 'hex-rgb';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from 'containers/Students/reducer';
import rgbHex from 'rgb-hex';
import saga from 'containers/Students/saga';
import { updateCurrentUserRequest } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import {
  STUDENTS_CLASS_PAGE_TABS_TUTORIAL,
  TUTORIAL_ADDING_STUDENT,
  TUTORIAL_ADDING_STUDENT_CONGRATULATIONS,
  PULSE_STUDENTS_INVITE_STUDENTS,
  TUTORIAL_MANUALLY_ADD_STUDENTS,
} from 'globalConstants';
import ControlledJoyrideTutorial from 'components/ControlledJoyrideTutorial';
import { makeSelectIsModalActive } from 'components/Modals/Modal/selectors';
import { updatePulseButtons } from 'utils/helpers/common';
import { TUTORIAL_STEPS_STUDENTS } from './config';
import {
  getStudentsRequest,
  setStudents,
  deleteStudentRequest,
  updateStudentRequest,
  addStudentsToClassRequest,
} from '../actions';
import { makeSelectStudents } from '../selectors';
import { styles } from './styles';

import ActionView from './ActionView';
import StudentsTableView from './StudentsTableView';

class StudentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentsIds: [],
      orderBy: 'last_name',
      tutorialIsRunning: false,
      tutorialStepIndex: 0,
      tutorialSteps: TUTORIAL_STEPS_STUDENTS,
      studentsAdded: false,
      downloadStudentLoginInfo: false,
      clickOnManuallyAddStudents: false,
    };
  }

  componentDidUpdate() {
    const { studentsAdded } = this.state;
    if (studentsAdded) {
      const timeout = setTimeout(() => this.setState({ studentsAdded: false }), 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }

  setTutorialIsRunning = () => {
    setTimeout(() => this.setState({ tutorialIsRunning: true }), 1);
  };

  setDownloadStudentLoginInfo = value => {
    this.setState({ downloadStudentLoginInfo: value });
  };

  setClickOnManuallyAddStudents = () => {
    this.setState({ clickOnManuallyAddStudents: true });
  };

  getStudentsTutorial = () => {
    const { students, user, isMobile } = this.props;
    const { tutorialKey, tutorialSteps, downloadStudentLoginInfo, clickOnManuallyAddStudents } = this.state;
    const enabledTutorial = lodashGet(user, 'enabled_tutorials');

    if (
      user &&
      isEmpty(students) &&
      enabledTutorial[TUTORIAL_ADDING_STUDENT] &&
      enabledTutorial[STUDENTS_CLASS_PAGE_TABS_TUTORIAL]
    ) {
      return {
        tutorialKey: TUTORIAL_ADDING_STUDENT,
        tutorialSteps: TUTORIAL_STEPS_STUDENTS(TUTORIAL_ADDING_STUDENT),
      };
    }

    if (
      user &&
      !isEmpty(students) &&
      !enabledTutorial[TUTORIAL_ADDING_STUDENT] &&
      !downloadStudentLoginInfo &&
      enabledTutorial[TUTORIAL_ADDING_STUDENT_CONGRATULATIONS] &&
      enabledTutorial[STUDENTS_CLASS_PAGE_TABS_TUTORIAL]
    ) {
      return {
        tutorialKey: TUTORIAL_ADDING_STUDENT_CONGRATULATIONS,
        tutorialSteps: TUTORIAL_STEPS_STUDENTS(TUTORIAL_ADDING_STUDENT_CONGRATULATIONS),
      };
    }

    if (
      user &&
      !isEmpty(students) &&
      enabledTutorial[STUDENTS_CLASS_PAGE_TABS_TUTORIAL] &&
      enabledTutorial[TUTORIAL_ADDING_STUDENT] &&
      enabledTutorial[TUTORIAL_ADDING_STUDENT_CONGRATULATIONS]
    ) {
      return {
        tutorialKey: STUDENTS_CLASS_PAGE_TABS_TUTORIAL,
        tutorialSteps: TUTORIAL_STEPS_STUDENTS(STUDENTS_CLASS_PAGE_TABS_TUTORIAL),
      };
    }

    if (user && clickOnManuallyAddStudents && enabledTutorial[TUTORIAL_MANUALLY_ADD_STUDENTS]) {
      return {
        tutorialKey: TUTORIAL_MANUALLY_ADD_STUDENTS,
        tutorialSteps: TUTORIAL_STEPS_STUDENTS(TUTORIAL_MANUALLY_ADD_STUDENTS, isMobile),
      };
    }

    return {
      tutrialKey: tutorialKey,
      tutorialSteps: tutorialSteps[tutorialKey],
    };
  };

  componentWillMount() {
    const { groupId } = this.props;
    const { orderBy } = this.state;
    this.props.getGroupRequest({ groupId });
    this.props.getGroupsRequest();
    this.props.getStudentsRequest({ data: { group_id: groupId, ordering: orderBy } });
  }

  componentWillUnmount() {
    updatePulseButtons(this.props.user, this.props.updateCurrentUserRequest, PULSE_STUDENTS_INVITE_STUDENTS);
    this.props.setStudents(null);
    this.props.hideModal();
  }

  getColor = group => {
    const rgbs = hexRgb(group.color);
    return `#${rgbHex(Math.abs(rgbs.red - 75), Math.abs(rgbs.green - 86), Math.abs(rgbs.blue - 62))}`;
  };

  onChangeState = (key, value) => {
    this.setState({ [key]: value });
  };

  onChangeValue = (key, data) => {
    const funcs = {
      edit: this.updateStudent,
      delete: this.deleteStudent,
      reset_password: this.resetStudentPassword,
      add_students_to_classes: this.addStudentsToClasses,
    };
    return funcs[key](data);
  };

  onAction = (item, student) => {
    const { group } = this.props;
    const Form = item.form;
    this.props.showModal({
      title: item.title({ count: this.state.studentsIds.length }),
      body: (
        <Form
          group={group}
          student={student}
          onSubmit={formData => this.onChangeValue(item.key, formData)}
          onCancel={() => {
            this.setState({ studentsIds: [] });
            this.props.hideModal();
          }}
        />
      ),
    });
  };

  onCancel = formName => {
    this.props.hideModal();
    this.props.resetForm(formName);
  };

  onOrderByChange = orderBy => {
    const { groupId } = this.props;
    this.props.getStudentsRequest({ data: { group_id: groupId, ordering: orderBy } });

    this.setState({ orderBy });
  };

  addStudentsToClasses = formData => {
    const { students } = this.props;
    const { studentsIds: userIds } = this.state;
    const studentsIds = students.filter(student => userIds.includes(student.user_id)).map(student => student.id);
    const { checkedClasses } = formData;
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        this.onChangeState({ studentsAdded: false });
        reject(new SubmissionError(response.errors));
      };

      const handleSuccess = () => {
        this.setState({ studentsIds: [] });
        this.setState({ studentsAdded: true });
        this.onCancel();
      };

      this.props.addStudentsToClassRequest({
        handleSuccess,
        handleErrors,
        data: {
          students: studentsIds,
          groups: checkedClasses,
        },
      });
    });
  };

  resetStudentPassword = formData => {
    const data = formData && formData.toJS ? formData.toJS() : null;
    const { studentsIds } = this.state;
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };

      const handleSuccess = () => {
        this.props.hideModal();
        this.setState({ studentsIds: [] });
      };
      this.props.updateStudentRequest({
        data: data && { ...data, is_any_password: true },
        studentId: studentsIds[0],
        handleErrors,
        handleSuccess,
      });
    });
  };

  updateStudent = formData => {
    const { studentsIds } = this.state;
    const { groupId } = this.props;
    const data = formData && formData.toJS ? formData.toJS() : null;
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };

      const handleSuccess = () => {
        this.setState({ studentsIds: [] });
        this.onCancel();
      };

      data.group_id = groupId;
      this.props.updateStudentRequest({ data, studentId: studentsIds[0], handleErrors, handleSuccess });
    });
  };

  updateUser = () => {
    const { user } = this.props;
    const enabledPopups = _.cloneDeep(user.enabled_popups);
    enabledPopups.students = false;
    this.props.updateCurrentUserRequest({
      data: { enabled_popups: enabledPopups },
      userId: user.id,
    });
    this.props.hideModal();
  };

  deleteStudent = () => {
    const { groupId } = this.props;
    const { studentsIds } = this.state;
    const data = {
      group_id: groupId,
      students_ids: studentsIds,
    };
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };
      const handleSuccess = () => {
        this.props.hideModal();
        this.setState({ studentsIds: [] });
      };
      this.props.deleteStudentRequest({ data, handleErrors, handleSuccess });
    });
  };

  onStudentsIdsChange = (student, studentsIds) => {
    const newStudentsIds = _.cloneDeep(studentsIds);
    if (newStudentsIds.includes(student.user_id)) {
      newStudentsIds.splice(newStudentsIds.indexOf(student.user_id), 1);
    } else {
      newStudentsIds.push(student.user_id);
    }
    this.setState({ studentsIds: newStudentsIds });
  };

  onAllStudentsSelect = value => {
    const { students } = this.props;
    const studentsIds = value ? students.map(a => a.user_id) : [];
    this.setState({ studentsIds });
  };

  renderLoading = classes => (
    <div className={classes.loading}>
      <Loading />
    </div>
  );

  renderStudents = (color, group, isMobilePortrait, isMobile, students, studentsIds, user) => (
    <StudentsTableView
      color={color}
      group={group}
      isMobilePortrait={isMobilePortrait}
      isMobile={isMobile}
      isModalActive={this.props.isModalActive}
      orderBy={this.state.orderBy}
      size={this.props.size}
      students={students}
      studentsIds={studentsIds}
      user={user}
      onAction={this.onAction}
      onAllStudentsSelect={this.onAllStudentsSelect}
      onOrderByChange={this.onOrderByChange}
      onStudentsIdsChange={this.onStudentsIdsChange}
      studentsAdded={this.state.studentsAdded}
      setTutorialIsRunning={this.setTutorialIsRunning}
      setDownloadStudentLoginInfo={this.setDownloadStudentLoginInfo}
      setClickOnManuallyAddStudents={this.setClickOnManuallyAddStudents}
    />
  );

  render() {
    const { studentsIds, tutorialIsRunning, tutorialStepIndex } = this.state;
    const { classes, group, isMobilePortrait, students, user, isMobile, groups } = this.props;

    const { tutorialKey, tutorialSteps } = this.getStudentsTutorial();

    const isLoading = _.isNull(students) || _.isNull(group) || (group && group.isLoading);
    if (isLoading) {
      return this.renderLoading(classes);
    }
    const color = this.getColor(group);

    return (
      <>
        <ControlledJoyrideTutorial
          continuous
          // ignoreDidMount
          setTutorialIsRunning={isRunning => this.setState({ tutorialIsRunning: isRunning })}
          setTutorialStepIndex={stepIndex => this.setState({ tutorialStepIndex: stepIndex })}
          tutorialIsRunning={tutorialIsRunning}
          tutorialStepIndex={tutorialStepIndex}
          tutorialSteps={tutorialSteps}
          tutorialKey={tutorialKey}
        />

        <Fragment>
          {this.renderStudents(color, group, isMobilePortrait, isMobile, students, studentsIds, user)}
          {studentsIds && studentsIds.length > 0 && (
            <ActionView
              students={students}
              studentsIds={studentsIds}
              color={color}
              group={group}
              groups={groups}
              onChangeState={this.onChangeState}
              onAction={this.onAction}
            />
          )}
        </Fragment>
      </>
    );
  }
}

StudentsList.propTypes = {
  classes: PropTypes.object,
  group: PropTypes.object,
  groups: PropTypes.array,
  groupId: PropTypes.any,
  isMobilePortrait: PropTypes.bool,
  isMobile: PropTypes.bool,
  isModalActive: PropTypes.bool,
  students: PropTypes.any,
  size: PropTypes.object,
  user: PropTypes.object,
  deleteStudentRequest: PropTypes.func,
  getGroupRequest: PropTypes.func,
  getGroupsRequest: PropTypes.func,
  getStudentsRequest: PropTypes.func,
  hideModal: PropTypes.func,
  resetForm: PropTypes.func,
  setStudents: PropTypes.func,
  showModal: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
  updateStudentRequest: PropTypes.func,
  addStudentsToClassRequest: PropTypes.func,
};

const mapDispatchToProps = {
  deleteStudentRequest,
  getGroupRequest,
  getGroupsRequest,
  getStudentsRequest,
  hideModal,
  setStudents,
  showModal,
  updateCurrentUserRequest,
  updateStudentRequest,
  addStudentsToClassRequest,
};

const mapStateToProps = createStructuredSelector({
  group: makeSelectGroup(),
  groups: makeSelectGroups(),
  isModalActive: makeSelectIsModalActive(),
  students: makeSelectStudents(),
  user: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'students', reducer });
const withSaga = injectSaga({ key: 'students', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  withStyles(styles),
)(StudentsList);
