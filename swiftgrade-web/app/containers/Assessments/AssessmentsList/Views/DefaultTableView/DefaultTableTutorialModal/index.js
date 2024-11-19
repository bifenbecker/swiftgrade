import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import lodashGet from 'lodash/get';

import { TutorialModal } from 'components/Modals';
import {
  AFTER_RELEASE_TUTORIAL_KEY,
  ASK_TO_WRITE_NEATLY_TUTORIAL_KEY,
  CUSTOM_TUTORIAL_KEY,
  DISTRIBUTE_GENERIC_AS_TUTORIAL_KEY,
  DISTRIBUTE_REGULAR_AS_TUTRIAL_KEY,
  GENERIC_TUTORIAL_KEY,
  NO_STUDENTS_TUTORIAL_KEY,
  ONLINE_TUTORIAL_KEY,
  SCAN_WRITTEN_AS_TUTORIAL_KEY,
  SCAN_WRITTEN_GENERIC_AS_TUTORIAL_KEY,
  STUDENTS_MUST_FILL_CIRCLES_TUTORIAL_KEY,
} from 'components/Modals/TutorialModal/constants';
import { getCurrentUserRequest, updateCurrentUserRequest } from 'containers/App/actions';
import { isPopupDisplayable } from 'utils/helpers/tutorialHelpers';
import { getUserData } from 'utils/helpers/usersHelper';
import {
  AFTER_RELEASE_POPUP,
  ASK_STUDENTS_TO_WRITE_NEATLY_POPUP,
  ASSESSMENTS_LIST_PAGE_TUTORIAL,
  CUSTOM_SHEET,
  DISTRIBUTE_REGULAR_AS_POPUP,
  GENERIC_SHEET,
  NO_STUDENTS_IN_CLASS_POPUP,
  ONLINE_SHEET,
  PAPER_SHEET,
  PRINT_MC_SHEETS_POPUP,
  PRINT_REGULAR_SHEETS_POPUP,
  RELEASE_ONLINE_SHEETS_POPUP,
  SCAN_WRITTEN_AS_POPUP,
  DISTRIBUTE_GENERIC_AS_POPUP,
  STUDENTS_MUST_FILL_CIRCLES_POPUP,
  SCAN_GENERIC_AS_POPUP,
} from 'globalConstants';

class DefaultTableTutorialModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popupKey: null,
      tutorialKey: null,
    };
  }

  componentDidMount() {
    const { getCurrentUser } = this.props;

    const handleSuccess = data => {
      this.processUserData(data);
    };
    const userData = getUserData();
    getCurrentUser({ userId: userData.user_id, handleSuccess });
  }

  getFromHistoryState = stateKey => lodashGet(this.props.history, `location.state.${stateKey}`);

  markStepAsCompleted = (setStateCallback = () => {}) => {
    const { setTutorialModalVisibility, updateCurrentUser, user } = this.props;
    const { popupKey } = this.state;
    const handleSuccess = () => {
      setTutorialModalVisibility(false, setStateCallback);
    };

    const enabledPopups = {
      ...user.enabled_popups,
      [popupKey]: false,
    };

    updateCurrentUser({
      data: { enabled_popups: enabledPopups },
      userId: user.id,
      handleSuccess,
    });
  };

  onAfterClick = () => {
    const { group, setTutorialModalVisibility, updateCurrentUser, user } = this.props;
    const { tutorialKey } = this.state;
    if ([CUSTOM_TUTORIAL_KEY, GENERIC_TUTORIAL_KEY, ONLINE_TUTORIAL_KEY].includes(tutorialKey)) {
      const enabledTutorials = {
        ...user.enabled_tutorials,
        [ASSESSMENTS_LIST_PAGE_TUTORIAL]: true,
      };

      updateCurrentUser({
        data: { enabled_tutorials: enabledTutorials },
        userId: user.id,
      });
    }

    if (tutorialKey === AFTER_RELEASE_TUTORIAL_KEY && group.students_count === 0) {
      this.setState({ popupKey: NO_STUDENTS_IN_CLASS_POPUP, tutorialKey: NO_STUDENTS_TUTORIAL_KEY });
      setTutorialModalVisibility(true);
    } else if (tutorialKey === DISTRIBUTE_REGULAR_AS_TUTRIAL_KEY) {
      this.setState({ popupKey: ASK_STUDENTS_TO_WRITE_NEATLY_POPUP, tutorialKey: ASK_TO_WRITE_NEATLY_TUTORIAL_KEY });
      setTutorialModalVisibility(true);
    } else if (tutorialKey === ASK_TO_WRITE_NEATLY_TUTORIAL_KEY) {
      this.setState({ popupKey: SCAN_WRITTEN_AS_POPUP, tutorialKey: SCAN_WRITTEN_AS_TUTORIAL_KEY });
      setTutorialModalVisibility(true);
    }
  };

  processUserData = userData => {
    const { group, setTutorialModalVisibility } = this.props;
    const customSheetGenerated = this.getFromHistoryState('customSheetGenerated');
    const genericSheetGenerated = this.getFromHistoryState('generatedGenericSheet');
    const onlineSheetReleased = this.getFromHistoryState('onlineSheetReleased');
    const sheetKind = this.getFromHistoryState('sheetKind');
    const sheetType = this.getFromHistoryState('sheetType');
    let tutorialKey;
    let popupKey;

    if (sheetType === PAPER_SHEET) {
      if (isPopupDisplayable(userData, PRINT_MC_SHEETS_POPUP, false) && sheetKind === GENERIC_SHEET) {
        popupKey = PRINT_MC_SHEETS_POPUP;
        tutorialKey = GENERIC_TUTORIAL_KEY;
      } else if (isPopupDisplayable(userData, PRINT_REGULAR_SHEETS_POPUP, false) && sheetKind === CUSTOM_SHEET) {
        popupKey = PRINT_REGULAR_SHEETS_POPUP;
        tutorialKey = CUSTOM_TUTORIAL_KEY;
      }
    } else if (isPopupDisplayable(userData, RELEASE_ONLINE_SHEETS_POPUP, false) && sheetType === ONLINE_SHEET) {
      popupKey = RELEASE_ONLINE_SHEETS_POPUP;
      tutorialKey = ONLINE_TUTORIAL_KEY;
    } else if (isPopupDisplayable(userData, AFTER_RELEASE_POPUP) && onlineSheetReleased) {
      popupKey = AFTER_RELEASE_POPUP;
      tutorialKey = AFTER_RELEASE_TUTORIAL_KEY;
    } else if (onlineSheetReleased && group.students_count === 0) {
      popupKey = NO_STUDENTS_IN_CLASS_POPUP;
      tutorialKey = NO_STUDENTS_TUTORIAL_KEY;
    } else if (isPopupDisplayable(userData, DISTRIBUTE_REGULAR_AS_POPUP) && customSheetGenerated) {
      popupKey = DISTRIBUTE_REGULAR_AS_POPUP;
      tutorialKey = DISTRIBUTE_REGULAR_AS_TUTRIAL_KEY;
    } else if (isPopupDisplayable(userData, ASK_STUDENTS_TO_WRITE_NEATLY_POPUP) && customSheetGenerated) {
      popupKey = ASK_STUDENTS_TO_WRITE_NEATLY_POPUP;
      tutorialKey = ASK_TO_WRITE_NEATLY_TUTORIAL_KEY;
    } else if (isPopupDisplayable(userData, SCAN_WRITTEN_AS_POPUP) && customSheetGenerated) {
      popupKey = SCAN_WRITTEN_AS_POPUP;
      tutorialKey = SCAN_WRITTEN_AS_TUTORIAL_KEY;
    } else if (isPopupDisplayable(userData, DISTRIBUTE_GENERIC_AS_POPUP) && genericSheetGenerated) {
      popupKey = DISTRIBUTE_GENERIC_AS_POPUP;
      tutorialKey = DISTRIBUTE_GENERIC_AS_TUTORIAL_KEY;
    } else if (isPopupDisplayable(userData, STUDENTS_MUST_FILL_CIRCLES_POPUP) && genericSheetGenerated) {
      popupKey = STUDENTS_MUST_FILL_CIRCLES_POPUP;
      tutorialKey = STUDENTS_MUST_FILL_CIRCLES_TUTORIAL_KEY;
    } else if (isPopupDisplayable(userData, SCAN_GENERIC_AS_POPUP) && genericSheetGenerated) {
      popupKey = SCAN_GENERIC_AS_POPUP;
      tutorialKey = SCAN_WRITTEN_GENERIC_AS_TUTORIAL_KEY;
    }

    if (!popupKey || !tutorialKey) {
      setTutorialModalVisibility(false);
      return;
    }

    this.setState({ popupKey, tutorialKey });
    setTutorialModalVisibility(true);
  };

  render() {
    const { group, history, setTutorialModalVisibility, tutorialModalIsVisible } = this.props;
    const { tutorialKey } = this.state;
    if (tutorialModalIsVisible && tutorialKey) {
      return (
        <TutorialModal
          group={group}
          history={history}
          tutorialKey={tutorialKey}
          okCallback={() => setTutorialModalVisibility(false, this.onAfterClick)}
          onDoNotShowClick={() => this.markStepAsCompleted(this.onAfterClick)}
        />
      );
    }

    return <></>;
  }
}

DefaultTableTutorialModal.propTypes = {
  getCurrentUser: PropTypes.func,
  group: PropTypes.object,
  history: PropTypes.object,
  setTutorialModalVisibility: PropTypes.func,
  tutorialModalIsVisible: PropTypes.bool,
  updateCurrentUser: PropTypes.func,
  user: PropTypes.object,
};

const mapDispatchToProps = {
  getCurrentUser: getCurrentUserRequest,
  updateCurrentUser: updateCurrentUserRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(DefaultTableTutorialModal);
