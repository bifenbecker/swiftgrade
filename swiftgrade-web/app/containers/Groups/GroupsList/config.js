import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  CUSTOM_INPUT_FIELD_ID,
  BODY_ID,
  CARDS_CARD_CLASS_ID,
  GENERATE_SHEET_ICON_ID,
  HEADER_PLUS_ICON_CONTAINER_ID,
  OPTIONS_RENAMING_CLASS_ID,
  PLAYER_ICON_ID,
  STUDENT_TUTORIAL_CARD_ID,
  STUDENT_TUTORIAL_JOIN_BTN_ID,
  TUTORIAL_CONGRATULATIONS_DASHBOARD,
} from 'globalConstants';
import {
  CreatedFirstClass,
  WelcomeToDashboard,
  AfterDownloadMCAS,
} from 'containers/Assessments/AssessmentsList/Views/DefaultTableView/TutorialStepsContent'; // TODO: move to the right place!

import StudentClassStep from 'containers/Students/StudentsList/StudentTutorialSteps/StudentClassStep';
import messages from './messages';

export const TUTORIAL_STEPS_DASHBOARD = (groupsExist = false) => ({
  dashboard_player_button: [
    {
      target: `svg[id="${PLAYER_ICON_ID}"]`,
      content: <FormattedMessage {...messages.afterWatchingVideos} />,
      disableBeacon: true,
      spotlightClicks: false,
      locale: { close: <FormattedMessage {...messages.gotIt} /> },
    },
  ],
  welcome_dashboard: [
    {
      target: BODY_ID,
      content: <WelcomeToDashboard />,
      disableBeacon: true,
      placement: 'center',
    },
    {
      target: `button[id*="${HEADER_PLUS_ICON_CONTAINER_ID}"]`,
      content: <FormattedMessage {...messages.createNewClassGetStarted} />,
      disableBeacon: true,
      locale: { last: <FormattedMessage {...messages.done} /> },
    },
  ],
  create_class: [
    {
      target: `div[id="${CUSTOM_INPUT_FIELD_ID}"] button`,
      content: <FormattedMessage {...messages.createMultipleClassesTutorial} />,
      disableBeacon: true,
      locale: { close: <FormattedMessage {...messages.gotIt} /> },
      spotlightClicks: true,
    },
  ],
  welcome_dashboard_with_groups: [
    {
      target: BODY_ID,
      content: <FormattedMessage {...messages.containsYourClasses} />,
      disableBeacon: true,
      spotlightClicks: false,
      placement: 'center',
    },
    {
      target: `div[id*="${CARDS_CARD_CLASS_ID}"]`,
      content: <FormattedMessage {...messages.existingClassView} />,
      disableBeacon: true,
    },
    {
      target: `svg[id*="${OPTIONS_RENAMING_CLASS_ID}"]`,
      content: <FormattedMessage {...messages.renamingClassOptions} />,
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: `button[id*="${HEADER_PLUS_ICON_CONTAINER_ID}"]`,
      content: <FormattedMessage {...messages.createNewClass} />,
      disableBeacon: true,
      locale: { last: <FormattedMessage {...messages.done} /> },
    },
    // {
    //   target: `svg[id="${GENERATE_SHEET_ICON_ID}"]`,
    //   content: <FormattedMessage {...messages.printMultipleChoice} />,
    //   disableBeacon: true,
    //   locale: { last: <FormattedMessage {...messages.done} /> },
    // },
  ],
  first_class_description: [
    {
      target: `div[id*="${CARDS_CARD_CLASS_ID}"]`,
      content: <FormattedMessage {...messages.createAssessmentsStudents} />,
      disableBeacon: true,
    },
    {
      target: `svg[id*="${OPTIONS_RENAMING_CLASS_ID}"]`,
      content: <FormattedMessage {...messages.renamingClassOptions} />,
      disableBeacon: true,
      // placement: 'right',
      locale: { last: <FormattedMessage {...messages.done} /> },
    },
  ],
  congratulations_dashboard: [
    {
      target: `div[id*="${CARDS_CARD_CLASS_ID}"]`,
      content: <CreatedFirstClass groupsExist={groupsExist} />,
      locale: { close: <FormattedMessage {...messages.continue} /> },
      placement: 'center',
      disableBeacon: true,
      tutorialKey: TUTORIAL_CONGRATULATIONS_DASHBOARD,
    },
  ],
  after_print_mc_sheets: [
    {
      target: `svg[id="${GENERATE_SHEET_ICON_ID}"]`,
      content: <FormattedMessage {...messages.clickPrintMCAnswer} />,
      disableBeacon: true,
      locale: { close: <FormattedMessage {...messages.gotIt} /> },
    },
  ],
  after_download_mc_as: [
    {
      target: BODY_ID,
      content: <AfterDownloadMCAS />,
      locale: { close: <FormattedMessage {...messages.continue} /> },
      placement: 'center',
      disableBeacon: true,
    },
  ],
  student_portal: [
    {
      target: `div[id*="${STUDENT_TUTORIAL_CARD_ID}"]`,
      content: <StudentClassStep />,
      disableBeacon: true,
    },
    {
      target: `div[id*="${STUDENT_TUTORIAL_JOIN_BTN_ID}"]`,
      content: <FormattedMessage {...messages.portalStudentsJoin} />,
      disableBeacon: true,
      locale: { last: <FormattedMessage {...messages.done} /> },
    },
  ],
});
