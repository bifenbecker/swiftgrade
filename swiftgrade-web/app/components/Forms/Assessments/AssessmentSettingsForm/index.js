import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { Tooltip, withStyles } from '@material-ui/core';
import classNames from 'classnames';
import { formValueSelector, reduxForm, change } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';

import { ASSESSMENTS_SETTINGS_RELEASE_ID, ASSESSMENTS_SETTINGS_ATTACHMENTS_ID } from 'globalConstants';
import { deleteAssessmentFileRequest, deleteAssessmentFilesRequest } from 'containers/Assessments/config/actions';
import { DefaultButton } from 'components/Controls';
import { FileUploader } from 'components/DataDisplay';
import { IconInfoQuestion } from 'components/Svgs';

import { getCurrentUserRequest, updateCurrentUserRequest } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { getUserData } from 'utils/helpers/usersHelper';
import { SETTINGS_TITLES, TOOLTIP_TITLE } from './const';
import messages from './messages';
import { styles } from './styles';
import { ReviewView, SecurityView, TimingView } from './Views';

class AssessmentSettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllowedSubmit: true,
      isShowVaultErrorText: false,
    };
  }

  componentDidMount() {
    const userData = getUserData();
    getCurrentUserRequest({ userId: userData.user_id });
  }

  componentDidUpdate(prevProps) {
    const { attachments: prevAttachments } = prevProps;
    const { attachments, isAutoReleaseFilesChecked, setFormValue } = this.props;
    if (prevAttachments !== attachments && attachments.size === 0 && isAutoReleaseFilesChecked) {
      setFormValue('is_auto_release_files_checked', false);
    }
  }

  showTitle = (key, title) => {
    const { assessment, classes } = this.props;
    const color = assessment && assessment.group ? assessment.group.color : '#000';
    const tooltipTitle = TOOLTIP_TITLE(classes)[key];
    return (
      <div className={classes.block_title} style={{ color }}>
        <FormattedMessage {...title} />
        {tooltipTitle && this.showTooltip(classes, tooltipTitle)}
      </div>
    );
  };

  showTooltip = (classes, tooltipTitle) => (
    <Tooltip title={tooltipTitle} placement="bottom-start" classes={{ tooltip: classes.tooltip }}>
      <div className={classes.tooltip_icon_container}>
        <IconInfoQuestion className={classes.info_icon} />
      </div>
    </Tooltip>
  );

  onSubmit = event => {
    const { user } = this.props;
    const { isAllowedSubmit } = this.state;

    const enabledTutorials = {
      ...user.enabled_tutorials,
      release_online_as: true,
    };

    this.props.updateCurrentUserRequest({
      data: { enabled_tutorials: enabledTutorials },
      userId: user.id,
    });
    this.props.setKeySubmit('submit');
    if (!isAllowedSubmit) {
      event.preventDefault();
      this.setState({ isShowVaultErrorText: true });
    }
  };

  renderAttachments = setFormValue => {
    const { assessment, assessmentId, attachments, classes } = this.props;
    const { isShowVaultErrorText } = this.state;
    const uploaderTargetURL = `${process.env.API_URL}/assessments/${assessmentId}/files/`;
    return (
      <>
        <FileUploader
          assessment={assessment}
          attachments={attachments}
          className={classes.file_uploader}
          target={uploaderTargetURL}
          deleteAssessmentFileRequest={this.props.deleteAssessmentFileRequest}
          deleteAssessmentFilesRequest={this.props.deleteAssessmentFilesRequest}
          setFormValue={setFormValue}
          setKeySubmit={this.props.setKeySubmit}
          allowSubmit={() => this.setState({ isAllowedSubmit: true, isShowVaultErrorText: false })}
          disallowSubmit={() => this.setState({ isAllowedSubmit: false })}
        />
        {isShowVaultErrorText && (
          <span className={classNames(classes.error_input, classes.vault_error)}>
            <FormattedMessage {...messages.vaultError} />
          </span>
        )}
      </>
    );
  };

  renderSettingsWrapper = (classes, key, setFormValue) => {
    const content = {
      attachments: this.renderAttachments,
      timing: this.renderTiming,
      review: this.renderReview,
      security: this.renderSecurity,
    };
    return (
      <div id={ASSESSMENTS_SETTINGS_ATTACHMENTS_ID} className={classes.settings_block}>
        {this.showTitle(key, SETTINGS_TITLES[key])}
        {content[key](setFormValue)}
      </div>
    );
  };

  renderTiming = setFormValue => {
    const { timerValue } = this.props;
    return <TimingView setFormValue={setFormValue} timerValue={timerValue} />;
  };

  renderReview = setFormValue => {
    const { assessment, attachments, releaseResultsType } = this.props;
    const color = assessment && assessment.group ? assessment.group.color : '#000';
    return (
      <ReviewView
        attachments={attachments}
        color={color}
        releaseResultsType={releaseResultsType}
        setFormValue={setFormValue}
      />
    );
  };

  renderSecurity = setFormValue => {
    const { isAntiCheatingModeChecked, password, submit } = this.props;
    return (
      <SecurityView
        isAntiCheatingModeChecked={isAntiCheatingModeChecked}
        password={password}
        setFormValue={setFormValue}
        onEnter={submit}
      />
    );
  };

  renderReleaseButton = () => {
    const { assessment, classes } = this.props;
    return (
      <div id={ASSESSMENTS_SETTINGS_RELEASE_ID} className={classes.footer}>
        <DefaultButton
          type="submit"
          borderRadius={4}
          backgroundColor={assessment.group.color}
          onClick={this.onSubmit}
          text={<FormattedMessage {...messages.release} />}
        />
      </div>
    );
  };

  render() {
    const { classes, handleSubmit, setFormValue } = this.props;
    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.content_container}>
          {['attachments', 'timing', 'review', 'security'].map(key =>
            this.renderSettingsWrapper(classes, key, setFormValue),
          )}
        </div>
        {this.renderReleaseButton()}
      </form>
    );
  }
}

