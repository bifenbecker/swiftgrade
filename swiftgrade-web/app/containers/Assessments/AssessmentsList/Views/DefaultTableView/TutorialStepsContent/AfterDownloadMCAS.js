import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Star } from 'images';
import messages from '../messages';

import '../styles.scss';

const AfterDownloadMCAS = () => (
  <div className="congrats">
    <FormattedMessage {...messages.downloadMCAS} />
    <br />
    <img src={Star} className="congrats_icon" alt="" />
  </div>
);

export default AfterDownloadMCAS;
