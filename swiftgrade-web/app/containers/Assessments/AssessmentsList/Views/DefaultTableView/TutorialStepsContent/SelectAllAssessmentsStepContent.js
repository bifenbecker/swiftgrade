import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';

const SelectAllAssessmentsStepContent = () => (
  <div>
    <FormattedMessage {...messages.clickToSelectAll} />
  </div>
);

export default SelectAllAssessmentsStepContent;
