import React, { Fragment } from 'react';
import { ActionIcon } from 'components/DataDisplay';
import { FormattedMessage } from 'react-intl';
import { IconAccount } from 'components/Svgs';
import CheckIcon from '@material-ui/icons/Check';
import { Tooltip } from '@material-ui/core';
import _ from 'lodash';
import classNames from 'classnames';
import { RESULTS_ROW_HEAD_CIRCLE_ID, RESULTS_ROW_ICON_ID } from 'globalConstants';
import {
  markColumn,
  numberColumn,
  studentAnswerColumn,
  studentImageColumn,
  teacherAnswerColumn,
} from 'utils/helpers/results';
import { WIDTH } from 'utils/helpers/results/tableHelper';
import { isNeedGrading } from 'utils/helpers/results/resultsHelper';

import messages from './messages';

const getBlankText = color => (
  <div style={{ color }}>
    <FormattedMessage {...messages.blank} />
  </div>
);

const isEmpty = text => _.isEmpty(text) || text.replace(/\s/g, '').length < 1;

const renderTotalMarkColumn = (classes, group, item, value, onRemoveNeedGradingClick) => {
  const needGradingAnswers = [];
  item.data.forEach(answer => isNeedGrading(answer) && needGradingAnswers.push(answer.id));

  return (
    <Fragment>
      {value}
      {!_.isEmpty(needGradingAnswers) && (
        <Tooltip title={<FormattedMessage {...messages.removeNeedGrading} />} placement="bottom">
          <div
            className={classes.need_grading_button}
            role="button"
            tabIndex={-1}
            style={{ color: group.color }}
            onClick={e => {
              e.stopPropagation();
              onRemoveNeedGradingClick(item);
            }}
          >
            <FormattedMessage {...messages.needsGrading} />
          </div>
        </Tooltip>
      )}
    </Fragment>
  );
};

const SELECT_ICON = (classes, color, group, record, scans, onChangeScans) => {
  if (scans.includes(record.id)) {
    const style = {
      select_icon: { backgroundColor: color },
      select_icon_content: { color: 'white', backgroundColor: color, padding: 1, fontSize: 28 },
    };
    return <ActionIcon icon={CheckIcon} style={style} onChange={() => onChangeScans(scans, record.id)} />;
  }
  return (
    <Tooltip title={<FormattedMessage {...messages.options} />} arrow placement="right">
      <div>
        <IconAccount
          id={RESULTS_ROW_ICON_ID}
          className={classes.account_icon}
          color={group.color}
          onClick={e => {
            e.stopPropagation();
            onChangeScans(scans, record.id);
          }}
        />
      </div>
    </Tooltip>
  );
};

const ACTION_LABEL = (group, color, classes, scans, isAllResultsSelected, onChangeScans) => {
  const styles = {
    select_icon: { backgroundColor: group.color },
    select_icon_content: { color: 'white', backgroundColor: group.color, padding: 1, fontSize: 28 },
  };

  const title = <FormattedMessage {...messages.selectAll} />;

  if (isAllResultsSelected) {
    styles.select_icon.backgroundColor = color;
    styles.select_icon_content.backgroundColor = color;
    return <ActionIcon onChange={() => onChangeScans(scans)} icon={CheckIcon} style={styles} />;
  }
  return (
    <div className={classes.circle_icon}>
      <Tooltip title={title} arrow>
        <div
          id={RESULTS_ROW_HEAD_CIRCLE_ID}
          className={classes.circle}
          role="button"
          onClick={() => onChangeScans(scans)}
          style={{ background: group.color }}
          tabIndex={-1}
        />
      </Tooltip>
    </div>
  );
};

