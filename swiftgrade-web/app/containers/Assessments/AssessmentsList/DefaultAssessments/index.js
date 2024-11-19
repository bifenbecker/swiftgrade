import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SubmissionError from 'redux-form/lib/SubmissionError';
import FileSaver from 'file-saver';
import { Loading } from 'components/Controls';
import { FormattedMessage } from 'react-intl';
import _, { get as lodashGet } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectGroup, makeSelectGroups } from 'containers/Groups/selectors';
import {
  getCurrentUserChecklistRequest,
  resetForm,
  setCurrentUserChecklist,
  updateCurrentUserRequest,
} from 'containers/App/actions';
import { withStyles } from '@material-ui/core/styles';
import {
  POPUP_CHECKLIST_CREATE_ASSESSMENT,
  POPUP_CHECKLIST_GET_AS,
  PULSE_ASSESSMENTS_CREATE_ANSWER_KEY,
} from 'globalConstants';
import { showModal, hideModal } from 'components/Modals/Modal/actions';
import { ChecklistTutorialModal } from 'components/Modals';
import { makeSelectIsModalActive } from 'components/Modals/Modal/selectors';
import { DOWNLOAD_APP_TO_SCAN_AS_TUTORIAL_KEY } from 'components/Modals/TutorialModal/constants';
import rgbHex from 'rgb-hex';
import hexRgb from 'hex-rgb';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from 'containers/Assessments/config/reducer';
import saga from 'containers/Assessments/config/saga';
import {
  copyAssessmentRequest,
  deleteAssessmentRequest,
  getAssessmentsRequest,
  setAssessments,
  unassignAssessmentRequest,
  updateAssessmentNeedGradingRequest,
  updateAssessmentRequest,
  updateAssessmentStatusRequest,
} from 'containers/Assessments/config/actions';
import { makeSelectAssessments, makeSelectLoading } from 'containers/Assessments/config/selectors';
import { makeSelectCurrentUser, makeSelectCurrentUserChecklist } from 'containers/App/selectors';
import { updatePulseButtons } from 'utils/helpers/common';
import { styles } from './styles';
import messages from './messages';

import { CHECKLIST_DATA, FORM_DATA, LINKS, STATUSES } from './config';
import {
  ActionView,
  AssessmentResultsBody,
  DefaultTableView,
  RemoveNeedGradingBody,
  ScanAnswerSheetBody,
} from '../Views';

class DefaultAssessments extends Component {
  state = {
    action: null,
    assessmentsIds: [],
    isConnected: true,
  };

  componentWillMount() {
    const { groupId, orderBy } = this.props;
    const data = { group_id: groupId, ordering: orderBy };
    this.props.getAssessmentsRequest({ data, kind: 'default' });
  }

  componentWillReceiveProps(nextProps) {
    const { groupId, group, assessments } = this.props;
    if (
      groupId !== nextProps.groupId ||
      (!_.isNull(group) && group.id !== nextProps.groupId && group !== nextProps.group)
    ) {
      this.props.getAssessmentsRequest({ data: { group_id: groupId, ordering: nextProps.orderBy }, kind: 'default' });
    }
    if (_.isArray(assessments) && !_.isEmpty(assessments) && _.isArray(nextProps.assessments)) {
      const assessmentMap = Object.fromEntries(assessments.map(item => [item.id, item]));
      nextProps.assessments.forEach(assessment => {
        const { id, status, answer_sheet: answerSheet } = assessment;
        const prevItem = assessmentMap[id];
        if (!prevItem) return;
        const { status: prevStatus } = prevItem;
        if (prevStatus === 'generating' && status === 'ready_for_download' && answerSheet) {
          this.onDownloadAS(assessment);
        }
      });
    }
  }

  componentDidMount() {
    this.props.getCurrentUserChecklistRequest({ userId: this.props.user.id });
    window.addEventListener('offline', this.onOfflineConnection);
    window.addEventListener('online', this.onOnlineConnection);
  }

  onOfflineConnection = () => {
    this.setState({ isConnected: false });
  };

  onOnlineConnection = () => {
    this.setState({ isConnected: true });
  };

