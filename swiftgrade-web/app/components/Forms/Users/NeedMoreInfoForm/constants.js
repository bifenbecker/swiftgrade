import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export const TYPES = [
  { key: 'ms', value: 'ms', message: messages.ms },
  { key: 'mr', value: 'mr', message: messages.mr },
  { key: 'mx', value: 'mx', message: messages.mx },
];

export const TYPES_SCHOOL = [
  { key: 'empty', value: 'empty', message: messages.schoolEmpty },
  { key: 'university', value: 'university', message: messages.university },
  { key: 'high_school', value: 'high_school', message: messages.highSchool },
  { key: 'middle_school', value: 'middle_school', message: messages.middleSchool },
  { key: 'elementary', value: 'elementary', message: messages.elementary },
];

export const SUBJECTS = [
  { key: 'physics', label: <FormattedMessage {...messages.physics} /> },
  { key: 'chemistry', label: <FormattedMessage {...messages.chemistry} /> },
  { key: 'biology', label: <FormattedMessage {...messages.biology} /> },
  { key: 'other_sciences', label: <FormattedMessage {...messages.otherSciences} /> },
  { key: 'math', label: <FormattedMessage {...messages.math} /> },
  { key: 'social_studies', label: <FormattedMessage {...messages.socialStudie} /> },
  { key: 'language_arts', label: <FormattedMessage {...messages.languageArts} /> },
  { key: 'other', label: <FormattedMessage {...messages.other} /> },
];
