import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';

const MoreOptionsStepContent = () => (
  <div>
    <FormattedMessage {...messages.optionsFoundHere} />
  </div>
);

export default MoreOptionsStepContent;
