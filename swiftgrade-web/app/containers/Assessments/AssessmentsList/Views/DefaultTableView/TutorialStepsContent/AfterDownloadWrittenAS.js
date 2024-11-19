import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Award } from 'images';
import messages from '../messages';

import '../styles.scss';

const AfterDownloadWrittenAS = () => (
  <div className="congrats">
    <FormattedMessage {...messages.downloadWrittenAS} />
    <br />
    <img src={Award} className="congrats_icon" alt="" />
  </div>
);

export default AfterDownloadWrittenAS;
