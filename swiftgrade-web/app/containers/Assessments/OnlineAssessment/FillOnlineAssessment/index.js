import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Attachments, FileUploader, TimerDisplay } from 'components/DataDisplay';
import { DefaultButton, Loading } from 'components/Controls';
import { FormattedMessage } from 'react-intl';
import { Tab, Tabs, Grid, withStyles } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { IconLongArrowDown } from 'components/Svgs';
import { OnlineAssessmentForm } from 'components/Forms';
import { OnlineAssessmentLayout } from 'components/Layouts';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hideModal, showModal } from 'components/Modals/Modal/actions';
import { getFormValues } from 'redux-form/lib/immutable';
import injectSaga from 'utils/injectSaga';
import reducer from 'containers/Assessments/config/reducer';
import saga from 'containers/Assessments/config/saga';
import injectReducer from 'utils/injectReducer';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { resetForm } from 'containers/App/actions';
import { SplitPane } from 'react-collapse-pane';
import { styles } from './styles';
import PdfViewer from '../PdfViewer';
import {
  getAssessmentFilesRequest,
  getAssessmentFilesSuccess,
  getOnlineAssessmentDetailsRequest,
  saveStudentAnswersRequest,
  setAssessment,
  setAssessmentDetails,
  setAssessmentPassword,
  setCalculator,
  submitOnlineAssessmentRequest,
} from '../../config/actions';
import { Calculator } from '../../ActionAssessment/Views';
import {
  makeSelectAssessment,
  makeSelectAssessmentDetails,
  makeSelectAssessmentFiles,
  makeSelectAssessmentPassword,
  makeSelectCalculator,
} from '../../config/selectors';
import messages from './messages';
import { SaveAndExitBody, SubmitAndFinishBody, TimerExpirationBody } from '../Views';

class FillOnlineAssessment extends React.Component {
  state = {
    tab: 0,
  };

  componentWillMount() {
    const { assessmentId, password } = this.props;
    const data = password ? { password } : null;
    this.props.getOnlineAssessmentDetailsRequest({ assessmentId, data });
  }

  componentDidUpdate(prevProps) {
    const { assessment, files } = this.props;
    const { assessment: prevAssessment, files: prevFiles } = prevProps;

    if (_.isNull(prevAssessment) && _.isObject(assessment)) {
      if (assessment.results_exist) {
        this.onTimerExpirationModal();
      }
      this.props.getAssessmentFilesRequest({
        assessmentId: assessment.id,
      });
    }

    const isNewAssessment = prevAssessment !== assessment && _.isObject(assessment);
    const isNewFiles = prevFiles !== files && _.isArray(files);

    if ((_.isObject(assessment) && isNewFiles) || (_.isArray(files) && isNewAssessment)) {
      const filesToShow = this.getFilesToShow(files);
      if (!_.isEmpty(filesToShow)) {
        this.onShowFiles(assessment, filesToShow);
      }
    }
  }

  componentWillUnmount() {
    this.props.getAssessmentFilesSuccess(null);
    this.props.hideModal();
    this.props.resetForm('OnlineAssessmentForm');
    this.props.setAssessmentPassword(null);
    this.props.setAssessment(null);
  }

  getFilesToShow = files => (_.isArray(files) && files.length > 0 ? files.filter(file => !this.isFilePdf(file)) : []);

  onExit = () => {
    const { groupId, history } = this.props;
    history.push(`/groups/${groupId}/assigned_assessments/`);
  };

  onNotSubmittedModal = () => {
    const { assessment, classes, groupId, history } = this.props;
    this.props.showModal({
      title: <FormattedMessage {...messages.notSubmittedTitle} />,
      body: (
        <div className={classes.not_submitted_container}>
          <FormattedMessage {...messages.notSubmittedBody} />
          <div className={classes.okay_btn}>
            <DefaultButton
              onClick={() => {
                this.props.hideModal();
                history.push(`/groups/${groupId}/assigned_assessments/`);
              }}
              borderRadius={4}
              backgroundColor={assessment.group.color}
              text={<FormattedMessage {...messages.okay} />}
            />
          </div>
        </div>
      ),
    });
  };

  onSaveAndExitClick = () => {
    const { assessment } = this.props;
    this.props.showModal({
      title: <FormattedMessage {...messages.saveAndExitTitle} />,
      body: <SaveAndExitBody assessment={assessment} onCancel={this.props.hideModal} onExit={this.onExit} />,
    });
  };

  onTimerExpiration = () => {
    this.props.setCalculator(null);
    this.onTimerExpirationModal();
  };

  onTimerExpirationModal = () => {
    const { assessment } = this.props;
    this.props.showModal({
      title: <FormattedMessage {...messages.outOfTimeTitle} />,
      body: (
        <TimerExpirationBody
          color={assessment.group.color}
          onClick={() => {
            this.props.hideModal();
            this.redirectToImmediateResults();
          }}
        />
      ),
    });
  };

