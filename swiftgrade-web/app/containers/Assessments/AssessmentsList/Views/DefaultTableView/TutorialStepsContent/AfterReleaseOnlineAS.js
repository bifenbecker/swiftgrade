import React from 'react';

import { FormattedMessage } from 'react-intl';
import { NewRelease } from 'images';
import messages from '../messages';

import '../styles.scss';

const AfterReleaseOnlineAS = () => (
  <div className="congrats">
    <FormattedMessage {...messages.afterReleaseOnlineAS} />
    <br />
    <img src={NewRelease} className="congrats_icon" alt="" />
  </div>
);

export default AfterReleaseOnlineAS;
