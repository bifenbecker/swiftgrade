import _ from 'lodash';
import { List } from 'immutable';

const KEYBOARD_KEYS = ['ArrowLeft', 'ArrowRight', 'Backspace'];

const getVerticalAlign = item => (item.answers[0].height === 1 ? 'center' : 'top');

const getFilters = filters => {
  let data = [];
  if (List.isList(filters)) {
    data = filters.toJS();
  } else if (_.isArray(filters)) {
    data = filters;
  }
  return data;
};

const getStudentName = scanResult => {
  const { first_name: fname, last_name: lname } = scanResult.result;

  let student = null;
  if (fname && lname) {
    student = `${fname} ${lname}`;
  } else if (fname && !lname) {
    student = `${fname}`;
  } else if (!fname && lname) {
    student = `${lname}`;
  }
  return student;
};

const getClassNameForMark = item => {
  if (!_.isObject(item) || isBlankGenericAnswer(item)) {
    return '';
  }
  if (item.mark.student_mark === item.mark.total) {
    return 'correct';
  }
  if (item.mark.student_mark === 0) {
    return 'incorrect';
  }
  return 'partially_correct';
};

const rebuildCollapseScans = (collapseScans, results) => {
  const newCollapseScans = [];

  collapseScans.map(id => {
    if (results.find(r => r.id === id)) {
      newCollapseScans.push(id);
    }
    return id;
  });

  return _.cloneDeep(newCollapseScans);
};

const rebuildExpendedStudentMarks = (expendedStudentMarkState, results) => {
  const newExpendedStudentMarkState = [];

  results.map(result => {
    result.data.map(answer => {
      const id = `${answer.assessment_item_id}_${answer.id}`;

      if (expendedStudentMarkState.includes(id)) {
        newExpendedStudentMarkState.push(id);
      }
      return answer;
    });
    return result;
  });
  return newExpendedStudentMarkState;
};

const onDownloadFile = (blob, filename) => {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

const isMarkValid = (key, mark, target) => {
  if (!key.match(/^\d+\.?\d*$/) && !KEYBOARD_KEYS.includes(key) && key !== '.') {
    return false;
  }

  if (!KEYBOARD_KEYS.includes(key) && mark) {
    const pos = target.selectionStart;
    const newValue = mark.slice(0, pos) + key + mark.slice(pos);
    const pointsAmount = (newValue.match(/\./g) || []).length;

    if (pointsAmount >= 2) {
      return false;
    }
  }
  return true;
};

const isBlankGenericAnswer = item =>
  item &&
  item.kind === 'mc' &&
  _.has(item, 'correct_answer') &&
  _.has(item.correct_answer, 'value') &&
  _.isEmpty(item.correct_answer.value);

const isNeedGrading = answer => answer.kind !== 'mc' && _.has(answer, 'need_grading') && answer.need_grading;

export {
  getClassNameForMark,
  getFilters,
  getVerticalAlign,
  getStudentName,
  isBlankGenericAnswer,
  isMarkValid,
  isNeedGrading,
  onDownloadFile,
  rebuildCollapseScans,
  rebuildExpendedStudentMarks,
};
