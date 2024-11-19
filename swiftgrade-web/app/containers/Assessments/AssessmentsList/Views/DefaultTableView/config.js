import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  CREATE_BUTTON_ID,
  FIRST_ASSESSMENT_STEP_ID,
  MORE_ASSESSMENT_OPTIONS_ID,
  SELECT_ALL_ASSESSMENTS_ID,
  NEXT_ASSESSMENT_STEP_ID,
  BODY_ID,
} from 'globalConstants';
import messages from './messages';

import {
  AssessmentsTab,
  AssessmentsTabCreateButtonBefore,
  CreateButtonAssessment,
  CreateButtonAssessmentBefore,
  FirstAssessmentCreatedContent,
  FirstAssessmentCreatedContentRow,
  MoreOptionsStepContent,
  MoreOptionsStepContentRow,
  NextStepInColumnStepContent,
  SelectAllAssessmentsStepContent,
  FirstAssessmentCongratulations,
  AfterDownloadWrittenAS,
  AfterReleaseOnlineAS,
} from './TutorialStepsContent';

export const TUTORIAL_STEPS = {
  welcome_assessment: [
    {
      target: BODY_ID,
      content: <AssessmentsTabCreateButtonBefore />,
      disableBeacon: true,
      placement: 'center',
    },
    {
      target: `div[id="${CREATE_BUTTON_ID}"]`,
      content: <CreateButtonAssessmentBefore />,
      locale: { last: <FormattedMessage {...messages.done} /> },
      disableBeacon: true,
    },
  ],
  after_download_written_as: [
    {
      target: BODY_ID,
      content: <AfterDownloadWrittenAS />,
      locale: { close: <FormattedMessage {...messages.continue} /> },
      placement: 'center',
      disableBeacon: true,
    },
  ],
  after_release_online_as: [
    {
      target: BODY_ID,
      content: <AfterReleaseOnlineAS />,
      locale: { close: <FormattedMessage {...messages.continue} /> },
      placement: 'center',
      disableBeacon: true,
    },
  ],
  assessment_congratulations: [
    {
      target: BODY_ID,
      content: <FirstAssessmentCongratulations />,
      locale: { close: <FormattedMessage {...messages.continue} /> },
      placement: 'center',
      disableBeacon: true,
    },
  ],
  assessment_explanation: [
    {
      target: `tr[class*="${FIRST_ASSESSMENT_STEP_ID}"]`,
      content: <FirstAssessmentCreatedContent />,
      disableBeacon: true,
    },
    {
      target: `div[id="${MORE_ASSESSMENT_OPTIONS_ID}"]`,
      content: <MoreOptionsStepContent />,
      disableBeacon: true,
    },
    {
      target: `div[id="${SELECT_ALL_ASSESSMENTS_ID}"]`,
      content: <SelectAllAssessmentsStepContent />,
      disableBeacon: true,
    },
    {
      target: `div[id="${NEXT_ASSESSMENT_STEP_ID}"]`,
      content: <NextStepInColumnStepContent />,
      locale: { last: <FormattedMessage {...messages.done} /> },
      disableBeacon: true,
    },
  ],
  assessment_creation: [
    {
      target: BODY_ID,
      content: <AssessmentsTab />,
      disableBeacon: true,
      placement: 'center',
    },
    {
      target: `tr[class*="${FIRST_ASSESSMENT_STEP_ID}"]`,
      content: <FirstAssessmentCreatedContentRow />,
      disableBeacon: true,
    },
    {
      target: `div[id="${MORE_ASSESSMENT_OPTIONS_ID}"]`,
      content: <MoreOptionsStepContentRow />,
      disableBeacon: true,
    },
    {
      target: `div[id="${SELECT_ALL_ASSESSMENTS_ID}"]`,
      content: <SelectAllAssessmentsStepContent />,
      disableBeacon: true,
    },
    {
      target: `div[id="${NEXT_ASSESSMENT_STEP_ID}"]`,
      content: <NextStepInColumnStepContent />,
      disableBeacon: true,
    },
    {
      target: `div[id="${CREATE_BUTTON_ID}"]`,
      content: <CreateButtonAssessment />,
      locale: { last: <FormattedMessage {...messages.done} /> },
      disableBeacon: true,
    },
  ],
};
