import { FormattedMessage } from 'react-intl';
import messages from 'containers/Assessments/Results/AssessmentResults/messages';
import React from 'react';

export const ANSWER_KIND_TYPES = [
  { value: 'numeric', message: <FormattedMessage {...messages.numeric} /> },
  { value: 'fib', message: <FormattedMessage {...messages.fib} /> },
  { value: 'mc', message: <FormattedMessage {...messages.mc} /> },
  { value: 'mf', message: <FormattedMessage {...messages.mf} /> },
];

export const WIDTH = (key, column, onlyStudentAnswers = false) =>
  ({
    results: {
      action: {
        xs: '14%',
        sm: '10%',
        md: '7%',
      },
      first_name: {
        xs: '21%',
        sm: '23%',
        md: '24%',
      },
      last_name: {
        xs: '21%',
        sm: '23%',
        md: '23%',
      },
      email: {
        xs: '21%',
        sm: '23%',
        md: '24%',
      },
      total: {
        xs: '23%',
        sm: '21%',
        md: '22%',
      },
    },
    answers: {
      number: {
        pdf: '3.7%',
        table: '3.7%',
      },
      student_answer: {
        pdf: onlyStudentAnswers ? '28.8%' : '23.2%',
        table: '26.7%',
        online_assessment_pdf: onlyStudentAnswers ? '87.8%' : '43.9%',
        online_assessment_table: '42.9%',
      },
      answer: {
        pdf: onlyStudentAnswers ? '0%' : '23.2%',
        table: '18.7%',
        online_assessment_pdf: onlyStudentAnswers ? '0%' : '43.9%',
        online_assessment_table: '42.9%',
      },
      student_image: {
        pdf: onlyStudentAnswers ? '59%' : '41.4%',
        table: '40.4%',
      },
      mark: {
        pdf: '8.5%',
        table: '10.5%',
      },
    },
    student_paper_results: {
      number: '5%',
      student_answer: onlyStudentAnswers ? '30%' : '20%',
      answer: onlyStudentAnswers ? '0%' : '20%',
      mark: '12%',
      student_image: onlyStudentAnswers ? '53%' : '43%',
    },
    student_results: {
      number: onlyStudentAnswers ? '9%' : '5%',
      student_answer: onlyStudentAnswers ? '68%' : '41%',
      answer: onlyStudentAnswers ? '0%' : '41%',
      mark: onlyStudentAnswers ? '23%' : '13%',
    },
  }[key][column]);

export const checkOnlyStudentAnswersInResults = results => results && results.type === 'mark_plus_student_answers';
