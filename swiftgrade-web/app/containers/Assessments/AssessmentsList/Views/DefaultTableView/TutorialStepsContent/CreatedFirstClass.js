import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ProductLaunch } from 'images';
import PropTypes from 'prop-types';

import messages from '../messages';
import '../styles.scss';

const CreatedFirstClass = ({ groupsExist }) => {
  const message = groupsExist ? (
    <FormattedMessage {...messages.createdFirstClass} values={{ class_or_classes: 'classes' }} />
  ) : (
    <FormattedMessage {...messages.createdFirstClass} values={{ class_or_classes: 'a class' }} />
  );
  return (
    <div className="congrats">
      {message}
      <br />
      <img src={ProductLaunch} className="congrats_icon" alt="" />
    </div>
  );
};

CreatedFirstClass.propTypes = {
  groupsExist: PropTypes.bool,
};

export default CreatedFirstClass;
