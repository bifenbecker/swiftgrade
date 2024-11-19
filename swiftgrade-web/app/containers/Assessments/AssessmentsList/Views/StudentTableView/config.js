import React from 'react';
import { FormattedMessage } from 'react-intl';
import { STUDENTS_CLASS_PAGE_TAB_AVAILABLE } from 'globalConstants';
import messages from './messages';

export const TUTORIAL_TABS = {
  student_available_tab: [
    {
      target: `button[class*="${STUDENTS_CLASS_PAGE_TAB_AVAILABLE}"]`,
      content: <FormattedMessage {...messages.portalStudentsAvailableTab} />,
      disableBeacon: true,
    },
    {
      target: `button[class*="${STUDENTS_CLASS_PAGE_TAB_AVAILABLE}"] + button`,
      content: <FormattedMessage {...messages.portalStudentsCompletedTab} />,
      disableBeacon: true,
      locale: { last: <FormattedMessage {...messages.done} /> },
    },
  ],
};
