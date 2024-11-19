import React from 'react';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { getClassNameForMark } from 'utils/helpers/results/resultsHelper';
import classNames from 'classnames';
import messages from './messages';
import { StudentAnswerImageView, StudentAnswerView, StudentMarkView } from '../Views';

const getBlankText = color => (
  <div style={{ color }}>
    <FormattedMessage {...messages.blank} />
  </div>
);

const isEmpty = text => _.isEmpty(text) || text.replace(/\s/g, '').length < 1;

const COLUMNS = (classes, expandedStudentMarks, orderBy, onDisplayStudentMarks, color) => [
  {
    id: 'first_name',
    key: 'first_name',
    label: <FormattedMessage {...messages.firstName} />,
    align: 'left',
    verticalAlign: 'center',
    width: '13%',
    render: text => (isEmpty(text) ? getBlankText(color) : text),
    enableSort: true,
  },
  {
    id: 'last_name',
    key: 'last_name',
    label: <FormattedMessage {...messages.lastName} />,
    align: 'left',
    verticalAlign: 'center',
    width: '13%',
    render: text => (isEmpty(text) ? getBlankText(color) : text),
    enableSort: true,
  },
  {
    id: 'student_answer',
    key: 'student_answer',
    label: <FormattedMessage {...messages.studentAnswer} />,
    align: 'center',
    verticalAlign: 'center',
    width: '24%',
    render: (value, item) => <StudentAnswerView item={item} value={value} />,
  },
  {
    id: 'student_image',
    key: 'student_image',
    label: <FormattedMessage {...messages.studentImage} />,
    align: 'center',
    verticalAlign: 'center',
    width: '41.5%',
    render: (value, item) => <StudentAnswerImageView item={item} value={value} />,
  },
  {
    id: 'mark',
    key: 'mark',
    label: <FormattedMessage {...messages.mark} />,
    align: 'center',
    verticalAlign: 'center',
    width: '10.5%',
    render: (value, item) => (
      <StudentMarkView
        expandedStudentMarks={expandedStudentMarks}
        item={item}
        orderBy={orderBy}
        resultId={item.assessment_result_id}
        tabKey="answers"
        value={value}
        onDisplayStudentMarks={onDisplayStudentMarks}
      />
    ),
    classNames: item => ({
      root: classNames(classes.answers_mark, getClassNameForMark(item)),
    }),
    enableSort: true,
  },
];

const TABLE_STYLE = { width: 'calc(100% - 46px)', margin: '25px auto auto' };

export { COLUMNS, TABLE_STYLE };
