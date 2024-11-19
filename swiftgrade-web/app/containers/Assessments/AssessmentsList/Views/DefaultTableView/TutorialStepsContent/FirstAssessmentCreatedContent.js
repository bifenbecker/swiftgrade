import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

import '../styles.scss';

const FirstAssessmentCreatedContent = () => (
  <div className="congrats">
    <FormattedMessage {...messages.createdFirstAssessment} />
  </div>
);

export default FirstAssessmentCreatedContent;
