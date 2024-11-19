import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  INPUT_ANSWER_KEY_TUTORIAL_ID,
  CREATE_ANSWER_KEY_TUTORIAL_ID,
  CREATE_ANSWER_QUESTION_ONE_CONTENT_ID,
  ADD_ANSWER_KEY_ABOVE_CONTENT_ID,
  REPEAT_ANSWERS_ASSESSMENT_CONTENT_ID,
  HELP_ICON_CONTENT_ID,
} from 'globalConstants';
import {
  AddAnswerKeyAboveContent,
  CreateAnswerKeyTutorialStepContent,
  InputTheAnswerKeyTutorialStepContent,
  CreateAnswerQuestionOneContent,
  RepeatAnswersAssessmentContent,
  HelpTutorialAssessment,
} from './TutorialStepsContent';
import messages from './messages';

export const TUTORIAL_STEPS_ANSWER_KEY = {
  assessment_answers_creation: [
    {
      target: `div[class*="${INPUT_ANSWER_KEY_TUTORIAL_ID}"]`,
      content: <CreateAnswerKeyTutorialStepContent />,
      disableBeacon: true,
      placement: 'center',
    },
    {
      target: `div[class*="${CREATE_ANSWER_KEY_TUTORIAL_ID}"]`,
      content: <InputTheAnswerKeyTutorialStepContent />,
      disableBeacon: true,
      placement: 'center',
    },
    {
      target: `input[id="${CREATE_ANSWER_QUESTION_ONE_CONTENT_ID}"]`,
      content: <CreateAnswerQuestionOneContent />,
      disableBeacon: true,
    },
    {
      target: `div[id="${ADD_ANSWER_KEY_ABOVE_CONTENT_ID}"]`,
      content: <AddAnswerKeyAboveContent />,
      disableBeacon: true,
    },
    {
      target: `div[class*="${REPEAT_ANSWERS_ASSESSMENT_CONTENT_ID}"]`,
      content: <RepeatAnswersAssessmentContent />,
      locale: { last: <FormattedMessage {...messages.done} /> },
      disableBeacon: true,
      placement: 'center',
      stepStyle: { maxWidth: '420px' },
    },
  ],
  assessment_results_help: [
    {
      target: `a[id*="${HELP_ICON_CONTENT_ID}"]`,
      content: <HelpTutorialAssessment />,
      locale: { close: <FormattedMessage {...messages.gotIt} /> },
      disableBeacon: true,
    },
  ],
};

export const VIDYARD_UUID_ANSWER_KEY = 'aFLweUVWQLG3JH6ZoPb2hJ';
