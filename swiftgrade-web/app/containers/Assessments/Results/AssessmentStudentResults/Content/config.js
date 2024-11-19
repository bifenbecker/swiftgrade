import {
  markColumn,
  numberColumn,
  studentAnswerColumn,
  teacherAnswerColumn,
  studentImageColumn,
} from 'utils/helpers/results';

export const STUDENT_RESULTS_COLUMNS = (classes, expandedStudentMarks, onDisplayStudentMarks) => [
  numberColumn(classes, true, 'student_results'),
  studentAnswerColumn(classes, true, 'student_results', true),
  markColumn(classes, expandedStudentMarks, false, null, onDisplayStudentMarks, 'student_results'),
];

export const STUDENT_RESULTS_WITH_CORRECT_ANSWERS_COLUMNS = (classes, expandedStudentMarks, onDisplayStudentMarks) => [
  numberColumn(classes, false, 'student_results'),
  teacherAnswerColumn(classes, true, 'student_results'),
  studentAnswerColumn(classes, true, 'student_results'),
  markColumn(classes, expandedStudentMarks, false, null, onDisplayStudentMarks, 'student_results'),
];

export const STUDENT_PAPER_RESULTS_COLUMNS = (classes, expandedStudentMarks, onDisplayStudentMarks) => [
  numberColumn(classes, true, 'student_paper_results'),
  studentAnswerColumn(classes, true, 'student_paper_results', true),
  studentImageColumn(classes, true, 'student_paper_results', true),
  markColumn(classes, expandedStudentMarks, true, null, onDisplayStudentMarks, 'student_paper_results'),
];

export const STUDENT_PAPER_RESULTS_WITH_CORRECT_ANSWERS_COLUMNS = (
  classes,
  expandedStudentMarks,
  onDisplayStudentMarks,
) => [
  numberColumn(classes, true, 'student_paper_results'),
  teacherAnswerColumn(classes, true, 'student_paper_results'),
  studentAnswerColumn(classes, true, 'student_paper_results'),
  studentImageColumn(classes, true, 'student_paper_results'),
  markColumn(classes, expandedStudentMarks, true, null, onDisplayStudentMarks, 'student_paper_results'),
];
