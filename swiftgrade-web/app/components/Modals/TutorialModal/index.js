import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { hideModal, showModal } from 'components/Modals/Modal/actions';

import { createStructuredSelector } from 'reselect';
import TutorialModalBody from './TutorialModalBody';
import TutorialModalTitle from './TutorialModalTitle';

import {
  AFTER_RELEASE_TUTORIAL_KEY,
  ASK_TO_WRITE_NEATLY_TUTORIAL_KEY,
  SCAN_WRITTEN_AS_TUTORIAL_KEY,
} from './constants';
import { makeSelectCurrentUser } from '../../../containers/App/selectors';

const TutorialModal = ({ group, hideTutorialModal, showTutorialModal, tutorialKey, user, ...rest }) => {
  useEffect(() => {
    showTutorialModal({
      title: <TutorialModalTitle tutorialKey={tutorialKey} />,
      body: (
        <TutorialModalBody
          group={group}
          hideModal={hideTutorialModal}
          tutorialKey={tutorialKey}
          user={user}
          {...rest}
        />
      ),
      customStyles: [
        AFTER_RELEASE_TUTORIAL_KEY,
        ASK_TO_WRITE_NEATLY_TUTORIAL_KEY,
        SCAN_WRITTEN_AS_TUTORIAL_KEY,
      ].includes(tutorialKey)
        ? { top: 'auto' }
        : null,
    });
  }, []);

  return <></>;
};

TutorialModal.propTypes = {
  group: PropTypes.object,
  hideTutorialModal: PropTypes.func,
  showTutorialModal: PropTypes.func,
  tutorialKey: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  hideTutorialModal: hideModal,
  showTutorialModal: showModal,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(TutorialModal);
