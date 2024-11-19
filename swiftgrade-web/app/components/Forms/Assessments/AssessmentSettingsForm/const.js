import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const TIMER_UNIT_OPTIONS = [
  { key: 'minutes', value: 'minutes', message: messages.minutes },
  { key: 'hours', value: 'hours', message: messages.hours },
  { key: 'days', value: 'days', message: messages.days },
];

const getAttachmentsTooltip = classes => (
  <div className={classes.attachments_tooltip_wrap}>
    <FormattedMessage {...messages.tooltipPartOne} />
    <ul className={classes.attachments_tooltip_list}>
      <li>
        <FormattedMessage {...messages.tooltipPartTwo} />
      </li>
      <li>
        <FormattedMessage {...messages.tooltipPartThree} />
      </li>
    </ul>
  </div>
);

const TOOLTIP_TITLE = classes => ({
  attachments: getAttachmentsTooltip(classes),
});

const RELEASE_RESULTS_TYPES = [
  { key: 'mark', value: 'mark', label: <FormattedMessage {...messages.finalMark} /> },
  {
    key: 'mark_plus_student_answers',
    value: 'mark_plus_student_answers',
    label: <FormattedMessage {...messages.finalMarkPlusStudentAnswers} />,
  },
  {
    key: 'mark_plus_student_answers_plus_correct_answers',
    value: 'mark_plus_student_answers_plus_correct_answers',
    label: <FormattedMessage {...messages.finalMarkPlusStudentAnswersPlusCorrectAnswers} />,
  },
];

const SETTINGS_TITLES = {
  attachments: messages.attachmentsTitle,
  review: messages.reviewTitle,
  security: messages.securityTitle,
  timing: messages.timingTitle,
};

export { RELEASE_RESULTS_TYPES, SETTINGS_TITLES, TIMER_UNIT_OPTIONS, TOOLTIP_TITLE };