AssessmentSettingsForm.propTypes = {
  isAntiCheatingModeChecked: PropTypes.bool,
  isAutoReleaseFilesChecked: PropTypes.bool,
  password: PropTypes.string,
  releaseResultsType: PropTypes.string,
  timerValue: PropTypes.string,
  assessment: PropTypes.object,
  assessmentId: PropTypes.string,
  attachments: PropTypes.object,
  classes: PropTypes.object,
  deleteAssessmentFileRequest: PropTypes.func,
  deleteAssessmentFilesRequest: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFormValue: PropTypes.func,
  setKeySubmit: PropTypes.func,
  submit: PropTypes.func,
  getCurrentUserRequest: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
  user: PropTypes.object,
};

const withForm = reduxForm({
  form: 'AssessmentSettingsForm',
  touchOnChange: true,
  enableReinitialize: true,
  initialValues: {
    attachments: [],
    password: '',
    timer_value: '60',
    timer_unit: 'minutes',
    release_results_type: null,
    is_auto_release_files_checked: false,
    is_anti_cheating_mode_checked: false,
  },
});

const selector = formValueSelector('AssessmentSettingsForm');
const mapStateToProps = createStructuredSelector({
  attachments: state => selector(state, 'attachments'),
  isAntiCheatingModeChecked: state => selector(state, 'is_anti_cheating_mode_checked'),
  isAutoReleaseFilesChecked: state => selector(state, 'is_auto_release_files_checked'),
  password: state => selector(state, 'password'),
  releaseResultsType: state => selector(state, 'release_results_type'),
  timerValue: state => selector(state, 'timer_value'),
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  deleteAssessmentFileRequest(data) {
    dispatch(deleteAssessmentFileRequest(data));
  },
  deleteAssessmentFilesRequest(data) {
    dispatch(deleteAssessmentFilesRequest(data));
  },
  setFormValue(name, value) {
    dispatch(change('AssessmentSettingsForm', name, value));
  },
  getCurrentUserRequest(data) {
    dispatch(getCurrentUserRequest(data));
  },
  updateCurrentUserRequest(data) {
    dispatch(updateCurrentUserRequest(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withForm,
  withStyles(styles),
)(AssessmentSettingsForm);