  componentWillUnmount() {
    ['CopyAssessmentForm', 'RenameAssessmentNameForm'].map(form => {
      this.props.resetForm(form);
      return form;
    });
    this.props.setAssessments(null);
    this.props.setCurrentUserChecklist(null);
    this.props.hideModal();
    updatePulseButtons(this.props.user, this.props.updateCurrentUserRequest, PULSE_ASSESSMENTS_CREATE_ANSWER_KEY);
    window.removeEventListener('offline', this.onOfflineConnection);
    window.removeEventListener('online', this.onOnlineConnection);
  }

  getColor = group => {
    const rgbs = hexRgb(group.color);
    return `#${rgbHex(Math.abs(rgbs.red - 75), Math.abs(rgbs.green - 86), Math.abs(rgbs.blue - 62))}`;
  };

  goToPage = (key, assessment = { id: null }) => {
    const { groupId, history } = this.props;
    if (key === 'scan') {
      this.onScanModal();
    } else {
      const link = LINKS(assessment, groupId, key);
      history.push(link);
    }
  };

  onAction = (e, assessment, key) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (Object.keys(STATUSES).includes(key)) {
      this.goToPage(STATUSES[key], assessment);
    }
    if (key === 'ready_for_download' && assessment.answer_sheet) {
      this.onDownloadAS(assessment);
    }
    if (['scanning'].includes(assessment.status)) {
      const { group } = this.props;
      this.props.showModal({
        title: <FormattedMessage {...messages.processingNotComplete} />,
        body: <AssessmentResultsBody group={group} />,
      });
    }
  };

  onAllAssessmentsSelect = value => {
    const { assessments } = this.props;
    const assessmentsIds = value ? assessments.map(a => a.id) : [];
    this.setState({ assessmentsIds });
  };

  onAssessmentsIdsChange = (assessment, assessmentsIds) => {
    if (assessmentsIds.includes(assessment.id)) {
      assessmentsIds.splice(assessmentsIds.indexOf(assessment.id), 1);
    } else {
      assessmentsIds.push(assessment.id);
    }
    this.setState({ assessmentsIds });
  };

  onCancel = () => {
    const { action } = this.state;
    if (action) {
      this.props.resetForm(action.formName);
    }
    this.setState({ action: null, assessmentsIds: [] });
    this.props.hideModal();
  };

  onChangeState = (key, value) => {
    this.setState({ [key]: value });

    const { assessmentsIds } = this.state;

    if (key === 'action' && value) {
      const funcs = {
        copy: this.showForm,
        delete: this.showForm,
        rename: this.showForm,
        unassign: this.unassignAssessment,
      };
      if (['rename', 'delete', 'copy', 'unassign'].includes(value.key)) {
        funcs[value.key](value.key);
      } else if (assessmentsIds.length === 1) {
        const assessment = this.props.assessments.find(a => a.id === assessmentsIds[0]);
        this.goToPage(value.key, assessment);
      }
    }
  };

  onDownloadAS = assessment => {
    const { isMobile, group } = this.props;
    const { url } = assessment.answer_sheet;
    if (isMobile) {
      const ext = /[^.]+$/.exec(url);
      FileSaver.saveAs(url, `${group.name} - ${assessment.name}.${ext}`);
    } else {
      window.location.href = url;
    }
    this.props.updateAssessmentStatusRequest({ assessmentId: assessment.id, data: { key: 'next_status' } });
  };

  onRemoveNeedGradingModal = assessment => {
    const { group } = this.props;
    this.props.showModal({
      title: <FormattedMessage {...messages.removeNeedGradingTitle} />,
      body: (
        <RemoveNeedGradingBody
          color={group.color}
          onCancel={this.props.hideModal}
          onRemove={() => {
            this.props.hideModal();
            this.props.updateAssessmentNeedGradingRequest({ assessmentId: assessment.id });
          }}
        />
      ),
    });
  };

  onScanModal = () => {
    const { group } = this.props;
    this.props.showModal({
      title: <FormattedMessage {...messages.downloadAppTitle} />,
      body: (
        <ScanAnswerSheetBody
          group={group}
          onClose={this.props.hideModal}
          showModal={this.props.showModal}
          isButtonActive
          tutorialKey={DOWNLOAD_APP_TO_SCAN_AS_TUTORIAL_KEY}
        />
      ),
      customStyles: { top: 'auto' },
    });
  };

  onTextButtonClick = (e, assessment, status) => {
    if (status === 'scanned') {
      this.onRemoveNeedGradingModal(assessment);
    }
  };

  unassignAssessment = () => {
    const { assessmentsIds } = this.state;
    const { groupId } = this.props;
    return new Promise(() => {
      const handleSuccess = () => {
        this.setState({ action: null, assessmentsIds: [] });
      };
      this.props.unassignAssessmentRequest({
        data: { group_id: groupId },
        assessmentId: assessmentsIds[0],
        handleSuccess,
      });
    });
  };

  updateAssessment = formData => {
    const { groupId } = this.props;
    const { assessmentsIds, isConnected } = this.state;
    if (!isConnected) {
      return null;
    }
    const data = formData && formData.toJS ? formData.toJS() : null;
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };
      const handleSuccess = () => {
        this.onCancel();
      };
      this.props.updateAssessmentRequest({
        assessmentId: assessmentsIds[0],
        data,
        groupId,
        handleErrors,
        handleSuccess,
        isEditAssessmentItems: false,
      });
    });
  };

  copyAssessment = formData => {
    const data = formData && formData.toJS ? formData.toJS() : null;
    const { orderBy } = this.props;

    if (data) {
      return new Promise((resolve, reject) => {
        const handleErrors = response => {
          reject(new SubmissionError(response.errors));
        };
        const handleSuccess = () => {
          this.onCancel();
        };
        this.props.copyAssessmentRequest({
          assessmentId: data.assessment_id,
          data,
          handleErrors,
          handleSuccess,
          orderBy,
        });
      });
    }
  };

  deleteAssessments = () => {
    const { groupId } = this.props;
    const { assessmentsIds } = this.state;
    const data = {
      assessments_ids: assessmentsIds,
      group_id: groupId,
    };
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };
      const handleSuccess = () => {
        this.setState({ assessmentsIds: [] });
        this.props.hideModal();
      };
      this.props.deleteAssessmentRequest({ data, handleErrors, handleSuccess });
    });
  };

  showForm = key => {
    const { assessmentsIds } = this.state;
    const { assessments, group, hideModal: onCancel } = this.props;
    const Form = FORM_DATA[key].form;
    const funcs = {
      copy: this.copyAssessment,
      delete: this.deleteAssessments,
      rename: this.updateAssessment,
    };
    this.props.showModal({
      title: FORM_DATA[key].title,
      body: (
        <Form
          assessment={assessments.find(a => a.id === assessmentsIds[0])}
          group={group}
          onSubmit={formData => funcs[key](formData)}
          onCancel={onCancel}
        />
      ),
    });
  };

  renderAssessments = (classes, color, assessments, isChecklistActive) => {
    const { group, isMobilePortrait, isModalActive, orderBy, size, user, isMobile, totalUserGroups } = this.props;
    const { assessmentsIds } = this.state;
    return (
      <DefaultTableView
        assessments={assessments}
        assessmentsIds={assessmentsIds}
        color={color}
        group={group}
        groups={totalUserGroups}
        isChecklistActive={isChecklistActive}
        isMobilePortrait={isMobilePortrait}
        isModalActive={isModalActive}
        orderBy={orderBy}
        size={size}
        user={user}
        isMobile={isMobile}
        goToPage={this.goToPage}
        onAction={this.onAction}
        onAllAssessmentsSelect={this.onAllAssessmentsSelect}
        onAssessmentsIdsChange={this.onAssessmentsIdsChange}
        onOrderByChange={this.props.onOrderByChange}
        onTextButtonClick={this.onTextButtonClick}
      />
    );
  };

  getChecklistData = user => {
    const { assessments, history } = this.props;
    const enabledPopups = lodashGet(user, 'enabled_popups');
    const isAssessmentCreated = lodashGet(history, 'location.state.sheetKind', null);
    const historyState = lodashGet(history, 'location.state', null);
    if (assessments && assessments.length > 0) {
      if (isAssessmentCreated && enabledPopups[POPUP_CHECKLIST_CREATE_ASSESSMENT]) {
        return {
          isActive: true,
          checklistData: lodashGet(CHECKLIST_DATA(), POPUP_CHECKLIST_CREATE_ASSESSMENT, {}),
          name: POPUP_CHECKLIST_CREATE_ASSESSMENT,
        };
      }
      if (!enabledPopups[POPUP_CHECKLIST_CREATE_ASSESSMENT] && enabledPopups[POPUP_CHECKLIST_GET_AS] && historyState) {
        const { customSheetGenerated, onlineSheetReleased, assessment_id: assessmentId } = historyState;

        if (customSheetGenerated || onlineSheetReleased) {
          const processedAssessment = assessments.find(assessment => assessment.id === assessmentId);
          return {
            isActive: true,
            checklistData: lodashGet(CHECKLIST_DATA(processedAssessment.type), POPUP_CHECKLIST_GET_AS, {}),
            name: POPUP_CHECKLIST_GET_AS,
          };
        }
      }
    }
    return { isActive: false, checklistData: {}, name: null };
  };

  renderChecklistModal = (checklistData, isActive, name, user) => {
    const { checklist, history } = this.props;
    return (
      isActive && (
        <ChecklistTutorialModal
          bodyTitle={checklistData.bodyTitle}
          data={checklist}
          footerTitle={checklistData.footerTitle}
          footerButtonTitle={checklistData.footerButtonTitle}
          headerTitle={checklistData.headerTitle}
          history={history}
          name={name}
          user={user}
          hideModal={this.props.hideModal}
          showModal={this.props.showModal}
          updateCurrentUserRequest={this.props.updateCurrentUserRequest}
        />
      )
    );
  };

  render() {
    const { assessmentsIds } = this.state;
    const { assessments, classes, checklist, group, loading, user } = this.props;

    const isLoading =
      _.isNull(assessments) ||
      _.isNull(group) ||
      !_.isObject(user) ||
      !_.isObject(checklist) ||
      (assessments && assessments.isLoading) ||
      (group && group.isLoading) ||
      loading;

    if (isLoading) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }
    const color = this.getColor(group);
    const { checklistData, isActive, name } = this.getChecklistData(user);
    return (
      <Fragment>
        {this.renderAssessments(classes, color, assessments, isActive)}
        {assessmentsIds && assessmentsIds.length > 0 && (
          <ActionView
            assessments={assessments}
            assessmentsIds={assessmentsIds}
            color={color}
            group={group}
            onChangeState={this.onChangeState}
            user={user}
          />
        )}
        {this.renderChecklistModal(checklistData, isActive, name, user)}
      </Fragment>
    );
  }
}

