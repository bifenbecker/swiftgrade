import React from 'react';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import classNames from 'classnames';
import messages from './messages';

const RANGE = {
  significant_figure: 5.25,
  unit: 5.25,
  answer: 10.25,
};

export const MARKS = key => {
  const marks = _.range(0.25, RANGE[key], 0.25);

  const data = [];

  marks.map(mark => {
    data.push({ key: mark, value: mark, label: Number.isInteger(mark) ? mark.toFixed(1) : String(mark) });
    return mark;
  });

  return data;
};

export const MULTIPLE_OPTIONS = assessmentItems => {
  const data = [];

  const size = _.has(assessmentItems, 'size') ? assessmentItems.size : 0;
  const items = _.range(size + 1, 101);

  items.map(item => {
    data.push({ key: item, value: item, label: `#${item}` });
    return item;
  });
  return data;
};

export const OPTIONS = [
  {
    key: 'scientific_notation',
    value: 'scientific_notation',
    label: 'SN',
    tooltip: <FormattedMessage {...messages.sn} />,
  },

  { key: 'unit', value: 'unit', label: 'U', tooltip: <FormattedMessage {...messages.u} /> },
  {
    key: 'significant_figure',
    value: 'significant_figure',
    label: 'SF',
    tooltip: <FormattedMessage {...messages.sf} />,
  },
];

export const FIB_OPTIONS = [
  {
    key: 'autocorrection',
    value: 'autocorrection',
    label: 'AC',
    tooltip: <FormattedMessage {...messages.autoCorrect} />,
  },
];

export const SETTING_OPTIONS = kind =>
  ({
    fib: [
      {
        key: 'autocorrection',
        value: 'autocorrection',
        label: 'AC',
        tooltip: <FormattedMessage {...messages.autoCorrect} />,
      },
    ],
    mf: [{ key: 'unit', value: 'unit', label: 'U', tooltip: <FormattedMessage {...messages.u} /> }],
    numeric: OPTIONS,
  }[kind]);

export const TITLES = (classes, width) => [
  {
    key: 'index',
    xs: 1,
    md: 1,
    message: '#',
    className: classNames(classes.assessment_item_content, classes.assessment_item_index),
  },
  {
    key: 'type',
    xs: 2,
    md: 2,
    message: <FormattedMessage {...messages.type} />,
    className: classNames(classes.assessment_item_content, classes.assessment_item_type),
  },
  {
    key: 'answer',
    xs: 6,
    md: 5,
    messages: {
      answers: <FormattedMessage {...messages.answer} />,
      marks: <FormattedMessage {...messages.marks} />,
    },
    className: classNames(classes.assessment_item_content, classes.assessment_item_answer, 'answer'),
  },
  {
    key: 'options',
    xs: 2,
    md: 2,
    message: <FormattedMessage {...(width === 'xs' ? messages.opt : messages.options)} />,
    className: classNames(classes.assessment_item_content, classes.assessment_item_setting),
  },
  {
    key: 'actions',
    xs: 1,
    md: 1,
    message: <FormattedMessage {...(width === 'xs' ? messages.act : messages.actions)} />,
    className: classNames(classes.assessment_item_content, classes.assessment_item_action),
  },
];

export const TYPES = [
  { key: 'fib', value: 'fib', message: messages.fib },
  { key: 'numeric', value: 'numeric', message: messages.numeric },
  { key: 'mf', value: 'mf', message: messages.mf },
  { key: 'mc', value: 'mc', message: messages.mc },
];

export const MAX_HEIGHT = 15000;

export const TOLERANCE_OPTIONS = [
  { key: 1, label: '1%', value: 1 },
  { key: 2, label: '2%', value: 2 },
  { key: 3, label: '3%', value: 3 },
  { key: 4, label: '4%', value: 4 },
  { key: 5, label: '5%', value: 5 },
  { key: 6, label: '6%', value: 6 },
  { key: 7, label: '7%', value: 7 },
  { key: 8, label: '8%', value: 8 },
  { key: 9, label: '9%', value: 9 },
  { key: 10, label: '10%', value: 10 },
  { key: 15, label: '15%', value: 15 },
  { key: 20, label: '20%', value: 20 },
  { key: 25, label: '25%', value: 25 },
];
