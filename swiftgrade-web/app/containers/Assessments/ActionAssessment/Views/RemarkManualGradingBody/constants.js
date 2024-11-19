import { FormattedMessage } from 'react-intl';
import { createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import messages from './messages';

const OPTIONS = [
  {
    key: 'without_manually_graded',
    value: 'without_manually_graded',
    label: <FormattedMessage {...messages.keepManualGrading} />,
  },
  {
    key: 'with_manually_graded',
    value: 'with_manually_graded',
    label: <FormattedMessage {...messages.remarkEverything} />,
  },
];

const THEME = color =>
  createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
    },
  });

export { OPTIONS, THEME };
