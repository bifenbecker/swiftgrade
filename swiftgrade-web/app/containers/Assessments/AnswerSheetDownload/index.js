import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading, DefaultButton } from 'components/Controls';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { showModal, hideModal } from 'components/Modals/Modal/actions';
import { withStyles } from '@material-ui/core/styles';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from '../config/reducer';
import saga from '../config/saga';
import { answerSheetZipRequest, setAnswerSheetResult, updateAssessmentStatusRequest } from '../config/actions';
import { makeSelectAnswerSheetResult } from '../config/selectors';
import messages from './messages';
import { styles } from './styles';

class AnswerSheetDownload extends Component {
  state = {
    isError: false,
  };

  componentDidMount() {
    window.removeEventListener('beforeunload', this.onBeforeUnload);
  }

  componentWillReceiveProps(nextProps) {
    const { answerSheetResult: result, assessmentId } = nextProps;

    if (this.props.answerSheetResult !== result && result) {
      if (_.isNull(result)) {
        this.showError();
      } else if (result.status !== 'ready_for_download') {
        this.showError();
      } else {
        if (result.url.format === 'zip') {
          this.props.answerSheetZipRequest({ kind: 'custom' });
        }

        this.props.updateAssessmentStatusRequest({ assessmentId, data: { key: 'next_status' } });
        this.downloadFile(result);
      }
    }
  }

  componentWillUnmount() {
    this.props.setAnswerSheetResult(null);
    window.removeEventListener('beforeunload', this.onBeforeUnload);
  }

  getDownloadURL = url => {
    // TO DO: some hack for local testing and development
    let normalUrl = url;
    if (url.includes('localhost')) {
      normalUrl = 'http://86.57.254.239:8086/public/answer_sheets/338.pdf';
      return normalUrl;
    }
    return normalUrl.replace('/public/', '/download/');
  };

  downloadFile = result => {
    window.location.replace(this.getDownloadURL(result.url.path));
    setTimeout(() => {
      window.open('', '_self').close();
    }, 1000);
  };

  updateStatus = () => {
    const { assessmentId } = this.props;
    this.props.updateAssessmentStatusRequest({ assessmentId, data: { key: 'prev_status' } });
  };

  onBeforeUnload = e => {
    e.preventDefault();
    this.updateStatus();
  };

  showError = () => {
    const { classes, history, groupId, hideModal: onClose } = this.props;

    this.setState({ isError: true });
    this.props.showModal({
      type: 'error',
      body: (
        <div className={classes.download_view}>
          <FormattedMessage {...messages.error} />
          <div className={classes.download_view_button}>
            <DefaultButton
              text={<FormattedMessage {...messages.ok} />}
              onClick={() => {
                onClose();
                history.push(`/groups/${groupId}/assessments/`);
              }}
            />
          </div>
        </div>
      ),
    });
  };

  render() {
    const { classes } = this.props;
    const { isError } = this.state;

    if (isError) {
      return null;
    }

    return (
      <div className={classes.loading}>
        <Loading />
        <div className={classes.title}>
          <FormattedMessage {...messages.downloadMsgTitle} />
        </div>
        <div className={classes.description}>
          <FormattedMessage {...messages.downloadMsgDescription} />
        </div>
      </div>
    );
  }
}

AnswerSheetDownload.propTypes = {
  answerSheetResult: PropTypes.any,
  assessmentId: PropTypes.any,
  groupId: PropTypes.any,
  classes: PropTypes.object,
  history: PropTypes.object,
  hideModal: PropTypes.func,
  answerSheetZipRequest: PropTypes.func,
  setAnswerSheetResult: PropTypes.func,
  showModal: PropTypes.func,
  updateAssessmentStatusRequest: PropTypes.func,
};

const mapDispatchToProps = {
  answerSheetZipRequest,
  hideModal,
  setAnswerSheetResult,
  showModal,
  updateAssessmentStatusRequest,
};

const mapStateToProps = createStructuredSelector({
  answerSheetResult: makeSelectAnswerSheetResult(),
});

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
)(AnswerSheetDownload);
