import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IconClassroom } from 'components/Svgs';
import classNames from 'classnames';
import messages from './messages';
import '../styles.scss';

import TableTimeLimitView from '../Views/TableTimeLimitView';
import StatusView from '../Views/StatusView';

const ASSIGNED_COLUMNS = ({ classes, group, isMobilePortrait, user, onAction, isMobile }) => [
  {
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
    enableSort: false,
    classNames: { body: classNames(classes.action_column, { isMobilePortrait }) },
  },
  {
    id: 'name',
    label: <FormattedMessage {...messages.name} />,
    align: 'left',
    classNames: { head: classes.name_column, body: classes.name_column },
    width: '25%',
    enableSort: false,
  },
  {
    id: 'time_limit',
    label: <FormattedMessage {...messages.timeLimit} />,
    align: 'center',
    classNames: { head: classes.time_limit_column, body: classes.time_limit_column },
    width: '53%',
    enableSort: false,
    render: (text, value) => <TableTimeLimitView classes={classes} text={text} value={value} />,
  },
  {
    id: 'start',
    label: <FormattedMessage {...messages.start} />,
    align: 'center',
    render: (text, value) => (
      <StatusView
        assessment={value}
        group={group}
        keyName="ready_to_start"
        user={user}
        onAction={onAction}
        isMobile={isMobile}
      />
    ),
    width: '20%',
    enableSort: false,
  },
];

export { ASSIGNED_COLUMNS };
