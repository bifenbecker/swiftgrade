import { PAPER_SHEET } from 'globalConstants';

function getMaxWidthTable(onlyStudentAnswers, type) {
  if (type === PAPER_SHEET) {
    return onlyStudentAnswers ? '70%' : '90%';
  }
  return onlyStudentAnswers ? '600px' : '1000px';
}

export const TABLE_STYLE = (onlyStudentAnswers, type) => ({
  maxWidth: getMaxWidthTable(onlyStudentAnswers, type),
  margin: 'auto',
  marginTop: 50,
});
