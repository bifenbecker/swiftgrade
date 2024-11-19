import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';

const NextStepInColumnStepContent = () => (
  <div>
    <FormattedMessage {...messages.nextStepInThisColumn} />
  </div>
);

export default NextStepInColumnStepContent;
