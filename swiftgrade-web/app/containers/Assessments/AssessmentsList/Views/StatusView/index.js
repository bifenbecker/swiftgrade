import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import _, { get as lodashGet } from 'lodash';

import {
  NEXT_ASSESSMENT_STEP_ID,
  TUTORIAL_ASSESSMENT_CONGRATULATIONS,
  TUTORIAL_STUDENT_AVAILABLE_TAB,
} from 'globalConstants';
import { updateCurrentUserRequest } from 'containers/App/actions';
import { isTeacher } from 'utils/helpers/usersHelper';
import { NEW_TAB_LINKS } from 'utils/helpers/assessments/constants';
import { getEnabledTutorials } from 'utils/helpers/tutorialHelpers';
import { getPulseButtonValue, updatePulseButtons } from 'utils/helpers/common';
import { makeSelectAssessments } from 'containers/Assessments/config/selectors';

import '../../styles.scss';
import {
  checkIsDisabledIcon,
  DISABLED_TITLES,
  GRADING_STYLES,
  ICON_TEXT,
  ICONS,
  ICON_TOOLTIP_TEXT,
  TOOLTIP_TEXT,
  PULSE_BUTTONS_MAP,
} from './config';
import { styles } from './styles';
import './styles.scss';

class StatusView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openTooltip: false,
    };
  }

  componentDidUpdate() {
    const { openTooltip } = this.state;
    if (openTooltip) {
      setTimeout(() => this.setState({ openTooltip: false }), 1500);
    }
  }

  componentWillUnmount() {
    const { keyName, assessment } = this.props;
    const pulseButtonKey = lodashGet(PULSE_BUTTONS_MAP, keyName, null);
    if (
      pulseButtonKey &&
      (keyName !== 'ready_for_download' ||
        (keyName === 'ready_for_download' && assessment.id === this.getReadyForDownloadId()))
    ) {
      updatePulseButtons(this.props.user, this.props.updateCurrentUserRequest, pulseButtonKey);
    }
  }

  setLinkToButton = (disabled, keyName, icon) => {
    const { assessment, group } = this.props;
    const canOpenInNewTab =
      ['assigned', 'completed_unassigned', 'scanned'].includes(keyName) && assessment.results_exist && !disabled;
    return canOpenInNewTab ? (
      <a style={{ textDecoration: 'none' }} href={NEW_TAB_LINKS(assessment.id, group.id, 'result')}>
        {icon}
      </a>
    ) : (
      icon
    );
  };

  getReadyForDownloadId = () => Number(localStorage.getItem('last_ready_for_download_assessment_id'));

  isShowPulse = (keyName, assessmentId) => {
    const { isModalActive, user, assessments } = this.props;
    const pulseButtonKey = lodashGet(PULSE_BUTTONS_MAP, keyName, null);
    const enabledTutorials = getEnabledTutorials(user);
    const firstAssessment = assessments.sort(
      (a, b) => new Date(a.created_at).valueOf() + new Date(b.created_at).valueOf(),
    )[0];
    const isPulseEnabled =
      firstAssessment &&
      firstAssessment.id === assessmentId &&
      pulseButtonKey &&
      getPulseButtonValue(user, pulseButtonKey) &&
      !isModalActive;
    if (keyName === 'ready_for_download') {
      return isPulseEnabled && assessmentId === this.getReadyForDownloadId();
    }
    // if (keyName === 'ready_for_generation') {
    //   return isPulseEnabled && !enabledTutorials[TUTORIAL_ASSESSMENT_EXPLANATION];
    // }
    if (keyName === 'ready_to_start') {
      return isPulseEnabled && !enabledTutorials[TUTORIAL_STUDENT_AVAILABLE_TAB];
    }

    // before was checking TUTORIAL_ASSESSMENT_EXPLANATION
    return isPulseEnabled && !enabledTutorials[TUTORIAL_ASSESSMENT_CONGRATULATIONS];
  };

  renderTooltip = (disabled, icon, keyName, assessment, classes) => {
    const { user, isMobile } = this.props;
    const { openTooltip } = this.state;

    if (disabled && isMobile) {
      return (
        <Tooltip open={openTooltip} arrow placement="top" title={DISABLED_TITLES[keyName]}>
          <div>{icon}</div>
        </Tooltip>
      );
    }
    if (disabled) {
      return (
        <Tooltip title={DISABLED_TITLES[keyName]} arrow placement="top">
          <div>{icon}</div>
        </Tooltip>
      );
    }
    return (
      <Tooltip title={TOOLTIP_TEXT(assessment, keyName, user)} arrow placement="top">
        <div className={this.isShowPulse(keyName, assessment.id) ? classes.pulse : null}>{icon}</div>
      </Tooltip>
    );
  };

  renderIconButton = (assessment, classes, color, keyName) => {
    const { user } = this.props;
    const Icon = ICONS[keyName];
    const className = _.has(classes, `${keyName}_icon`) ? classes[`${keyName}_icon`] : '';
    const disabled = checkIsDisabledIcon(assessment, keyName, user);

    let icon = (
      <div className={classNames(classes.icon, 'action', { disabled })}>
        <Icon
          style={{ color, fontSize: 35 }}
          className={className}
          onClick={e => (disabled ? this.setState({ openTooltip: true }) : this.props.onAction(e, assessment, keyName))}
        />
      </div>
    );

    icon = this.setLinkToButton(disabled, keyName, icon);

    return (
      <div id={NEXT_ASSESSMENT_STEP_ID} className={classNames(classes.icon_wrapper, { disabled })}>
        {this.renderTooltip(disabled, icon, keyName, assessment, classes)}
      </div>
    );
  };

  renderTextButton = (assessment, classes, color) => {
    const { onTextButtonClick } = this.props;
    return (
      <Tooltip title={ICON_TOOLTIP_TEXT[assessment.status]} arrow placement="bottom">
        <div
          role="button"
          tabIndex={-1}
          className={classNames(classes.icon_text, 'button_text')}
          onClick={e => onTextButtonClick(e, assessment, assessment.status)}
          style={GRADING_STYLES(color)}
        >
          {ICON_TEXT[assessment.status]}
        </div>
      </Tooltip>
    );
  };

  render() {
    const { assessment, classes, group, keyName, user } = this.props;

    if (_.isNil(ICONS[keyName]) || _.isNil(group)) {
      return null;
    }

    const { need_grading: grading, status } = assessment;
    const { color } = group;
    return (
      <React.Fragment>
        {this.renderIconButton(assessment, classes, color, keyName)}
        {status === 'scanned' && grading && this.renderTextButton(assessment, classes, color)}
        {((status === 'assigned' && isTeacher(user)) || status === 'ready_for_download') && (
          <div className={classes.icon_text} style={GRADING_STYLES(color)}>
            {ICON_TEXT[assessment.status]}
          </div>
        )}
      </React.Fragment>
    );
  }
}

StatusView.propTypes = {
  group: PropTypes.object,
  keyName: PropTypes.string,
  assessment: PropTypes.object,
  assessments: PropTypes.array,
  classes: PropTypes.object,
  isModalActive: PropTypes.bool,
  user: PropTypes.object,
  isMobile: PropTypes.bool,
  onAction: PropTypes.func,
  onTextButtonClick: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
};

const mapDispatchToProps = {
  updateCurrentUserRequest,
};

const mapStateToProps = createStructuredSelector({
  assessments: makeSelectAssessments(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(StatusView);
