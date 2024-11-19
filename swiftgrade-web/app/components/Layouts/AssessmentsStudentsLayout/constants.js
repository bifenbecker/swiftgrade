import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export const TABS = groupId => [
  {
    key: 'assessments',
    label: <FormattedMessage {...messages.assessments} />,
    link: `/groups/${groupId}/assessments/`,
    value: 'assessments',
  },
  {
    key: 'students',
    label: <FormattedMessage {...messages.students} />,
    link: `/groups/${groupId}/students/`,
    value: 'students',
  },
];

export const STUDENT_TABS = [
  { key: 'assigned_assessments', label: <FormattedMessage {...messages.available} />, value: 'assigned_assessments' },
  { key: 'completed_assessments', label: <FormattedMessage {...messages.completed} />, value: 'completed_assessments' },
];
