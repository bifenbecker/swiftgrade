import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';

const WelcomeToDashboard = () => (
  <div className="dashboard_container">
    <FormattedMessage {...messages.welcomeToDashboard} />
    <br />
    <br />
    <FormattedMessage {...messages.welcomeToDashboardDescription} />
  </div>
);

export default WelcomeToDashboard;
