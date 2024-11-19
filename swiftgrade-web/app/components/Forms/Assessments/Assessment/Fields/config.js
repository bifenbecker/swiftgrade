import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export const MESSAGES = {
  unit: <FormattedMessage {...messages.unit} />,
  answer: <FormattedMessage {...messages.answer} />,
  significant_figure: <FormattedMessage {...messages.sigFig} />,
};

export const SIZE = (answerWithSecondRow, kind) =>
  ({
    mc: { md: 6, sm: 8, xs: 11 },
    mf: { md: 8, sm: 10, xs: 12 },
    numeric: { md: 8, sm: 10, xs: answerWithSecondRow ? 12 : 8 },
  }[kind]);
