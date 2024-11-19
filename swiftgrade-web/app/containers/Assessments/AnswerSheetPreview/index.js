import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { Button, Grid, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';

import ControlledJoyrideTutorial from 'components/ControlledJoyrideTutorial';
import { CustomSelect, Loading } from 'components/Controls';
import { PDFDisplay } from 'components/DataDisplay';
import { AssessmentLayout } from 'components/Layouts';
import { IconDownload, IconInfoQuestion } from 'components/Svgs';
import { getCurrentUserRequest, updateCurrentUserRequest } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { getGroupRequest } from 'containers/Groups/actions';
import groupReducer from 'containers/Groups/reducer';
import groupSaga from 'containers/Groups/saga';
import { makeSelectGroup } from 'containers/Groups/selectors';
import {
  CUSTOM_PREVIEW_DOWNLOAD_BUTTON_ID,
  GENERATE_CUSTOM_SHEET_PAGE_TUTORIAL,
  BODY_ID,
  PULSE_PREVIEW_DOWNLOAD_REGULAR_AS,
  PULSE_ASSESSMENTS_DOWNLOAD_REGULAR_AS,
} from 'globalConstants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getUserData } from 'utils/helpers/usersHelper';
import { getEnabledTutorials } from 'utils/helpers/tutorialHelpers';
import { updatePulseButtons, getPulseButtonValue } from 'utils/helpers/common';

import { OPTIONS } from './constants';
import messages from './messages';
import { styles } from './styles';
import {
  GenerateCustomSheetPageCanvasStepContent,
  GenerateCustomSheetPageDownloadStepContent,
  GenerateCustomSheetPageBodyStepContent,
} from './TutorialStepsContent';
import { generateAnswerSheetRequest, previewAnswerSheetRequest, setAnswerSheetPreview } from '../config/actions';
import reducer from '../config/reducer';
import saga from '../config/saga';
import { makeSelectAnswerSheetPreview } from '../config/selectors';

import 'containers/Groups/GroupsList/Header/styles.scss';

class AnswerSheetPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amountOfEmpty: undefined,
      defaultEmptyAmountCustom: '0',
      defaultEmptyAmountBlank: '1',
      tutorialIsRunning: false,
      tutorialKey: GENERATE_CUSTOM_SHEET_PAGE_TUTORIAL,
      tutorialStepIndex: 0,
      tutorialSteps: [
        {
          target: BODY_ID,
          content: <GenerateCustomSheetPageBodyStepContent />,
          tutorialKey: GENERATE_CUSTOM_SHEET_PAGE_TUTORIAL,
          disableBeacon: true,
          placement: 'center',
        },
        {
          target: 'canvas[class*="react-pdf__Page__canvas"]',
          content: <GenerateCustomSheetPageCanvasStepContent />,
          tutorialKey: GENERATE_CUSTOM_SHEET_PAGE_TUTORIAL,
          // stepStyle: { maxWidth: '500px' },
          disableBeacon: true,
          placement: 'left',
        },
        {
          target: `button[id="${CUSTOM_PREVIEW_DOWNLOAD_BUTTON_ID}"] span[class*="MuiButton-label"]`,
          content: <GenerateCustomSheetPageDownloadStepContent />,
          locale: { last: <FormattedMessage {...messages.done} /> },
          disableBeacon: true,
        },
      ],
    };
  }

  componentWillMount() {
    const { assessmentId, groupId, group } = this.props;
    if (!(group && group.id && group.id === Number(groupId))) {
      this.props.getGroupRequest({ groupId });
    }
    this.props.previewAnswerSheetRequest({ groupId, assessmentId, data: { assessment_id: assessmentId } });
    const userData = getUserData();
    this.props.getCurrentUserRequest({ userId: userData.user_id });
  }

  componentWillUnmount() {
    this.props.setAnswerSheetPreview(null);
    updatePulseButtons(this.props.user, this.props.updateCurrentUserRequest, PULSE_PREVIEW_DOWNLOAD_REGULAR_AS);
  }

  generateAnswerSheet = () => {
    const { answerSheetPreview: preview, group, groupId, history, user, assessmentId } = this.props;
    const { amountOfEmpty, defaultEmptyAmountBlank, defaultEmptyAmountCustom } = this.state;
    const defaultValue = group.students_count === 0 ? defaultEmptyAmountBlank : defaultEmptyAmountCustom;

    localStorage.setItem('last_ready_for_download_assessment_id', assessmentId);
    updatePulseButtons(
      this.props.user,
      this.props.updateCurrentUserRequest,
      PULSE_ASSESSMENTS_DOWNLOAD_REGULAR_AS,
      true,
    );

    const enabledTutorials = {
      ...user.enabled_tutorials,
      download_written_as: true,
    };

    this.props.updateCurrentUserRequest({
      data: { enabled_tutorials: enabledTutorials },
      userId: user.id,
    });

    return new Promise(() => {
      const handleSuccess = () => {
        history.push({
          pathname: `/groups/${groupId}/assessments/`,
          state: { customSheetGenerated: true, assessment_id: preview.assessment_id },
        });
      };

      this.props.generateAnswerSheetRequest({
        data: {
          answer_sheet_id: preview.id,
          assessment_id: preview.assessment_id,
          amount_of_empty: amountOfEmpty || defaultValue,
        },
        assessmentId: preview.assessment_id,
        groupId,
        handleSuccess,
      });
    });
  };

  getIsEmptyClass = () => _.get(this.props.group, 'students_count', 0) === 0;

  runTutorial = () => {
    const { tutorialSteps } = this.state;

    const handleSuccess = data => {
      const firstStep = tutorialSteps.findIndex(step => data.enabled_tutorials[step.tutorialKey] === true);
      setTimeout(() => {
        if (firstStep !== -1) {
          this.setState({ tutorialIsRunning: true, tutorialStepIndex: firstStep });
        }
      }, 0);
    };

    const userData = getUserData();
    this.props.getCurrentUserRequest({ userId: userData.user_id, handleSuccess });
  };

  renderNumberOfSheets = classes => {
    const { amountOfEmpty, defaultEmptyAmountCustom, defaultEmptyAmountBlank } = this.state;
    const isEmptyClass = this.getIsEmptyClass();
    const defaultValue = isEmptyClass ? defaultEmptyAmountBlank : defaultEmptyAmountCustom;

    const select = (
      <Grid item>
        <div
          className={classNames(classes.select, {
            without_students: isEmptyClass,
          })}
        >
          <CustomSelect
            options={isEmptyClass ? OPTIONS.slice(1) : OPTIONS}
            value={amountOfEmpty || defaultValue}
            onChange={value => this.setState({ amountOfEmpty: value })}
            selectClasses={{ input: classes.answer_sheet_preview_select }}
            id="answer-sheet-preview"
            customPoperClass={classes.select_dropdown}
          />
        </div>
      </Grid>
    );

    if (isEmptyClass) {
      return (
        <span className={classes.blank_sheet_notes}>
          <span className={classes.blank_sheet_notes_item}>
            <FormattedMessage {...messages.useBlankAnswerSheets} />
          </span>
          <span className={classes.blank_sheet_notes_item}>
            <FormattedMessage {...messages.studentsWriteEmailAddress} />
          </span>
          <span className={classes.blank_sheet_notes_item}>
            <FormattedMessage {...messages.studentsNamePreFilled} />
          </span>
        </span>
      );
    }

    const msg = amountOfEmpty === '1' ? messages.extraSheet : messages.extraSheets;
    const title = (
      <div>
        <div className={classes.extra_sheets_title}>
          <FormattedMessage {...messages.extraSheetsTitle} />
        </div>

        <FormattedMessage {...messages.tooltipOneDownload} />
        <br />
        <br />
        <FormattedMessage {...messages.tooltipTwoDownload} />
        <br />
        <br />
        <FormattedMessage {...messages.tooltipThreeDownload} />
      </div>
    );

    return (
      <Grid container className={classes.select_container} style={{ alignItems: 'baseline' }}>
        <Grid item className={classes.count_sheets_wrapper}>
          <div>
            <FormattedMessage {...messages.countSheetForStudent} />
          </div>
          <div className={classes.plus_item}>+</div>
        </Grid>
        {select}
        <Grid item>
          <FormattedMessage {...msg} />
          <Tooltip title={title} arrow>
            <div className={classes.info_icon_container}>
              <IconInfoQuestion />
            </div>
          </Tooltip>
        </Grid>
      </Grid>
    );
  };

  renderDownloadBtn = (classes, color, status) => {
    const { user } = this.props;
    const enabledTutorials = getEnabledTutorials(user);
    const isPreviewDownloadRegularAsEnabled = getPulseButtonValue(user, PULSE_PREVIEW_DOWNLOAD_REGULAR_AS);
    const isEmptyClass = this.getIsEmptyClass();
    return (
      <div className={classNames(classes.download, { isEmptyClass })}>
        <Button
          id={CUSTOM_PREVIEW_DOWNLOAD_BUTTON_ID}
          classes={{ label: classes.download_btn }}
          disabled={status === 'generating'}
          onClick={() => this.generateAnswerSheet()}
        >
          <IconDownload
            color={color}
            style={{ height: 40, width: 40 }}
            className={
              isPreviewDownloadRegularAsEnabled && !enabledTutorials[GENERATE_CUSTOM_SHEET_PAGE_TUTORIAL]
                ? classes.pulse
                : null
            }
          />

          <div className={classes.download_btn_text} style={{ color }}>
            <FormattedMessage {...messages.download} />
          </div>
        </Button>
      </div>
    );
  };

  render() {
    const { answerSheetPreview: preview, classes, group, history } = this.props;
    const { tutorialIsRunning, tutorialKey, tutorialStepIndex, tutorialSteps } = this.state;
    const isEmptyClass = this.getIsEmptyClass();
    const titleMessage = isEmptyClass ? messages.downloadAnswerSheets : messages.numberOfSheets;

    if (_.isNull(group) || group.isLoading || _.isNull(preview) || preview.isLoading) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }

    return (
      <div style={{ height: '100vh' }}>
        <ControlledJoyrideTutorial
          continuous
          ignoreDidMount
          setTutorialIsRunning={isRunning => this.setState({ tutorialIsRunning: isRunning })}
          setTutorialStepIndex={stepIndex => this.setState({ tutorialStepIndex: stepIndex })}
          tutorialIsRunning={tutorialIsRunning}
          tutorialKey={tutorialKey}
          tutorialStepIndex={tutorialStepIndex}
          tutorialSteps={tutorialSteps}
        />

        <AssessmentLayout group={group} history={history} keyName="preview">
          <div className={classes.assessment_name}>
            <FormattedMessage {...messages.name} values={{ name: preview.assessment_name }} />
          </div>
        </AssessmentLayout>
        <Grid alignItems="flex-start" container direction="row" justify="space-between" style={{ height: '100%' }}>
          <Grid
            xs={4}
            className="left-part-preview"
            item
            style={{
              height: '100%',
              marginTop: 68,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div className={classes.number_of_sheets}>
              <div className={classNames(classes.title, { isEmptyClass })}>
                <FormattedMessage {...titleMessage} />
              </div>
              {this.renderNumberOfSheets(classes)}
            </div>
            {this.renderDownloadBtn(classes, group.color, preview.status)}
          </Grid>
          <Grid xs={8} item className={classes.pdf}>
            <PDFDisplay url={preview.preview_document_url} onPDFLoaded={this.runTutorial} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

AnswerSheetPreview.propTypes = {
  assessmentId: PropTypes.any,
  answerSheetPreview: PropTypes.object,
  classes: PropTypes.object,
  generateAnswerSheetRequest: PropTypes.func,
  getCurrentUserRequest: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
  getGroupRequest: PropTypes.func,
  group: PropTypes.object,
  groupId: PropTypes.any,
  history: PropTypes.object,
  user: PropTypes.func,
  previewAnswerSheetRequest: PropTypes.func,
  setAnswerSheetPreview: PropTypes.func,
};

const mapDispatchToProps = {
  generateAnswerSheetRequest,
  getGroupRequest,
  getCurrentUserRequest,
  updateCurrentUserRequest,
  previewAnswerSheetRequest,
  setAnswerSheetPreview,
};

const mapStateToProps = createStructuredSelector({
  answerSheetPreview: makeSelectAnswerSheetPreview(),
  group: makeSelectGroup(),
  user: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withGroupReducer = injectReducer({ key: 'groups', reducer: groupReducer });
const withGroupSaga = injectSaga({ key: 'groups', saga: groupSaga });
const withReducer = injectReducer({ key: 'assessments', reducer });
const withSaga = injectSaga({ key: 'assessments', saga });

export default compose(
  withConnect,
  withGroupReducer,
  withGroupSaga,
  withReducer,
  withSaga,
  withStyles(styles),
)(AnswerSheetPreview);
