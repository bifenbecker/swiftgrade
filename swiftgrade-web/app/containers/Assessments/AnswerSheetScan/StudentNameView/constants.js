import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import messages from '../messages';

export const UNNAMED_STUDENT_DATA = classes => ({
  names: [
    {
      wrapperClassName: classes.wrapper_fname_img,
      className: classes.name_img,
      errorClassName: classes.error_text,
      key: 'first_name_url',
      message: <FormattedMessage {...messages.noFirstNameDetected} />,
    },
    {
      wrapperClassName: classes.wrapper_lname_img,
      className: classes.name_img,
      errorClassName: classes.error_text,
      key: 'last_name_url',
      message: <FormattedMessage {...messages.noLastNameDetected} />,
    },
  ],
  email: {
    wrapperClassName: classes.wrapper_email_img,
    className: classes.email_img,
    errorClassName: classNames(classes.error_text, 'email'),
    key: 'email_url',
    message: <FormattedMessage {...messages.noEmailDetected} />,
  },
});
