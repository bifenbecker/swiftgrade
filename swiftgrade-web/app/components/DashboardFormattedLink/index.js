import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Link } from 'react-router-dom';

const DashboardFormattedLink = () => (
  <Link to="/">
    <FormattedMessage id="dashboard" />
  </Link>
);

export { DashboardFormattedLink };
