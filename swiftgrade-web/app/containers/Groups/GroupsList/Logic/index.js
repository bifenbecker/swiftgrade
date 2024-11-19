import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { isTeacher } from 'utils/helpers/usersHelper';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { resetForm, setCurrentUserChecklist, updateCurrentUserRequest } from 'containers/App/actions';
import { hideModal, showModal } from 'components/Modals/Modal/actions';
import {
  checkGenericGenerationRequest,
  createDownloadGenericSuccess,
  getAnswerSheetArchiveRequest,
  updateAnswerSheetArchiveRequest,
} from 'containers/Generic/actions';
import { makeSelectorGenericData } from 'containers/Generic/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import genericPreviewReducer from 'containers/Generic/reducer';
import genericPreviewSaga from 'containers/Generic/saga';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { compose } from 'redux';
import { PULSE_DASHBOARD_GENERATE_GENERIC_AS, TUTORIAL_AFTER_PRINT_MC_SHEETS } from 'globalConstants';
import { updatePulseButtons } from 'utils/helpers/common';
import { getEnabledTutorials } from 'utils/helpers/tutorialHelpers';
import { GENERIC_ANSWER_SHEET_STATUS } from '../constants';
import { getGroupsRequest, setGroups, setLoading } from '../../actions';
import reducer from '../../reducer';
import saga from '../../saga';

class Logic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genericPdfStatus: GENERIC_ANSWER_SHEET_STATUS.ready_for_generation,
      genericPdfUrl: null,
      isConnected: true,
      uuid: null,
    };
    this.intervalId = null;
  }

  componentWillMount() {
    const { user } = this.props;
    if (isTeacher(user)) {
      this.checkGenericGeneration();
    }
    this.props.getGroupsRequest();
  }

  componentDidUpdate(prevProps) {
    const { user: prevUser } = prevProps;
    const { user } = this.props;
    if (_.isNil(prevUser) && prevUser !== user && isTeacher(user)) {
      this.checkGenericGeneration();
    }
  }

  componentDidMount() {
    window.addEventListener('offline', this.onOfflineConnection);
    window.addEventListener('online', this.onOnlineConnection);
  }

  componentWillUnmount() {
    window.removeEventListener('offline', this.onOfflineConnection);
    window.removeEventListener('online', this.onOnlineConnection);

    const { user } = this.props;

    this.props.hideModal();

    this.props.resetForm('GroupsCreateForm');
    this.props.resetForm('CodeForm');

    this.props.setCurrentUserChecklist(null);
    this.props.createDownloadGenericSuccess(null);
    this.props.setGroups(null);
    this.props.setLoading(true);

    const enabledTutorials = getEnabledTutorials(user);
    if (user && enabledTutorials && !enabledTutorials[TUTORIAL_AFTER_PRINT_MC_SHEETS]) {
      updatePulseButtons(this.props.user, this.props.updateCurrentUserRequest, PULSE_DASHBOARD_GENERATE_GENERIC_AS);
    }

    this.clearIntervalId();
  }

  checkGenericGeneration = () => {
    const { genericData } = this.props;
    if (_.isObject(genericData)) {
      this.setState({ genericPdfStatus: GENERIC_ANSWER_SHEET_STATUS.generating });
      this.intervalId = setInterval(() => {
        this.onCheckGenericGeneration(genericData);
      }, 5000);
    } else {
      this.onGetAnswerSheetArchive();
    }
  };

  clearIntervalId = () => {
    clearInterval(this.intervalId);
    this.intervalId = null;
  };

  onCheckGenericGeneration = data =>
    new Promise(() => {
      const handleSuccess = documentUrl => {
        this.clearIntervalId();
        const url = documentUrl.replace('/public/', '/download/');
        window.location.replace(url);
        setTimeout(() => {
          window.open('', '_self').close();
        }, 1000);
        this.setState({ genericPdfUrl: null, genericPdfStatus: GENERIC_ANSWER_SHEET_STATUS.ready_for_generation });
        this.props.updateAnswerSheetArchiveRequest({ data: { is_download: true, uuid: data.uuid } });
      };
      this.props.checkGenericGenerationRequest({ data, handleSuccess });
    });

  onDownloadFile = () => {
    const { genericPdfUrl, uuid } = this.state;
    const url = genericPdfUrl.replace('/public/', '/download/');
    window.location.replace(url);
    setTimeout(() => {
      window.open('', '_self').close();
    }, 1000);
    this.setState({ genericPdfUrl: null, genericPdfStatus: GENERIC_ANSWER_SHEET_STATUS.ready_for_generation });
    this.props.updateAnswerSheetArchiveRequest({ data: { is_download: true, uuid } });
  };

  onGetAnswerSheetArchive = () =>
    new Promise(() => {
      const handleSuccess = data => {
        const updatedStateData = { genericPdfStatus: GENERIC_ANSWER_SHEET_STATUS.ready_for_download };
        if (data.document_url) {
          updatedStateData.genericPdfUrl = data.document_url;
          updatedStateData.uuid = data.uuid;
        } else {
          const genericData = { uuid: data.uuid };
          this.intervalId = setInterval(() => {
            this.onCheckGenericGeneration(genericData);
          }, 5000);
          updatedStateData.genericPdfStatus = GENERIC_ANSWER_SHEET_STATUS.generating;
        }
        this.setState(updatedStateData);
      };
      this.props.getAnswerSheetArchiveRequest({ handleSuccess });
    });

  onOfflineConnection = () => {
    this.setState({ isConnected: false });
  };

  onOnlineConnection = () => {
    this.setState({ isConnected: true });
  };

  render() {
    const { children, user } = this.props;
    const { isConnected, genericPdfStatus } = this.state;
    return React.cloneElement(children, {
      isConnected,
      genericPdfStatus,
      user,
      hideModal: this.props.hideModal,
      resetForm: this.props.resetForm,
      showModal: this.props.showModal,
      onDownloadFile: this.onDownloadFile,
      ...this.props,
    });
  }
}

Logic.propTypes = {
  children: PropTypes.object,
  genericData: PropTypes.any,
  user: PropTypes.object,
  checkGenericGenerationRequest: PropTypes.func,
  createDownloadGenericSuccess: PropTypes.func,
  getAnswerSheetArchiveRequest: PropTypes.func,
  getGroupsRequest: PropTypes.func,
  updateAnswerSheetArchiveRequest: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
  hideModal: PropTypes.func,
  resetForm: PropTypes.func,
  setCurrentUserChecklist: PropTypes.func,
  setLoading: PropTypes.func,
  setGroups: PropTypes.func,
  showModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  genericData: makeSelectorGenericData(),
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  createDownloadGenericSuccess,
  checkGenericGenerationRequest,
  getAnswerSheetArchiveRequest,
  updateAnswerSheetArchiveRequest,
  updateCurrentUserRequest,
  getGroupsRequest,
  hideModal,
  resetForm,
  setCurrentUserChecklist,
  setLoading,
  setGroups,
  showModal,
};

const withReducer = injectReducer({ key: 'groups', reducer });
const withSaga = injectSaga({ key: 'groups', saga });
const withGenericReducer = injectReducer({ key: 'generic_preview', reducer: genericPreviewReducer });
const withGenericSaga = injectSaga({ key: 'generic_preview', saga: genericPreviewSaga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withReducer,
  withSaga,
  withGenericReducer,
  withGenericSaga,
)(Logic);
