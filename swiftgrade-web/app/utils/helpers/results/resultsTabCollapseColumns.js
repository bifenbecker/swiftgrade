import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import React from 'react';
import { getClassNameForMark, getVerticalAlign } from 'utils/helpers/results/resultsHelper';
import messages from 'containers/Assessments/Results/AssessmentResults/messages';
import {
  StudentAnswerImageView,
  StudentAnswerView,
  StudentMarkView,
  TeacherAnswerView,
} from 'containers/Assessments/Results/Views';
import { ANSWER_KIND_TYPES, WIDTH } from './tableHelper';

const getTableKey = onlineAssessmentResults => {
  if (onlineAssessmentResults) {
    return 'online_assessment_table';
  }
  return 'table';
};

const getColumnWidth = (onlineAssessmentResults, onlyStudentAnswers, widthKey, columnName) => {
  if (widthKey === 'student_results' || widthKey === 'student_paper_results') {
    return WIDTH(widthKey, columnName, onlyStudentAnswers);
  }
  const columnWidthKey = getTableKey(onlineAssessmentResults);
  return WIDTH(widthKey, columnName, onlyStudentAnswers)[columnWidthKey];
};

const numberColumn = (classes, onlyStudentAnswers, widthKey = 'answers', isTooltip = false) => ({
  id: 'number',
  key: 'number',
  label: '#',
  align: 'center',
  verticalAlign: item => getVerticalAlign(item),
  width: getColumnWidth(false, onlyStudentAnswers, widthKey, 'number'),
  headerBackground: '#F5F5F5',
  render: value => <div>{value}</div>,
  classNames: item => ({
    head: classes.id_column,
    root: classNames(classes.assessment_item_type, item && item.kind),
  }),
  tooltip: item => (isTooltip ? ANSWER_KIND_TYPES.find(object => object.value === item.kind).message : null),
});

const teacherAnswerColumn = (classes, onlineAssessmentResults, widthKey = 'answers', onlyStudentAnswers = false) => ({
  id: 'answers',
  key: 'answers',
  label: <FormattedMessage {...messages.answerKey} />,
  align: 'center',
  verticalAlign: item => getVerticalAlign(item),
  width: getColumnWidth(onlineAssessmentResults, onlyStudentAnswers, widthKey, 'answer'),
  headerBackground: '#F5F5F5',
  render: (value, item, assessment) => <TeacherAnswerView value={value} item={item} assessment={assessment} />,
  classNames: {
    head: classes.answer_key_column,
    body: classNames(classes.student_result_table_column),
  },
});
const studentAnswerColumn = (classes, onlineAssessmentResults, widthKey = 'answers', onlyStudentAnswers = false) => ({
  id: 'student_answer',
  key: 'student_answer',
  label: <FormattedMessage {...messages.studentAnswer} />,
  align: 'center',
  verticalAlign: item => getVerticalAlign(item),
  width: getColumnWidth(onlineAssessmentResults, onlyStudentAnswers, widthKey, 'student_answer'),
  headerBackground: '#F5F5F5',
  render: (value, item) => <StudentAnswerView value={value} item={item} />,
  classNames: {
    head: classes.student_answer_column,
    body: classNames(classes.student_result_table_column),
  },
});
const studentImageColumn = (classes, onlyStudentAnswers) => ({
  id: 'student_image',
  key: 'student_image',
  label: <FormattedMessage {...messages.studentImage} />,
  align: 'center',
  verticalAlign: item => getVerticalAlign(item),
  width: WIDTH('answers', 'student_image').table,
  headerBackground: '#F5F5F5',
  render: (value, item) => <StudentAnswerImageView item={item} value={value} onlyStudentAnswers={onlyStudentAnswers} />,
  classNames: {
    head: classes.student_image_column,
    body: classNames(classes.student_result_table_column),
  },
});

const markColumn = (
  classes,
  expandedStudentMarks,
  onlyStudentAnswers,
  orderBy,
  onDisplayStudentMarks,
  widthKey = 'answers',
) => ({
  id: 'mark',
  key: 'mark',
  label: <FormattedMessage {...messages.mark} />,
  align: 'center',
  verticalAlign: item => getVerticalAlign(item),
  width: getColumnWidth(false, onlyStudentAnswers, widthKey, 'mark'),
  headerBackground: '#F5F5F5',
  render: (value, item) => (
    <StudentMarkView
      expandedStudentMarks={expandedStudentMarks}
      tabKey="results"
      item={item}
      resultId={item.assessment_result_id}
      value={value}
      orderBy={orderBy}
      onDisplayStudentMarks={onDisplayStudentMarks}
    />
  ),
  classNames: item => ({
    head: classes.mark_column,
    root: classNames(classes.assessment_mark, getClassNameForMark(item)),
  }),
});

export { markColumn, numberColumn, studentAnswerColumn, studentImageColumn, teacherAnswerColumn };
