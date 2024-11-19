import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';

const CreateButtonAssessment = () => (
  <div>
    <FormattedMessage {...messages.createdAssessmentsButton} />
  </div>
);

export default CreateButtonAssessment;
