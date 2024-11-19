import React from 'react';
import { Switch } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import injectSaga from 'utils/injectSaga';
import {
  AnswerSheetDownloadPage,
  AnswerSheetPreviewPage,
  AssessmentPage,
  AssessmentResultsPage,
  AssessmentSettingsPage,
  AssessmentsListPage,
  AssessmentStudentResultsPage,
  AssignedAssessmentsListPage,
  CompletedAssessmentsListPage,
  CreateAssessmentPage,
  StartOnlineAssessmentPage,
  FillOnlineAssessmentPage,
} from 'pages/Assessments';
import { GroupsPage } from 'pages/Groups';
import { GenericPreviewPage, GenericDownloadPage } from 'pages/Generic';
import { NoValidLinkPage } from 'pages/NoValidLinkPage';
import { CongratulationsStudentPage, StudentsPage } from 'pages/Students';
import { ThankYouPage } from 'pages/ThankYouPage';
import {
  AccountPage,
  ClassCodePage,
  NeedMoreInfoPage,
  RecoverPasswordPage,
  ResetPasswordPage,
  SelectTypePage,
  SignInPage,
  SignUpPage,
  StudentNamePage,
  StudentSignUpPage,
} from 'pages/Users';
import MainLayout from 'components/Layouts/MainLayout';
import { connect } from 'react-redux';
import { getUserData } from 'utils/helpers/usersHelper';
import _ from 'lodash';
import { AnonymousRoute, RegisteredRoute, TeacherRoute, StudentRoute, UserDashboardRoute } from './Routes';

import saga from './saga';
import { checkAutoLoginRequest } from './actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    };
  }

  componentDidMount() {
    if (!this.state.isLogged) {
      const userData = getUserData();
      if (!_.isEmpty(userData)) {
        this.props.checkAutoLoginRequest({ user_id: userData.user_id });
        this.setState({ isLogged: true });
      }
    }
  }

  render() {
    const CurrentLayout = MainLayout;
    return (
      <CurrentLayout>
        <Switch>
          <TeacherRoute exact path="/generic/:uuid/download/" component={GenericDownloadPage} />
          <TeacherRoute exact path="/groups/:groupId/create_assessment/" component={CreateAssessmentPage} />
          <TeacherRoute exact path="/groups/:groupId/students/" component={StudentsPage} />
          <TeacherRoute exact path="/groups/preview/" component={GenericPreviewPage} />
          <TeacherRoute
            exact
            path="/groups/:groupId/assessments/:assessmentId/preview/"
            component={AnswerSheetPreviewPage}
          />
          <TeacherRoute
            exact
            path="/groups/:groupId/assessments/:assessmentId/answer_sheets/:answerSheetId/download/"
            component={AnswerSheetDownloadPage}
          />
          <TeacherRoute exact path="/groups/:groupId/assessments/:assessmentId/" component={AssessmentPage} />
          <TeacherRoute
            exact
            path="/groups/:groupId/assessments/:assessmentId/settings/"
            component={AssessmentSettingsPage}
          />
          <TeacherRoute exact path="/groups/:groupId/assessments/" component={AssessmentsListPage} />
          <RegisteredRoute
            exact
            path="/groups/:groupId/assigned_assessments/"
            component={AssignedAssessmentsListPage}
          />
          <RegisteredRoute
            exact
            path="/groups/:groupId/completed_assessments/"
            component={CompletedAssessmentsListPage}
          />
          <UserDashboardRoute exact path="/" component={GroupsPage} />
          <TeacherRoute exact path="/teacher/" component={GroupsPage} />
          <TeacherRoute exact path="/teacher/new/" component={GroupsPage} />
          <StudentRoute exact path="/student/" component={GroupsPage} />
          <StudentRoute exact path="/student/new/" component={GroupsPage} />
          <RegisteredRoute
            exact
            path="/groups/:groupId/assessments/:assessmentId/results/"
            component={AssessmentResultsPage}
          />
          <RegisteredRoute
            exact
            path="/groups/:groupId/assessments/:assessmentId/student_results/:completedAssessmentId/"
            component={AssessmentStudentResultsPage}
          />
          <RegisteredRoute
            exact
            path="/groups/:groupId/assessments/:assessmentId/process/"
            component={FillOnlineAssessmentPage}
          />
          <RegisteredRoute
            exact
            path="/groups/:groupId/assessments/:assessmentId/start/"
            component={StartOnlineAssessmentPage}
          />
          <RegisteredRoute exact path="/account/" component={AccountPage} />
          <AnonymousRoute exact path="/account_setup/" component={NeedMoreInfoPage} />
          <AnonymousRoute exact path="/class_code/" component={ClassCodePage} />
          <AnonymousRoute exact path="/novalidlink/" component={NoValidLinkPage} />
          <AnonymousRoute exact path="/recover/" component={RecoverPasswordPage} />
          <AnonymousRoute exact path="/reset/" component={ResetPasswordPage} />
          <AnonymousRoute exact path="/select_type/" component={SelectTypePage} />
          <AnonymousRoute exact path="/sign_in/" component={SignInPage} />
          <AnonymousRoute exact path="/sign_up/" component={SignUpPage} />
          <AnonymousRoute exact path="/student_name/" component={StudentNamePage} />
          <AnonymousRoute exact path="/join/" component={StudentSignUpPage} />
          <AnonymousRoute exact path="/students/check_verification_code/" component={CongratulationsStudentPage} />
          <AnonymousRoute exact path="/thankyou/" component={ThankYouPage} />
        </Switch>
      </CurrentLayout>
    );
  }
}

App.propTypes = {
  checkAutoLoginRequest: PropTypes.func,
};

const withSaga = injectSaga({ key: 'app', saga });

const mapDispatchToProps = {
  checkAutoLoginRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withConnect,
)(App);
