import React from 'react';

import { FormattedMessage } from 'react-intl';
import { CongratulationsSmile } from 'images';
import messages from '../messages';

import '../styles.scss';

const FirstAssessmentCongratulations = () => (
  <div className="congrats">
    <FormattedMessage {...messages.createdFirstAssessmentCongratulations} />
    <img src={CongratulationsSmile} className="congrats_icon" alt="" />
  </div>
);

export default FirstAssessmentCongratulations;
