import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import CheckIcon from '@material-ui/icons/Check';
import { Tooltip } from '@material-ui/core';

import { Loading } from 'components/Controls';
import { ActionIcon } from 'components/DataDisplay';
import { IconClassroom } from 'components/Svgs';
import { MORE_ASSESSMENT_OPTIONS_ID, SELECT_ALL_ASSESSMENTS_ID } from 'globalConstants';
import { getFormattedDate } from 'utils/helpers/dateHelpers';
import { isTeacher } from 'utils/helpers/usersHelper';

import '../styles.scss';
import messages from './messages';
import AverageView from '../Views/AverageView';
import StatusView from '../Views/StatusView';

const LOADING_MESSAGES = {
  cropping: { action: messages.processing, timeInfo: messages.processingTimeInfo },
  scanning: { action: messages.processing, timeInfo: messages.processingTimeInfo },
  generating: { action: messages.generating, timeInfo: messages.generatingTimeInfo },
};

const SELECT_ICON_STYLES = group => ({
  select_icon: { backgroundColor: group.color },
  select_icon_content: { color: 'white', backgroundColor: group.color, padding: 1, fontSize: 28 },
});

const STATUSES = (isMobile, classes, assessment, group, isModalActive, user, onAction, onTextButtonClick) =>
  ({
    assigned: RENDER_STATUSES(
      isMobile,
      assessment,
      group,
      isTeacher(user) ? 'assigned' : 'ready_to_start',
      isModalActive,
      onAction,
      null,
      user,
    ),
    cropping: getLoadingRender(classes, 'cropping'),
    generating: getLoadingRender(classes, 'generating'),
    ready_for_assignment: RENDER_STATUSES(
      isMobile,
      assessment,
      group,
      assessment.results_exist ? 'completed_unassigned' : 'ready_for_assignment',
      isModalActive,
      onAction,
      null,
      user,
    ),
    ready_for_download: RENDER_STATUSES(
      isMobile,
      assessment,
      group,
      'ready_for_download',
      isModalActive,
      onAction,
      null,
      user,
    ),
    ready_for_generation: RENDER_STATUSES(
      isMobile,
      assessment,
      group,
      'ready_for_generation',
      isModalActive,
      onAction,
      null,
      user,
    ),
    ready_for_scan: RENDER_STATUSES(isMobile, assessment, group, 'ready_for_scan', isModalActive, onAction, null, user),
    scanning: RENDER_STATUSES(isMobile, assessment, group, 'scanning', isModalActive, onAction),
    scanned: RENDER_STATUSES(isMobile, assessment, group, 'scanned', isModalActive, onAction, onTextButtonClick),
  }[assessment.status]);

const RENDER_STATUSES = (
  isMobile,
  assessment,
  group,
  key,
  isModalActive,
  onAction,
  onTextButtonClick = null,
  user = null,
) => (
  <StatusView
    isMobile={isMobile}
    assessment={assessment}
    group={group}
    keyName={key}
    isModalActive={isModalActive}
    user={user}
    onAction={onAction}
    onTextButtonClick={onTextButtonClick}
  />
);

const getActionRender = (classes, color, group, value, assessmentsIds, onAssessmentsIdsChange) => {
  const styles = SELECT_ICON_STYLES(group);
  const index = assessmentsIds.indexOf(value.id);

  let icon = IconClassroom;
  if (index >= 0) {
    icon = CheckIcon;

    styles.select_icon.backgroundColor = color;
    styles.select_icon_content.backgroundColor = color;
  }
  return (
    <div id={MORE_ASSESSMENT_OPTIONS_ID}>
      <ActionIcon onChange={() => onAssessmentsIdsChange(value, assessmentsIds)} icon={icon} style={styles} />
    </div>
  );
};

const getActionLabel = (
  allAssessmentsSelected,
  group,
  color,
  classes,
  isMobilePortrait,
  onAssessmentsIdsChange,
  assessmentsIds,
  onAllAssessmentsSelect,
) => {
  const styles = SELECT_ICON_STYLES(group);
  if (allAssessmentsSelected) {
    styles.select_icon.backgroundColor = color;
    styles.select_icon_content.backgroundColor = color;
    return (
      <ActionIcon onChange={() => onAllAssessmentsSelect(!allAssessmentsSelected)} icon={CheckIcon} style={styles} />
    );
  }

  return (
    <Tooltip title={<FormattedMessage {...messages.selectAll} />} arrow placement="right">
      <div className={classes.circle_icon}>
        <div
          id={SELECT_ALL_ASSESSMENTS_ID}
          className={classes.circle}
          role="button"
          onClick={() => onAllAssessmentsSelect(!allAssessmentsSelected)}
          style={{ background: group.color }}
          tabIndex={-1}
        />
      </div>
    </Tooltip>
  );
};

const getNameRender = (classes, isMobilePortrait, text, value) => {
  if (isMobilePortrait) {
    return (
      <div className={classes.name_column_wrapper}>
        <span>{text}</span>
        <div className={classes.date_type_title}>
          <span>{getFormattedDate(value.created_at)}</span>
          <div>
            <FormattedMessage {...(value.type === 'online' ? messages.online : messages.paper)} />
            &nbsp;
            <span style={{ textTransform: 'lowercase' }}>
              <FormattedMessage {...(value.kind === 'generic' ? messages.multipleChoice : messages.written)} />
            </span>
          </div>
        </div>
      </div>
    );
  }
  return text;
};

