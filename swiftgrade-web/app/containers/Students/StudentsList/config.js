import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  STUDENT_TUTORIAL_ICON_ID,
  STUDENT_TUTORIAL_CIRCLE_ID,
  STUDENT_TUTORIAL_ADD_ID,
  BODY_ID,
  AUTO_GENERATE_BUTTONS_ID,
  USER_NAME_OR_EMAIL_COLUMN_ID,
  FIRST_TABLE_ROW_ID,
} from 'globalConstants';

import messages from './messages';
import StudentCongratulations from './StudentTutorialSteps/StudentCongratulations';
import StudentRecommendStep from './StudentTutorialSteps/StudentRecommendStep';
import StudentManuallyAddStep from './StudentTutorialSteps/StudentManuallyAddStep';

export const TUTORIAL_STEPS_STUDENTS = (key, isMobile = false) =>
  ({
    adding_student: [
      {
        target: BODY_ID,
        content: <FormattedMessage {...messages.addStudentsTabView} />,
        disableBeacon: true,
        placement: 'center',
      },
      {
        target: BODY_ID,
        content: <StudentRecommendStep />,
        disableBeacon: true,
        placement: 'center',
      },
      {
        target: `div[id*="${STUDENT_TUTORIAL_ADD_ID}"]`,
        content: <FormattedMessage {...messages.addStudentsRecommendClickNow} />,
        disableBeacon: true,
        locale: { last: <FormattedMessage {...messages.done} /> },
      },
    ],
    adding_student_congratulations: [
      {
        target: BODY_ID,
        content: <StudentCongratulations />,
        disableBeacon: true,
        placement: 'center',
      },
      {
        target: `div[id*="${STUDENT_TUTORIAL_ICON_ID}"]`,
        content: <FormattedMessage {...messages.addStudentsOptions} />,
        disableBeacon: true,
      },
      {
        target: `div[id*="${STUDENT_TUTORIAL_CIRCLE_ID}"]`,
        content: <FormattedMessage {...messages.addStudentsSelect} />,
        disableBeacon: true,
        placement: 'right',
        locale: { last: <FormattedMessage {...messages.done} /> },
      },
    ],
    students_class_page_tabs: [
      {
        target: BODY_ID,
        content: <FormattedMessage {...messages.addStudentsAdd} />,
        disableBeacon: true,
        placement: 'center',
      },
      {
        target: `div[id*="${STUDENT_TUTORIAL_ICON_ID}"]`,
        content: <FormattedMessage {...messages.addStudentsOptions} />,
        placement: 'right',
        disableBeacon: true,
      },
      {
        target: `div[id*="${STUDENT_TUTORIAL_CIRCLE_ID}"]`,
        content: <FormattedMessage {...messages.addStudentsSelect} />,
        placement: 'right',
        disableBeacon: true,
      },
      {
        target: `div[id*="${STUDENT_TUTORIAL_ADD_ID}"]`,
        content: <FormattedMessage {...messages.addStudentsBtn} />,
        disableBeacon: true,
        locale: { last: <FormattedMessage {...messages.done} /> },
      },
    ],
    manually_add_students: [
      {
        target: BODY_ID,
        content: <FormattedMessage {...messages.manuallyAddTutorialFirst} />,
        placement: 'center',
        disableBeacon: true,
      },
      {
        target: isMobile ? BODY_ID : `div[id*="${AUTO_GENERATE_BUTTONS_ID}"]`,
        content: <FormattedMessage {...messages.manuallyAddTutorialSecond} />,
        placement: isMobile ? 'center' : 'top',
        disableBeacon: true,
      },
      {
        target: isMobile ? BODY_ID : `div[id*="${USER_NAME_OR_EMAIL_COLUMN_ID}"]`,
        content: <StudentManuallyAddStep />,
        placement: isMobile ? 'center' : 'bottom',
        disableBeacon: true,
      },
      {
        target: isMobile ? BODY_ID : `div[id*="${FIRST_TABLE_ROW_ID}"]`,
        content: <FormattedMessage {...messages.manuallyAddTutorialFifth} />,
        disableBeacon: true,
        placement: isMobile ? 'center' : 'bottom',
        locale: { last: <FormattedMessage {...messages.done} /> },
      },
    ],
  }[key]);