  isFilePdf = file => file.pdf_link || file.format.toLowerCase().endsWith('pdf');

  onShowFiles = (assessment, files) => {
    const { classes } = this.props;
    this.props.showModal({
      title: <FormattedMessage {...messages.assessmentFiles} />,
      body: (
        <Fragment>
          <FileUploader assessment={assessment} attachments={files} className="read_mode" isDownload toolbar={false} />
          <div className={classes.doneBtnWrapper}>
            <DefaultButton
              backgroundColor={assessment.group.color}
              borderRadius={2}
              text={<FormattedMessage {...messages.done} />}
              onClick={this.props.hideModal}
            />
          </div>
        </Fragment>
      ),
    });
  };

  onSubmitAndFinishModal = () => {
    const { assessment } = this.props;
    this.props.showModal({
      title: <FormattedMessage {...messages.submitAndFinishTitle} />,
      body: <SubmitAndFinishBody assessment={assessment} onCancel={this.props.hideModal} />,
    });
  };

  redirectToImmediateResults = () => {
    const { assessment, history } = this.props;
    history.push(
      `/groups/${assessment.group.id}/assessments/${assessment.id}/student_results/${
        assessment.completed_assessment_id
      }/?kind=submit`,
    );
  };

  saveStudentAnswers = () => {
    const { assessment, formValues } = this.props;
    const formData = formValues && formValues.toJS ? formValues.toJS() : null;

    const data = formData.assessment_items.map(item => {
      const { body, is_flag_checked: isFlagChecked, kind } = item;
      return {
        assessment_id: assessment.id,
        body,
        is_flag_checked: isFlagChecked,
        kind,
      };
    });
    this.props.saveStudentAnswersRequest({
      data,
      assessmentId: assessment.id,
      completedAssessmentId: assessment.completed_assessment_id,
    });
  };

  submitAssessment = formData => {
    const { assessment } = this.props;

    const data = formData && formData.toJS ? formData.toJS() : null;
    if (data) {
      return new Promise(() => {
        const handleErrors = response => {
          if (
            response.errors &&
            _.has(response.errors, 'status') &&
            response.errors.status === 'ready_for_assignment'
          ) {
            this.onNotSubmittedModal();
          }
        };
        const handleSuccess = () => {
          this.redirectToImmediateResults();
        };
        const assessmentItems = data.assessment_items.map(item => ({
          assessment_id: assessment.id,
          body: item.body,
          kind: item.kind,
        }));
        this.props.submitOnlineAssessmentRequest({
          data: assessmentItems,
          assessmentId: assessment.id,
          completedAssessmentId: assessment.completed_assessment_id,
          handleErrors,
          handleSuccess,
        });
      });
    }
  };

  renderAdditionalContent = () => {
    const { assessment, classes, files, isMobilePortrait } = this.props;
    const timeLimit = assessment && assessment.results_exist ? 0 : assessment.time_limit;
    const filesToShow = this.getFilesToShow(files);
    return (
      <Fragment>
        {assessment.is_timer && <TimerDisplay limit={timeLimit} onTimerExpiration={this.onTimerExpiration} />}
        {!_.isEmpty(filesToShow) && (
          <div className={classNames(classes.attachments_wrap, { isMobilePortrait })}>
            <Attachments onAttachmentsClick={() => this.onShowFiles(assessment, filesToShow)} />
          </div>
        )}
      </Fragment>
    );
  };

  renderHeader = () => {
    const { assessment, isMobilePortrait, history, user } = this.props;
    return (
      <OnlineAssessmentLayout
        assessment={assessment}
        group={assessment.group}
        history={history}
        isMobilePortrait={isMobilePortrait}
        user={user}
        onBackButtonClick={this.onSaveAndExitClick}
      >
        {this.renderAdditionalContent()}
      </OnlineAssessmentLayout>
    );
  };