export const COLUMNS = (
  classes,
  color,
  group,
  isAllResultsSelected,
  scans,
  width,
  onChangeScans,
  onRemoveNeedGradingClick,
) => [
  {
    id: 'action',
    key: 'action',
    label: ACTION_LABEL(group, color, classes, scans, isAllResultsSelected, onChangeScans),
    align: 'left',
    width: _.has(WIDTH('results', 'action'), width) ? WIDTH('results', 'action')[width] : '5%',
    render: (text, record) => SELECT_ICON(classes, color, group, record, scans, onChangeScans),
    classNames: collapse => ({
      root: classNames(classes.table_row_column, { collapse, not_collapse: !collapse }),
    }),
  },
  {
    id: 'first_name',
    key: 'first_name',
    label: <FormattedMessage {...messages.first} />,
    align: 'left',
    width: _.has(WIDTH('results', 'first_name'), width) ? WIDTH('results', 'first_name')[width] : '26%',
    render: text => (isEmpty(text) ? getBlankText(color) : text),
    classNames: collapse => ({
      head: classes.first_name_column,
      root: classNames(classes.first_name_column, { not_collapse: !collapse }, classes.tutorial_head),
    }),
    enableSort: true,
  },
  {
    id: 'last_name',
    key: 'last_name',
    label: <FormattedMessage {...messages.last} />,
    align: 'left',
    width: _.has(WIDTH('results', 'last_name'), width) ? WIDTH('results', 'last_name')[width] : '19%',
    render: text => (isEmpty(text) ? getBlankText(color) : text),
    classNames: collapse => ({
      head: classes.second_name_column,
      root: classNames(classes.second_name_column, { not_collapse: !collapse }, classes.tutorial_head),
    }),
    enableSort: true,
  },
  {
    id: 'username',
    key: 'username',
    label: <FormattedMessage {...messages.usernameOrEmail} />,
    align: 'center',
    width: _.has(WIDTH('results', 'username'), width) ? WIDTH('results', 'username')[width] : '26%',
    render: text => (isEmpty(text) ? getBlankText(color) : text),
    classNames: collapse => ({
      head: classes.email_column,
      root: classNames(classes.email_column, { not_collapse: !collapse }, classes.tutorial_head),
    }),
    enableSort: true,
  },
  {
    id: 'total',
    key: 'total',
    label: <FormattedMessage {...messages.total} />,
    align: 'left',
    width: _.has(WIDTH('results', 'total'), width) ? WIDTH('results', 'total')[width] : '24%',
    classNames: collapse => ({
      head: classes.total_column,
      root: classNames(classes.table_row_column, { collapse, not_collapse: !collapse }),
      body: classes.total_column,
    }),
    render: (value, item) => renderTotalMarkColumn(classes, group, item, value, onRemoveNeedGradingClick),
    enableSort: true,
  },
];

export const STUDENT_RESULTS_COLUMNS = (
  classes,
  onDisplayStudentMarks,
  expandedStudentMarks,
  orderBy,
  onlyStudentAnswers = false, // for generation pdf
) => [
  numberColumn(classes, onlyStudentAnswers, 'answers', true),
  teacherAnswerColumn(classes, false, 'answers', onlyStudentAnswers),
  studentAnswerColumn(classes, false, 'answers', onlyStudentAnswers),
  studentImageColumn(classes, onlyStudentAnswers),
  markColumn(classes, expandedStudentMarks, onlyStudentAnswers, orderBy, onDisplayStudentMarks),
];

export const ONLINE_ASSESSMENT_RESULTS_COLUMNS = (
  classes,
  onDisplayStudentMarks,
  expandedStudentMarks,
  orderBy,
  onlyStudentAnswers = false, // for generation pdf
) => [
  numberColumn(classes, onlyStudentAnswers, 'answers', true),
  teacherAnswerColumn(classes, true, 'answers', onlyStudentAnswers),
  studentAnswerColumn(classes, true, 'answers', onlyStudentAnswers),
  markColumn(classes, expandedStudentMarks, onlyStudentAnswers, orderBy, onDisplayStudentMarks),
];
