import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { TUTORIAL_MODAL_TITLES } from './constants';

const TutorialModalTitle = ({ tutorialKey }) => {
  const modalTitleData = TUTORIAL_MODAL_TITLES[tutorialKey];
  return (
    <div style={modalTitleData.style || {}}>
      <FormattedMessage {...modalTitleData.message} />
    </div>
  );
};

TutorialModalTitle.propTypes = {
  tutorialKey: PropTypes.string,
};

export default TutorialModalTitle;
