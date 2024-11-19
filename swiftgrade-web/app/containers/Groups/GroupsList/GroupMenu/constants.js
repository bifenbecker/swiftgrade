import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export const OPTIONS = [
  {
    key: 'rename',
    value: 'rename',
    label: <FormattedMessage {...messages.rename} />,
  },
  {
    key: 'copy',
    value: 'copy',
    label: <FormattedMessage {...messages.copy} />,
  },
  {
    key: 'delete',
    value: 'delete',
    label: <FormattedMessage {...messages.delete} />,
  },
];
