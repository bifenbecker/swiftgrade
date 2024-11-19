import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const COLUMNS = classes => [
  {
    id: 'mean_mark',
    label: <FormattedMessage {...messages.meanMark} />,
    align: 'center',
    width: 'calc(20% - 9px)',
    classNames: { body: classes.body_column },
  },
  {
    id: 'median_mark',
    label: <FormattedMessage {...messages.medianMark} />,
    align: 'center',
    width: 'calc(20% - 9px)',
    classNames: { body: classes.body_column },
  },
  {
    id: 'high_mark',
    label: <FormattedMessage {...messages.highMark} />,
    align: 'center',
    width: 'calc(20% - 9px)',
    classNames: { body: classes.body_column },
  },
  {
    id: 'low_mark',
    label: <FormattedMessage {...messages.lowMark} />,
    align: 'center',
    width: 'calc(20% - 9px)',
    classNames: { body: classes.body_column },
  },
  {
    id: 'deviation',
    label: <FormattedMessage {...messages.deviation} />,
    align: 'center',
    width: 'calc(20% - 9px)',
    classNames: { body: classes.body_column },
  },
];

const TABLE_STYLE = { width: 'calc(100% - 46px)', margin: '25px auto auto' };

export { COLUMNS, TABLE_STYLE };
