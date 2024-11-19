import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  RESULTS_FILTER_BUTTON_ID,
  TABS_ANALYSIS_TAB_ID,
  TABS_ANSWERS_TAB_ID,
  TABS_RESULTS_TAB_ID,
  TABS_ANSWER_SELECT_ID,
  TABS_ANSWER_KEY_ID,
  TABS_HELPER_ICON_ID,
} from 'globalConstants';

import messages from './messages';
import {
  AnalysisTabTutorial,
  AnswersTabTutorial,
  AnswerTabTutorialFilter,
  ResultsHelpIconTutorial,
  ResultsTabAccount,
  ResultsTabAccountCircle,
  ResultsTabAccountIcon,
  ResultsTabFilter,
  ResultsTabHeaders,
  ResultsTabTutorial,
  SecondResultsFiltersTutorial,
} from './TutorialStepsContent';

export const TUTORIAL_TABS = {
  results: [
    {
      target: `p[id*="${TABS_RESULTS_TAB_ID}"]`,
      content: <ResultsTabTutorial />,
      disableBeacon: true,
      spotlightPadding: 5,
    },
    {
      target: `p[id*="${TABS_RESULTS_TAB_ID}"]`,
      content: <ResultsTabHeaders />,
      disableBeacon: true,
      placement: 'center',
    },
    {
      target: `p[id*="${TABS_RESULTS_TAB_ID}"]`,
      content: <ResultsTabAccount />,
      disableBeacon: true,
      placement: 'center',
    },
    {
      target: `p[id*="${TABS_RESULTS_TAB_ID}"]`,
      content: <ResultsTabAccountIcon />,
      disableBeacon: true,
      placement: 'center',
    },
    {
      target: `p[id*="${TABS_RESULTS_TAB_ID}"]`,
      content: <ResultsTabAccountCircle />,
      disableBeacon: true,
      placement: 'center',
    },
    {
      target: `p[id*="${TABS_RESULTS_TAB_ID}"]`,
      content: <ResultsTabFilter />,
      locale: { last: <FormattedMessage {...messages.done} /> },
      disableBeacon: true,
      placement: 'center',
    },
  ],
  second_results_filters: [
    {
      target: `div[id*="${RESULTS_FILTER_BUTTON_ID}"]`,
      content: <SecondResultsFiltersTutorial />,
      locale: { close: <FormattedMessage {...messages.okay} /> },
      disableBeacon: true,
    },
  ],
  tutorial_results_help_icon: [
    {
      target: `div[id*="${TABS_HELPER_ICON_ID}"]`,
      content: <ResultsHelpIconTutorial />,
      locale: { close: <FormattedMessage {...messages.gotIt} /> },
      disableBeacon: true,
    },
  ],
  answers: [
    {
      target: `p[id*="${TABS_ANSWERS_TAB_ID}"]`,
      content: <AnswersTabTutorial />,
      disableBeacon: true,
      spotlightPadding: 5,
      placement: 'bottom-start',
    },
    {
      target: `div[id="${TABS_ANSWER_SELECT_ID}"]`,
      content: <FormattedMessage {...messages.answersTabTutorialSelect} />,
      disableBeacon: true,
    },
    {
      target: `div[id*="${TABS_ANSWER_KEY_ID}"]`,
      content: <FormattedMessage {...messages.answersTabTutorialKey} />,
      disableBeacon: true,
    },
    {
      target: `div[id*="${RESULTS_FILTER_BUTTON_ID}"]`,
      content: <AnswerTabTutorialFilter />,
      locale: { last: <FormattedMessage {...messages.done} /> },
      disableBeacon: true,
    },
  ],
  analysis: [
    {
      target: `p[id*="${TABS_ANALYSIS_TAB_ID}"]`,
      content: <FormattedMessage {...messages.analysisTabTutorial} />,
      disableBeacon: true,
      spotlightPadding: 5,
      placement: 'bottom-end',
    },
    {
      target: `p[id*="${TABS_ANALYSIS_TAB_ID}"]`,
      content: <AnalysisTabTutorial />,
      disableBeacon: true,
      placement: 'center',
    },
    {
      target: `p[id*="${TABS_ANALYSIS_TAB_ID}"]`,
      content: <FormattedMessage {...messages.analysisTabTutorialAnswers} />,
      locale: { last: <FormattedMessage {...messages.done} /> },
      placement: 'center',
      disableBeacon: true,
    },
  ],
};

export const VIDYARD_UUID_RESULTS = 'MBQ6JDmVs4fxaUyvSwxwMY';