const getLoadingRender = (classes, status) => (
  <div>
    <Loading size={35} />
    <div className={classes.processing}>
      <FormattedMessage {...LOADING_MESSAGES[status].action} />
    </div>
    <div className={classes.processing_time_msg}>
      <FormattedMessage {...LOADING_MESSAGES[status].timeInfo} />
    </div>
  </div>
);

const getNextStepRender = (isMobile, classes, group, isModalActive, value, text, user, onAction, onTextButtonClick) => {
  if (text === 'scanning') {
    return getLoadingRender(classes, text);
  }
  return STATUSES(isMobile, classes, value, group, isModalActive, user, onAction, onTextButtonClick);
};

const actionColumn = (
  allAssessmentsSelected,
  assessmentsIds,
  classes,
  color,
  group,
  isMobilePortrait,
  onAllAssessmentsSelect,
  onAssessmentsIdsChange,
) => ({
  id: 'action',
  label: (
    <div>
      {getActionLabel(
        allAssessmentsSelected,
        group,
        color,
        classes,
        isMobilePortrait,
        onAssessmentsIdsChange,
        assessmentsIds,
        onAllAssessmentsSelect,
      )}
    </div>
  ),
  align: 'left',
  classNames: { body: classNames(classes.action_column, { isMobilePortrait }) },
  render: (text, value) => getActionRender(classes, color, group, value, assessmentsIds, onAssessmentsIdsChange),
  width: `${isMobilePortrait ? 10 : 2}%`,
  enableSort: false,
});

const averageColumn = (classes, color, isMobilePortrait) => ({
  id: 'average',
  label: <FormattedMessage {...messages.average} />,
  align: 'center',
  render: (text, value) => (
    <AverageView assessmentId={value.id} average={value.average} color={color} isMobilePortrait={isMobilePortrait} />
  ),
  width: '20%',
  classNames: { body: classNames(classes.average_column, { isMobilePortrait }) },
  enableSort: false,
});

const nameColumn = (classes, isMobilePortrait) => ({
  id: 'name',
  label: <FormattedMessage {...messages.name} />,
  align: 'left',
  width: `${isMobilePortrait ? 50 : 27}%`,
  classNames: { head: classes.name_column, body: classes.name_column },
  enableSort: true,
  render: (text, value) => getNameRender(classes, isMobilePortrait, text, value),
});

const nextStepColumn = (
  isMobile,
  classes,
  group,
  isMobilePortrait,
  isModalActive,
  user,
  onAction,
  onTextButtonClick,
) => ({
  id: 'status',
  label: <FormattedMessage {...messages.nextStep} />,
  align: 'center',
  render: (text, value) =>
    getNextStepRender(isMobile, classes, group, isModalActive, value, text, user, onAction, onTextButtonClick),
  width: `${isMobilePortrait ? 20 : 17}%`,
  classNames: { body: classNames(classes.next_step_column, { isMobilePortrait }) },
  enableSort: false,
});

const COLUMNS = (
  allAssessmentsSelected,
  assessmentsIds,
  classes,
  color,
  group,
  isMobile,
  isMobilePortrait,
  isModalActive,
  user,
  onAction,
  onAllAssessmentsSelect,
  onAssessmentsIdsChange,
  onTextButtonClick,
) => [
  actionColumn(
    allAssessmentsSelected,
    assessmentsIds,
    classes,
    color,
    group,
    isMobilePortrait,
    onAllAssessmentsSelect,
    onAssessmentsIdsChange,
  ),
  nameColumn(classes, isMobilePortrait),
  {
    id: 'created_at',
    label: <FormattedMessage {...messages.date} />,
    align: 'center',
    render: text => getFormattedDate(text),
    width: '17%',
    enableSort: true,
  },
  {
    id: 'kind',
    label: <FormattedMessage {...messages.answerSheetType} />,
    align: 'center',
    width: '17%',
    enableSort: false,
    render: (text, value) => {
      const msg = value.kind === 'generic' ? messages.multipleChoice : messages.written;

      return (
        <div className={classes.kind_block}>
          <FormattedMessage {...(value.type === 'online' ? messages.online : messages.paper)} />
          <div className={classes.kind_subtitle}>
            <FormattedMessage {...msg} />
          </div>
        </div>
      );
    },
  },
  averageColumn(classes, color),
  nextStepColumn(isMobile, classes, group, isMobilePortrait, isModalActive, user, onAction, onTextButtonClick),
];

const MOBILE_PORTRAIT_COLUMNS = (
  allAssessmentsSelected,
  assessmentsIds,
  classes,
  color,
  group,
  isMobile,
  isMobilePortrait,
  isModalActive,
  user,
  onAction,
  onAllAssessmentsSelect,
  onAssessmentsIdsChange,
  onTextButtonClick,
) => [
  actionColumn(
    allAssessmentsSelected,
    assessmentsIds,
    classes,
    color,
    group,
    isMobilePortrait,
    onAllAssessmentsSelect,
    onAssessmentsIdsChange,
  ),
  nameColumn(classes, isMobilePortrait),
  averageColumn(classes, color, isMobilePortrait),
  nextStepColumn(isMobile, classes, group, isMobilePortrait, isModalActive, user, onAction, onTextButtonClick),
];

export { COLUMNS, MOBILE_PORTRAIT_COLUMNS };
