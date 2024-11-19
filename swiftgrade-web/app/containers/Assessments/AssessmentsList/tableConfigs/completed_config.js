import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IconClassroom } from 'components/Svgs';
import { getFormattedDateTime } from 'utils/helpers/dateHelpers';
import classNames from 'classnames';
import { PAPER_SHEET } from 'globalConstants';
import _ from 'lodash';
import messages from './messages';
import '../styles.scss';

import StatusView from '../Views/StatusView';

const COMPLETED_COLUMNS = ({ classes, group, isMobilePortrait, user, onAction, isMobile }) => {
  const actionColumn = {
    id: 'action',
    label: (
      <div className={classes.circle_icon}>
        <div
          className={classNames(classes.circle, { disabled: true })}
          style={{ background: group.color }}
          tabIndex={-1}
        />
      </div>
    ),
    align: 'left',
    render: () => (
      <div className={classes.circle_icon}>
        <div className={classNames(classes.circle, classes.classroom_label)} style={{ backgroundColor: group.color }}>
          <IconClassroom className={classes.classroom_icon} />
        </div>
      </div>
    ),
    width: '2%',
    classNames: { body: classNames(classes.action_column, { isMobilePortrait }) },
  };

  const nameColumn = {
    id: 'name',
    label: <FormattedMessage {...messages.name} />,
    align: 'left',
    classNames: { head: classes.name_column, body: classes.name_column },
    width: '25%',
    enableSort: false,
  };

  const typeColumn = {
    id: 'type',
    label: <FormattedMessage {...messages.type} />,
    align: 'left',
    classNames: { head: classes.name_column, body: classes.name_column },
    width: '20%',
    enableSort: false,
  };

  const dateCompletedColumn = {
    id: 'date_completed',
    label: <FormattedMessage {...messages.dateCompleted} />,
    align: 'center',
    classNames: { head: classes.time_limit_column, body: classes.time_limit_column },
    width: '20%',
    tooltip: item => (
      <FormattedMessage
        {...(item.type === PAPER_SHEET ? messages.datePaperHoverTooltip : messages.dateOnlineHoverTooltip)}
      />
    ),
    tooltipClass: classes.dateTooltip,
    render: text => {
      const formattedDataTime = getFormattedDateTime(text);
      return _.isEmpty(formattedDataTime) ? (
        formattedDataTime
      ) : (
        <div className={classes.date_time_block}>
          <div>{formattedDataTime.date}</div>
          <div className={classes.time_text}>{formattedDataTime.time}</div>
        </div>
      );
    },
  };

  const scoreColumn = {
    id: 'score',
    label: <FormattedMessage {...messages.score} />,
    align: 'center',
    width: '15%',
    render: text => text || 'N/A',
  };

  const resultColumn = {
    id: 'results',
    label: <FormattedMessage {...messages.results} />,
    align: 'center',
    render: (text, value) => (
      <StatusView
        assessment={value}
        group={group}
        keyName="scanned"
        user={user}
        onAction={onAction}
        isMobile={isMobile}
      />
    ),
    width: '18%',
  };

  if (isMobile) {
    return [actionColumn, nameColumn, dateCompletedColumn, scoreColumn, resultColumn];
  }
  return [actionColumn, nameColumn, typeColumn, dateCompletedColumn, scoreColumn, resultColumn];
};

export { COMPLETED_COLUMNS };