DefaultAssessments.propTypes = {
  groupId: PropTypes.any,
  assessments: PropTypes.any,
  checklist: PropTypes.object,
  isMobilePortrait: PropTypes.bool,
  isModalActive: PropTypes.bool,
  isStudent: PropTypes.bool,
  loading: PropTypes.bool,
  isMobile: PropTypes.bool,
  orderBy: PropTypes.string,
  classes: PropTypes.object,
  group: PropTypes.object,
  totalUserGroups: PropTypes.object,
  history: PropTypes.object,
  size: PropTypes.object,
  user: PropTypes.object,
  copyAssessmentRequest: PropTypes.func,
  deleteAssessmentRequest: PropTypes.func,
  getAssessmentsRequest: PropTypes.func,
  getCurrentUserChecklistRequest: PropTypes.func,
  hideModal: PropTypes.func,
  onOrderByChange: PropTypes.func,
  resetForm: PropTypes.func,
  setAssessments: PropTypes.func,
  setCurrentUserChecklist: PropTypes.func,
  showModal: PropTypes.func,
  unassignAssessmentRequest: PropTypes.func,
  updateAssessmentNeedGradingRequest: PropTypes.func,
  updateAssessmentRequest: PropTypes.func,
  updateAssessmentStatusRequest: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
};

const mapDispatchToProps = {
  copyAssessmentRequest,
  deleteAssessmentRequest,
  getAssessmentsRequest,
  getCurrentUserChecklistRequest,
  hideModal,
  resetForm,
  setAssessments,
  setCurrentUserChecklist,
  showModal,
  unassignAssessmentRequest,
  updateAssessmentNeedGradingRequest,
  updateAssessmentRequest,
  updateAssessmentStatusRequest,
  updateCurrentUserRequest,
};

const mapStateToProps = createStructuredSelector({
  assessments: makeSelectAssessments(),
  checklist: makeSelectCurrentUserChecklist(),
  group: makeSelectGroup(),
  totalUserGroups: makeSelectGroups(),
  isModalActive: makeSelectIsModalActive(),
  loading: makeSelectLoading(),
  user: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'assessments', reducer });
const withSaga = injectSaga({ key: 'assessments', saga });

export default compose(
  withSaga,
  withReducer,
  withConnect,
  withStyles(styles),
)(DefaultAssessments);
