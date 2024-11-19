import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import messages from './messages';

export const TITLES = classes => [
  {
    key: 'progress',
    xs: 1,
    md: 1,
    className: classNames(classes.assessment_item_progress_title),
  },
  {
    key: 'index',
    xs: 1,
    md: 1,
    message: '#',
    className: classNames(
      classes.assessment_item_content,
      classes.assessment_item_index,
      classes.assessment_item_octothorpe,
    ),
  },
  {
    key: 'answer',
    xs: 10,
    md: 10,
    message: <FormattedMessage {...messages.answer} />,
    className: classNames(classes.assessment_item_content, classes.assessment_item_answer),
  },
];
