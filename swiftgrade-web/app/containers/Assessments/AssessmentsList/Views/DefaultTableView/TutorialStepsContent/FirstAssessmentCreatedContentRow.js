import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

import '../styles.scss';

const FirstAssessmentCreatedContentRow = () => (
  <div className="congrats">
    <FormattedMessage {...messages.createdFirstAssessmentRow} />
  </div>
);

export default FirstAssessmentCreatedContentRow;
