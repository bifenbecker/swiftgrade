import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import PropTypes from 'prop-types';

import lodashGet from 'lodash/get';
import { createStructuredSelector } from 'reselect';

import { getCurrentUserRequest, updateCurrentUserRequest } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { getUserData } from 'utils/helpers/usersHelper';

import { ASSESSMENTS_LIST_PAGE_TUTORIAL, ASSESSMENTS_LIST_TIPS_DISPLAYABLE_TUTORIAL_PROGRESS } from 'globalConstants';
import { tutorialNextButtonBGColor, tutorialZIndex } from './constants';
import CustomTooltip from './CustomTooltip';

const ControlledJoyrideTutorial = ({
  continuous = false,
  customTutorialsProps,
  getCurrentUser,
  ignoreDidMount = false,
  setTutorialIsRunning,
  setTutorialStepIndex,
  tutorialIsRunning,
  tutorialKey = null,
  tutorialSteps,
  tutorialStepIndex,
  updateCurrentUser,
  user,
  ...rest
}) => {
  const [isShowTutorial, setIsShowTutorial] = useState(false);

  useEffect(() => {
    setIsShowTutorial(true);
    const handleSuccess = data => {
      if (continuous) {
        setTutorialIsRunning(data.enabled_tutorials[tutorialKey] === true);
      } else {
        const firstStep = tutorialSteps.findIndex(step => data.enabled_tutorials[step.tutorialKey] === true);
        setTutorialStepIndex(firstStep === -1 ? tutorialSteps.length : firstStep);
        setTutorialIsRunning(true);
      }
    };
    if (!ignoreDidMount) {
      const userData = getUserData();
      getCurrentUser({ userId: userData.user_id, handleSuccess });
    }
  }, []);

  const handleSuccessUpdateUser = () => {
    // It needs to return component to initial state
    setTutorialIsRunning(false);
    setTutorialStepIndex(0);
    setIsShowTutorial(true);
  };

  const markContiniousTutorialAsCompleted = isFinished => {
    if (isFinished) {
      const updateData = {
        enabled_tutorials: {
          ...user.enabled_tutorials,
          [tutorialKey]: false,
        },
      };

      if (tutorialKey === ASSESSMENTS_LIST_PAGE_TUTORIAL) {
        updateData.tutorials_progress = {
          ...user.tutorials_progress,
          [ASSESSMENTS_LIST_TIPS_DISPLAYABLE_TUTORIAL_PROGRESS]: false,
        };
      }

      setIsShowTutorial(false);
      updateCurrentUser({
        data: updateData,
        userId: user.id,
        handleSuccess: handleSuccessUpdateUser,
      });
    }
  };

  const markTutorialAsCompleted = () => {
    const tutorialStepKey = lodashGet(tutorialSteps[tutorialStepIndex], 'tutorialKey');
    const enabledTutorials = { ...user.enabled_tutorials };

    if (tutorialKey || tutorialStepKey) {
      enabledTutorials[tutorialKey || tutorialStepKey] = false;
      setIsShowTutorial(false);
      updateCurrentUser({
        data: { enabled_tutorials: enabledTutorials },
        userId: user.id,
        handleSuccess: handleSuccessUpdateUser,
      });
    }
  };

  const onFinishCallback = isFinished => {
    const markTutorialFunction = continuous ? markContiniousTutorialAsCompleted : markTutorialAsCompleted;
    markTutorialFunction(isFinished);
  };

  const handleTutorialClick = data => {
    const { action, index, status, type } = data;
    if (type === EVENTS.STEP_AFTER) {
      onStepIndexChange(index + (action === ACTIONS.PREV ? -1 : 1));
      onFinishCallback(false);
    } else if (action === ACTIONS.CLOSE || [STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      onFinishCallback(true);
    }
  };

  let tutorialProps = {};
  const tutorialStyles = {
    options: {
      zIndex: tutorialZIndex,
    },
    buttonBack: {
      color: 'black',
    },
    buttonClose: {
      display: 'none',
    },
    buttonNext: {
      backgroundColor: tutorialNextButtonBGColor,
    },
  };

  const onStepIndexChange = index => {
    if (continuous) {
      setTutorialStepIndex(index);
    } else {
      const firstStep = tutorialSteps.findIndex(
        step =>
          user.enabled_tutorials[step.tutorialKey] === true &&
          step.tutorialKey !== tutorialSteps[tutorialStepIndex].tutorialKey,
      );
      setTutorialStepIndex(firstStep === -1 ? tutorialSteps.length : firstStep);
    }
  };

  if (continuous) {
    tutorialProps = {
      ...customTutorialsProps,
      ...tutorialProps,
      continuous: true,
      showProgress: false,
      hideBackButton: true,
    };
  }

  // isShow variable fix bug when two tutorials come in turn and second can not appear well
  return (
    isShowTutorial && (
      <Joyride
        callback={handleTutorialClick}
        run={user && user.enabled_tutorials[tutorialKey]}
        steps={tutorialSteps}
        stepIndex={tutorialStepIndex}
        tooltipComponent={CustomTooltip}
        disableCloseOnEsc
        disableOverlayClose
        hideBackButton
        styles={tutorialStyles}
        {...tutorialProps}
        {...rest}
      />
    )
  );
};

ControlledJoyrideTutorial.propTypes = {
  continuous: PropTypes.bool,
  customTutorialsProps: PropTypes.object,
  getCurrentUser: PropTypes.func,
  ignoreDidMount: PropTypes.bool,
  setTutorialIsRunning: PropTypes.func,
  setTutorialStepIndex: PropTypes.func,
  tutorialIsRunning: PropTypes.bool,
  tutorialKey: PropTypes.string,
  tutorialSteps: PropTypes.array,
  tutorialStepIndex: PropTypes.number,
  updateCurrentUser: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  getCurrentUser: getCurrentUserRequest,
  updateCurrentUser: updateCurrentUserRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(ControlledJoyrideTutorial);
