import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { YouTube, OpenInNew } from '@material-ui/icons'; // KeyboardArrowRight
import {
  RESULTS_TYPE,
  CREATE_ANSWERS_TYPE,
  POPUP_WELCOME_CREATE_ASSESSMENT_VIDEO,
  POPUP_WELCOME_VIEW_RESULTS_VIDEO,
  HELP_ARTICLE_LINK_RESULTS,
  HELP_ARTICLE_LINK_CREATE_ANSWER_KEY,
} from 'globalConstants';
import { VIDYARD_UUID_ANSWER_KEY } from 'containers/Assessments/ActionAssessment/CreateAssessment/config';
import { VIDYARD_UUID_RESULTS } from 'containers/Assessments/Results/BaseAssessmentResults/config';

import VideoPlayerModalWithRedux from './VideoPlayerModalWithRedux';

import messages from './messages';

const LINKS = {
  [RESULTS_TYPE]: HELP_ARTICLE_LINK_RESULTS,
  [CREATE_ANSWERS_TYPE]: HELP_ARTICLE_LINK_CREATE_ANSWER_KEY,
};

// Constants
// Value of font size of menu items text
export const FONT_SIZE_TEXT_VALUE = 0.9;
export const FONT_SIZE_TEXT = `${FONT_SIZE_TEXT_VALUE}rem`;

// Value of font size icons
// Parent (main)
const FONT_SIZE_ICON_MAIN_VALUE = 1.3;
export const FONT_SIZE_ICON_MAIN = `${FONT_SIZE_ICON_MAIN_VALUE}rem`;

export const HELP_MODAL_THEME = color =>
  createMuiTheme({
    palette: {
      primary: {
        main: color || '#000',
      },
    },
    overrides: {
      MuiListItem: {
        root: {
          fontSize: 13,
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          '&:hover': {
            color: color || '#000',
          },
        },
        gutters: {
          padding: '0px 18px 2px',
        },
      },
    },
  });

export const GET_VIDEO_TUTORIAL = (type, updateStates, onCloseModal) => {
  const onFinishVideoCallback = () => {
    updateStates.setIsShowVideo(false);
    onCloseModal();
  };

  switch (type) {
    case RESULTS_TYPE:
      return (
        <VideoPlayerModalWithRedux
          name={POPUP_WELCOME_VIEW_RESULTS_VIDEO}
          title={messages.viewResultsVideoTitle}
          uuid={VIDYARD_UUID_RESULTS}
          onFinishClick={onFinishVideoCallback}
        />
      );

    case CREATE_ANSWERS_TYPE:
      return (
        <VideoPlayerModalWithRedux
          name={POPUP_WELCOME_CREATE_ASSESSMENT_VIDEO}
          title={messages.createAssessmentTutorialTitle}
          uuid={VIDYARD_UUID_ANSWER_KEY}
          onFinishClick={onFinishVideoCallback}
        />
      );

    default:
      return (
        <VideoPlayerModalWithRedux
          name={POPUP_WELCOME_VIEW_RESULTS_VIDEO}
          title={messages.viewResultsVideoTitle}
          uuid={VIDYARD_UUID_RESULTS}
          onFinishClick={onFinishVideoCallback}
        />
      );
  }
};

export const GET_LENGTH_ITEMS = (type, classes, updateStates) => GET_MODAL_ITEMS(type, classes, updateStates).length;

export const GET_MODAL_ITEMS = (type, classes, updateStates) => {
  switch (type) {
    case RESULTS_TYPE:
      return [
        {
          className: classes.movies_icon,
          icon: YouTube,
          message: messages.helpModalTutorialView,
          onClick: () => updateStates.setIsShowVideo(true),
          tooltipMessage: messages.resultsTooltipVideo,
        },
        {
          className: classes.help_articles_icon,
          icon: OpenInNew,
          message: messages.helpModalHelpArticles,
          onClick: () => window.open(LINKS[type]),
          tooltipMessage: messages.resultsTooltipArticle,
        },
      ];

    case CREATE_ANSWERS_TYPE:
      return [
        {
          className: classes.movies_icon,
          icon: YouTube,
          message: messages.helpModalTutorialView,
          onClick: () => updateStates.setIsShowVideo(true),
          tooltipMessage: messages.createAnswerKeysTooltipVideo,
        },
        {
          className: classes.help_articles_icon,
          icon: OpenInNew,
          message: messages.helpModalHelpArticles,
          onClick: () => window.open(LINKS[type]),
          tooltipMessage: messages.createAnswerKeysTooltipArticle,
        },
      ];

    default:
      return [
        {
          className: classes.movies_icon,
          icon: YouTube,
          message: messages.helpModalTutorialView,
          onClick: () => updateStates.setIsShowVideo(true),
          tooltipMessage: messages.resultsTooltipVideo,
        },
        {
          className: classes.help_articles_icon,
          icon: OpenInNew,
          message: messages.helpModalHelpArticles,
          onClick: () => window.open(LINKS[type]),
          tooltipMessage: messages.resultsTooltipArticle,
        },
      ];
  }
};
