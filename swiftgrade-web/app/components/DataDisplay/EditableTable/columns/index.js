import React from 'react';
import { get as lodashGet } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { createTextColumn, keyColumn } from 'react-datasheet-grid';
import messages from '../messages';

const truncateString = (cellValue, columnName) => {
  if (cellValue) {
    if (columnName === 'firstName' || columnName === 'lastName') {
      return cellValue.slice(0, 30).trim();
    }
    return cellValue.slice(0, 30).replace(/\s/g, '');
  }
  return '';
};

const defaultSettings = columnName => ({
  alignRight: false,
  continuousUpdates: false,
  parseUserInput: value => truncateString(value, columnName),
  parsePastedValue: value => truncateString(value, columnName),
});

const TITLES = {
  firstName: <FormattedMessage {...messages.firstName} />,
  lastName: <FormattedMessage {...messages.lastName} />,
  username: <FormattedMessage {...messages.usernameEmail} />,
  password: <FormattedMessage {...messages.password} />,
};

const COLUMN_NAMES = ['firstName', 'lastName', 'username', 'password'];

export const columns = COLUMN_NAMES.map(columnName => ({
  ...keyColumn(columnName, createTextColumn(defaultSettings(columnName))),
  title: lodashGet(TITLES, columnName, ''),
}));
