import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';

const CreateButtonAssessmentBefore = () => (
  <div>
    <FormattedMessage {...messages.createdAssessmentsButtonStepsBefore} />
  </div>
);

export default CreateButtonAssessmentBefore;
