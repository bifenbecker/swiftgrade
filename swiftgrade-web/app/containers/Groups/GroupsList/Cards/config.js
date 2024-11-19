import React from 'react';
import { FormattedMessage } from 'react-intl';
import { STUDENT_TUTORIAL_CARD_ID, STUDENT_TUTORIAL_JOIN_BTN_ID } from 'globalConstants';
import StudentWelcomeStep from 'containers/Students/StudentsList/StudentTutorialSteps/StudentWelcomeStep';
import StudentClassStep from 'containers/Students/StudentsList/StudentTutorialSteps/StudentClassStep';
import messages from './messages';

export const TUTORIAL_TABS = {
  student_portal: [
    {
      target: `body`,
      content: <StudentWelcomeStep />,
      disableBeacon: true,
      placement: 'center',
    },
    {
      target: `div[class*="${STUDENT_TUTORIAL_CARD_ID}"]`,
      content: <StudentClassStep />,
      disableBeacon: true,
    },
    {
      target: `button[class*="${STUDENT_TUTORIAL_JOIN_BTN_ID}"]`,
      content: <FormattedMessage {...messages.portalStudentsJoin} />,
      disableBeacon: true,
      locale: { last: <FormattedMessage {...messages.done} /> },
    },
  ],
};