  renderPlaceholder = () => {
    const { classes } = this.props;
    return (
      <Grid container direction="column" className={classes.placeholder}>
        <Grid item className={classes.placeholder_title}>
          <FormattedMessage {...messages.inputYourAnswersBelow} />
        </Grid>
        <Grid item>
          <IconLongArrowDown className={classes.arrow_icon} />
        </Grid>
      </Grid>
    );
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

  renderAssessment = () => {
    const { assessment, calculator, files, isMobile } = this.props;

    return (
      <Fragment>
        {this.renderPlaceholder()}
        <OnlineAssessmentForm
          assessment={assessment}
          isLayoutWithPDF={_.isArray(files) && files.some(this.isFilePdf)}
          isMobile={isMobile}
          onSubmit={this.submitAssessment}
          onSubmitButtonClick={this.onSubmitAndFinishModal}
          saveStudentAnswers={this.saveStudentAnswers}
          renderCalculatorComponent={
            calculator && calculator.key === 'unit' && isMobile && this.renderCalculatorComponent()
          }
          calculator={calculator}
        />
        {calculator && ((isMobile && calculator.key !== 'unit') || !isMobile) && this.renderCalculatorComponent()}
      </Fragment>
    );
  };

  isHavePdfFiles = () => {
    const { files } = this.props;
    return _.isArray(files) && files.some(this.isFilePdf);
  };

  renderPdfViewer = tabType => {
    const { files } = this.props;

    return <PdfViewer files={files.filter(this.isFilePdf)} tab={tabType} />;
  };

  renderSplitPane = assessmentContent => {
    const { assessment, classes } = this.props;

    const Button = ({ children }) => (
      <div className={classes.collapse_button} style={{ background: assessment.group.color }}>
        {children}
      </div>
    );
    return (
      <SplitPane
        split="vertical"
        className={classes.split_pane}
        initialSizes={[5, 3]}
        minSizes={[0, 400]}
        collapseOptions={{
          beforeToggleButton: <Button>{'<'}</Button>,
          afterToggleButton: <Button>{'>'}</Button>,
          collapsedSize: 0,
          collapseDirection: 'left',
        }}
        resizerOptions={{
          css: {
            background: assessment.group.color,
          },
          hoverCss: {
            background: assessment.group.color,
          },
        }}
      >
        {this.renderPdfViewer(0)}
        {assessmentContent}
      </SplitPane>
    );
  };

  renderTabs(assessmentContent) {
    const { assessment, classes } = this.props;
    const { tab } = this.state;
    return (
      <>
        <Tabs
          value={tab}
          TabIndicatorProps={{ children: <span style={{ background: assessment.group.color }} /> }}
          classes={{ indicator: classes.tabs_indicator, scroller: classes.tabs_scroller }}
          onChange={(e, newVal) => this.setState({ tab: newVal })}
        >
          {[<FormattedMessage {...messages.answersTab} />, <FormattedMessage {...messages.filesTab} />].map(
            (label, index) => (
              <Tab key={index} disableRipple label={label} classes={{ root: classes.tab_root }} />
            ),
          )}
        </Tabs>
        <div hidden={tab !== 0}>{assessmentContent}</div>
        <div hidden={tab !== 1}>{this.renderPdfViewer(1)}</div>
      </>
    );
  }

  renderLayout(...props) {
    const { width } = this.props;
    return isWidthUp('md', width) ? this.renderSplitPane(...props) : this.renderTabs(...props);
  }

  render() {
    const { assessment, classes, files } = this.props;

    if (_.isNil(assessment) || (assessment && !_.has(assessment, 'assessment_items')) || !_.isArray(files)) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }

    const assessmentContent = this.renderAssessment();

    return (
      <Fragment>
        {this.renderHeader()}
        {this.isHavePdfFiles() ? this.renderLayout(assessmentContent) : assessmentContent}
      </Fragment>
    );
  }
}

FillOnlineAssessment.propTypes = {
  assessmentId: PropTypes.string,
  groupId: PropTypes.string,
  password: PropTypes.string,
  files: PropTypes.array,
  assessment: PropTypes.object,
  assessmentDetails: PropTypes.object,
  calculator: PropTypes.object,
  classes: PropTypes.object,
  formValues: PropTypes.object,
  history: PropTypes.object,
  isMobile: PropTypes.bool,
  isMobilePortrait: PropTypes.bool,
  size: PropTypes.object,
  user: PropTypes.object,
  getAssessmentFilesRequest: PropTypes.func,
  getAssessmentFilesSuccess: PropTypes.func,
  getOnlineAssessmentDetailsRequest: PropTypes.func,
  hideModal: PropTypes.func,
  resetForm: PropTypes.func,
  saveStudentAnswersRequest: PropTypes.func,
  setAssessment: PropTypes.func,
  setAssessmentDetails: PropTypes.func,
  setAssessmentPassword: PropTypes.func,
  setCalculator: PropTypes.func,
  showModal: PropTypes.func,
  submitOnlineAssessmentRequest: PropTypes.func,
  width: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  assessment: makeSelectAssessment(),
  assessmentDetails: makeSelectAssessmentDetails(),
  calculator: makeSelectCalculator(),
  files: makeSelectAssessmentFiles(),
  formValues: state => getFormValues('OnlineAssessmentForm')(state),
  password: makeSelectAssessmentPassword(),
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  getAssessmentFilesRequest,
  getAssessmentFilesSuccess,
  getOnlineAssessmentDetailsRequest,
  hideModal,
  resetForm,
  saveStudentAnswersRequest,
  setAssessment,
  setAssessmentDetails,
  setAssessmentPassword,
  setCalculator,
  showModal,
  submitOnlineAssessmentRequest,
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
  withWidth(),
)(FillOnlineAssessment);
