import { FormattedMessage } from 'react-intl';
import React from 'react';
import _ from 'lodash';
import messages from './messages';

export const DEFAULT_FILE_FORMAT = 'PDF';

export const DEFAULT_NUMBER_OF_ANSWERS = 100;

export const DEFAULT_NUMBER_OF_LETTERS = 5;

export const DEFAULT_SHEETS_PER_PAGE = 1;

export const FILE_FORMATS = [{ label: 'PDF', value: 'PDF' }, { label: 'PNG', value: 'PNG' }];

export const NUMBER_OF_ANSWERS = _.range(1, 101).map(value => ({ value, label: value.toString() }));

export const NUMBER_OF_LETTERS = [
  { label: 'A-B', value: 2 },
  { label: 'A-C', value: 3 },
  { label: 'A-D', value: 4 },
  { label: 'A-E', value: 5 },
];

export const SHEETS_PER_PAGE = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '4', value: 4 },
  { label: '6', value: 6 },
];

export const TOGGLE_BUTTON_OPTIONS = [
  { label: <FormattedMessage {...messages.yes} />, value: true },
  { label: <FormattedMessage {...messages.no} />, value: false },
];

export const COEFFICIENT = height => {
  let coefficient = 0.1;

  if (height > 1200) {
    coefficient = 0.4;
  } else if (height >= 800 && height < 1200) {
    coefficient = 0.27;
  } else if (height >= 630 && height < 800) {
    coefficient = 0.15;
  }
  return coefficient;
};
