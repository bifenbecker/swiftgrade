import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createMuiTheme } from '@material-ui/core/styles';

import messages from './messages';

const HELP_MODAL_THEME = color =>
  createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
    },
    overrides: {
      MuiListItem: {
        root: {
          fontSize: 13,
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          '&:hover': {
            color,
          },
        },
        gutters: {
          padding: '0px 18px 2px',
        },
      },
    },
  });
const TABS = [
  { key: 'results', label: <FormattedMessage {...messages.results} />, value: 'results' },
  { key: 'answers', label: <FormattedMessage {...messages.answers} />, value: 'answers' },
  { key: 'averages', label: <FormattedMessage {...messages.averages} />, value: 'averages' },
  { key: 'analysis', label: <FormattedMessage {...messages.analysis} />, value: 'analysis' },
];

export { HELP_MODAL_THEME, TABS };
