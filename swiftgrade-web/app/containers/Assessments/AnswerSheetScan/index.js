/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { DefaultButton, Loading } from 'components/Controls';
import { FormattedMessage, injectIntl } from 'react-intl';
import { CircularProgress, Grid, Fab } from '@material-ui/core';
import _ from 'lodash';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { showModal, hideModal } from 'components/Modals/Modal/actions';
import { v4 as uuidv4 } from 'uuid';
import { withStyles } from '@material-ui/core/styles';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  answerSheetItemScanRequest,
  answerSheetItemScanSuccess,
  answerSheetScanRequest,
  deleteAnswerSheetScanRequest,
  deleteScanSessionRequest,
  getAssessmentRequest,
  setAnswerSheetScanLoading,
  setAssessment,
} from '../config/actions';
import {
  makeSelectAnswerSheetItemScan,
  makeSelectAnswerSheetScanLoading,
  makeSelectAssessment,
} from '../config/selectors';
import reducer from '../config/reducer';
import saga from '../config/saga';
import { styles } from './styles';
import messages from './messages';

import Header from './Header';
import Pages from './Pages';
import StudentNameView from './StudentNameView';

class AnswerSheetScan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      scans: 0,
      sessionId: uuidv4(),
    };
  }

  componentWillMount() {
    const { assessmentId } = this.props;
    this.props.getAssessmentRequest({ assessmentId, data: {} });
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onBeforeUnload);
  }

  componentWillUnmount() {
    this.props.answerSheetItemScanSuccess(null);
    this.props.setAnswerSheetScanLoading(false);
    this.props.setAssessment(null);
    this.props.hideModal();

    window.removeEventListener('beforeunload', this.onBeforeUnload);
  }

  onUploadImage = e => {
    const { assessment, scanItem } = this.props;
    const { sessionId } = this.state;
    const { files } = e.target;

    if (!_.isEmpty(files)) {
      return new Promise(() => {
        const handleErrors = data => {
          const matchUrl = window.location.pathname.match('^/groups/(\\d+)/assessments/(\\d+)/scans/{0,1}$');

          if (matchUrl && matchUrl[1] && matchUrl[2]) {
            this.setState({ isShowModal: false });
            this.showErrorModal(data.error[0]);
          }
        };

        const handleSuccess = data => {
          this.setState({ isShowModal: true, scans: data.scans });
          this.showSuccessModal(data);
        };

        this.setState({ isShowModal: false });
        this.props.setAnswerSheetScanLoading(true);

        const data = { kind: assessment.kind, image: files[0], session_id: sessionId };

        if (scanItem && scanItem.pages !== scanItem.scanned_pages.length) {
          data.scan_id = scanItem.answer_sheet_scan_id;
        }

        this.props.answerSheetItemScanRequest({
          assessmentId: assessment.id,
          data,
          handleErrors,
          handleSuccess,
        });
      });
    }
  };

  onSubmit = () => {
    const { assessmentId, groupId } = this.props;
    const { sessionId } = this.state;
    this.props.answerSheetScanRequest({ assessmentId, groupId, data: { session_id: sessionId } });
  };

  onDeleteScan = isDelete => {
    const { assessment, classes, scanItem } = this.props;

    if (!_.isEmpty(scanItem)) {
      return new Promise(() => {
        const handleSuccess = () => {
          let { scans } = this.state;
          scans = isDelete ? scans - 1 : scans;
          this.setState({ isShowModal: false, scans });

          this.props.showModal({
            withoutTitle: true,
            body: (
              <Grid container direction="column" justify="space-around" alignItems="center">
                <Grid item className={classes.student_result_deleted_text}>
                  <FormattedMessage {...messages.studentResultDeleted} />
                </Grid>
                <Grid item>
                  <DefaultButton
                    text={<FormattedMessage {...messages.okay} />}
                    onClick={() => {
                      this.props.hideModal();
                    }}
                    backgroundColor={assessment.group.color}
                  />
                </Grid>
              </Grid>
            ),
          });
        };

        this.props.deleteAnswerSheetScanRequest({ scanId: scanItem.answer_sheet_scan_id, handleSuccess });
      });
    }
  };

  onDeleteScanSession = () => {
    const { sessionId } = this.state;
    this.props.deleteScanSessionRequest({ session_id: sessionId });
  };

  onBeforeUnload = e => {
    e.preventDefault();
    this.onDeleteScanSession();
  };

  renderModal = (classes, assessment, scanItem) => (
    <div className={classes.modal_wrapper}>
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        className={classNames(classes.modal, {
          multiple_pages: scanItem.pages > 1,
        })}
      >
        <StudentNameView scanItem={scanItem} />
        {scanItem.pages > 1 && <Pages scanItem={scanItem} />}
        {assessment.kind === 'generic' && scanItem.result && <div className={classes.result}>{scanItem.result}</div>}
        <Grid container direction="row" justify="space-around" alignItems="center">
          <Grid item>
            <Fab component="span">
              {scanItem.pages === scanItem.scanned_pages.length ? (
                <DeleteIcon onClick={() => this.onDeleteScan(true)} />
              ) : (
                <CloseIcon onClick={() => this.onDeleteScan(false)} />
              )}
            </Fab>
          </Grid>
          <Grid item>
            {this.renderUploadButton(
              classes,
              <Fab component="span" style={{ background: assessment.group.color, color: 'white' }}>
                <ArrowForwardIosIcon />
              </Fab>,
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

  showErrorModal = error => {
    const { assessment, classes, hideModal: onClose, scanItem, intl } = this.props;
    const isParsePhotoError = error === intl.formatMessage(messages.parsePhotoErrorMessage);

    this.props.showModal({
      type: 'error',
      body: (
        <Grid container direction="column" justify="space-around" alignItems="center">
          <Grid item className={classes.errorModalText}>
            {isParsePhotoError && <FormattedMessage {...messages.parsePhotoError} />}
            {!isParsePhotoError && error}
          </Grid>
          <Grid item>
            <DefaultButton
              text={<FormattedMessage {...messages.okay} />}
              onClick={() => {
                if (scanItem) {
                  this.setState({ isShowModal: true });
                }
                onClose();
              }}
              backgroundColor={assessment.group.color}
            />
          </Grid>
        </Grid>
      ),
    });
  };

  renderUploadButton = (classes, childrens) => (
    <label htmlFor="contained-button-file">
      <input
        accept="image/*"
        id="contained-button-file"
        multiple={false}
        onChange={this.onUploadImage}
        style={{ display: 'none' }}
        type="file"
      />
      {childrens}
    </label>
  );

  renderContent = (classes, assessment, isLoading) => (
    <Grid container alignItems="center" direction="column" justify="center" className={classes.content}>
      {isLoading ? (
        <CircularProgress size={50} className={classes.progress} style={{ color: '#695eff' }} />
      ) : (
        this.renderUploadButton(
          classes,
          <Fab component="span" className={classes.button}>
            <CloudUploadIcon style={{ color: assessment.group.color }} />
          </Fab>,
        )
      )}
    </Grid>
  );

  render() {
    const { classes, assessment, history, loading, scanItem } = this.props;

    if (_.isNull(assessment) || assessment.isLoading) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }
    const { isShowModal, scans } = this.state;
    return (
      <div
        className={classNames({
          [classes.loading_image]: loading,
        })}
      >
        <Header
          assessment={assessment}
          history={history}
          loading={loading}
          scans={scans}
          onDeleteScanSession={this.onDeleteScanSession}
          onSubmit={this.onSubmit}
        />
        {isShowModal
          ? this.renderModal(classes, assessment, scanItem)
          : this.renderContent(classes, assessment, loading)}
      </div>
    );
  }
}

AnswerSheetScan.propTypes = {
  assessmentId: PropTypes.any,
  groupId: PropTypes.any,
  loading: PropTypes.bool,
  assessment: PropTypes.object,
  classes: PropTypes.object,
  history: PropTypes.object,
  scanItem: PropTypes.object,
  answerSheetItemScanRequest: PropTypes.func,
  answerSheetItemScanSuccess: PropTypes.func,
  answerSheetScanRequest: PropTypes.func,
  deleteAnswerSheetScanRequest: PropTypes.func,
  deleteScanSessionRequest: PropTypes.func,
  getAssessmentRequest: PropTypes.func,
  hideModal: PropTypes.func,
  setAnswerSheetScanLoading: PropTypes.func,
  setAssessment: PropTypes.func,
  showModal: PropTypes.func,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  assessment: makeSelectAssessment(),
  loading: makeSelectAnswerSheetScanLoading(),
  scanItem: makeSelectAnswerSheetItemScan(),
});

const mapDispatchToProps = {
  answerSheetItemScanRequest,
  answerSheetItemScanSuccess,
  answerSheetScanRequest,
  deleteAnswerSheetScanRequest,
  deleteScanSessionRequest,
  getAssessmentRequest,
  hideModal,
  setAnswerSheetScanLoading,
  setAssessment,
  showModal,
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
  injectIntl,
)(AnswerSheetScan);
