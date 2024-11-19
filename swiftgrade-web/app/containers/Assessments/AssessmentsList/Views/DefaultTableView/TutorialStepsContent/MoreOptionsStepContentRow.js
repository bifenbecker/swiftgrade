import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';

const MoreOptionsStepContentRow = () => (
  <div>
    <FormattedMessage {...messages.optionsFoundHereRow} />
  </div>
);

export default MoreOptionsStepContentRow;
