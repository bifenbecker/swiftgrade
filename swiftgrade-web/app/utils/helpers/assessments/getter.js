import _ from 'lodash';
import React from 'react';
import { List, Map } from 'immutable';
import { Decimal } from 'decimal.js';
import { ANSWERS, COEFFFICIENT, TOLERANCE_OPTIONS, SETTING } from './constants';
import { calculationTolerance } from './calculation';

const HEIGHT_LIMITS = [32, 46, 59, 71, Infinity];

const formatAnswer = answer => {
  if (_.isNumber(answer)) {
    if (_.isNaN(answer)) {
      return undefined;
    }
    if (!_.isInteger(answer) && String(answer).length > 10) {
      return parseFloat(answer.toFixed(10));
    }
    return answer;
  }
  return answer;
};

const getAssessmentErrors = data => {
  const errors = [];

  if (_.has(data, 'name')) {
    return { name: data.name };
  }

  if (_.has(data, 'assessment_items') && _.isArray(data.assessment_items)) {
    data.assessment_items.map(item => {
      if (_.isPlainObject(item) && _.has(item, 'answers')) {
        if (item.answers.length > 1) {
          const firstError = item.answers.find(element => element !== 'None');
          errors.push({ answer: firstError.body });
        } else {
          errors.push({ answer: item.answers[0].body });
        }
      } else if (_.isPlainObject(item) && _.has(item, 'compare_by_characters')) {
        errors.push({ compare_by_characters: item.compare_by_characters });
      }

      return item;
    });
  }

  return errors && errors[0] ? errors[0] : null;
};

const getDataForAddingRow = (assessmentItems, index, props) => {
  const { answers, kind, setting } = props;

  let item = { answers, setting, kind };
  let data = null;

  if (!_.isNull(index)) {
    item = assessmentItems.get(index);

    let itemAnswers = ANSWERS;
    let itemSetting = SETTING;

    item = item.toJS();
    const itemMarks = List(
      item.answers[item.kind][0].marks.map(element =>
        Map(Object.entries({ kind: element.kind, value: element.value })),
      ),
    );

    itemSetting = itemAnswers.set(item.kind, List(item.setting[item.kind]));
    if (item.kind === 'mf') {
      const { unit } = item.answers.mf[0];
      const mfItemAnswers = itemAnswers.get('mf').update(0, i => i.set('unit', unit));
      itemAnswers = itemAnswers.set('mf', mfItemAnswers);
    } else if (item.kind === 'numeric') {
      const { scientific_notation: sn, unit, tolerance } = item.answers.numeric[0];
      const numericItemAnswers = itemAnswers.get('numeric').update(0, i =>
        i
          .set('scientific_notation', sn)
          .set('tolerance', tolerance)
          .set('unit', unit),
      );
      itemAnswers = itemAnswers.set('numeric', numericItemAnswers);
    }

    const itemAnswersWithUpdatedMarks = itemAnswers.get(item.kind).update(0, i => i.set('marks', itemMarks));
    itemAnswers = itemAnswers.set(item.kind, itemAnswersWithUpdatedMarks);

    item.answers = itemAnswers;
    item.setting = itemSetting;

    data = assessmentItems.insert(index + 1, Map(item).delete('id'));
  } else {
    let itemAnswers = ANSWERS;
    itemAnswers = itemAnswers.set(item.kind, List(answers.get(kind)));
    item.answers = itemAnswers;
    data = assessmentItems.push(Map(item));
  }
  return data;
};

const getDataForAddingRows = (assessmentItems, multipleRows, props) => {
  const { answers, kind, marks, setting } = props;

  const item = { answers, marks, setting, kind };
  let data = assessmentItems;

  multipleRows.map(i => {
    data = data.push(Map(item));
    return i;
  });
  return data;
};

const getNDAnswerLen = value => {
  let inputValue = value;
  let len = 0;

  [/sqrt/g, /\\frac/g, /\\left\(/g, /\\right\)/g, /\\cdot /g, /\\cdot/g, /\\operatorname/g].map(key => {
    len += (inputValue.match(key) || []).length;
    inputValue = inputValue.replace(key, '');
    return key;
  });
  [/\^/g, /\{ }/g, /{/g, /}/g, /\\/g, /\[ ]/g, /\[/g, /\]/g, /\s/g].map(key => {
    inputValue = inputValue.replace(key, '');
    return key;
  });
  len += inputValue.length;
  return len;
};

const getNDAnswerHeight = actualHeight => {
  const height = actualHeight - 20;
  return HEIGHT_LIMITS.findIndex(heightLimit => height <= heightLimit) + 1;
};

const getWidth = item => {
  const style = window.getComputedStyle(item);
  const paddingLeft = parseFloat(style.paddingLeft.split('px')[0]);
  const paddingRight = parseFloat(style.paddingRight.split('px')[0]);

  let width = parseFloat(style.width.split('px')[0]);
  width = _.isNaN(width) ? item.getBoundingClientRect().width : width;

  return width - paddingLeft - paddingRight;
};

const getNDAnswerSize = id => {
  const calculator = document.getElementById(id);
  const fields = calculator.getElementsByClassName('mq-root-block');

  let actualHeight = 0;
  let height = 0;
  let width = 0;

  if (fields && fields[0]) {
    const style = fields[0].getBoundingClientRect();

    Array.from(fields[0].children).map(item => {
      let subwidth = 0;

      if (item.classList.contains('mq-fraction')) {
        const numWidth = getWidth(item.children[0]);
        const denWidth = getWidth(item.children[1]);
        subwidth = numWidth > denWidth ? numWidth : denWidth;
      } else {
        subwidth = getWidth(item);
      }
      width += subwidth;
      return item;
    });
    actualHeight = style.height < 31 ? 31.5 : style.height;
    height = getNDAnswerHeight(style.height);
    width = Math.round(width / COEFFFICIENT[height]);
  }
  return { width, height, actualHeight };
};

const getAnswerName = (kind, item) => {
  if (kind === 'mc' || kind === 'fib') {
    return `${item}.body.value`;
  }
  return `${item}.body`;
};

const getAnswerItem = (answers, kind, key) =>
  answers
    .get(kind)
    .get(0)
    .get('body')
    .get(key);

const getUnitsLen = value => {
  let inputValue = value;
  let len = 0;

  [/mu/g, /Omega/g].map(key => {
    len += inputValue.match(key) ? inputValue.match(key).length : 0;
    inputValue = inputValue.replace(key, '');
    return key;
  });

  [/\^/g, /\{ }/g, /{/g, /}/g].map(key => {
    inputValue = inputValue.replace(key, '');
    return key;
  });
  inputValue = inputValue.replace(/\\/g, '');

  len += inputValue.length;
  return len;
};

const getCountOfNumbersForTolerance = value => {
  if (_.isInteger(value)) {
    return value > 9.99 ? 1 : 2;
  }

  const numbers = value
    .toFixed(100)
    .split('.')[1]
    .split('')
    .map(Number);

  let i = null;
  numbers.map((n, index) => {
    if (_.isNull(i) && n !== 0) {
      i = index;
    }
    return n;
  });

  if (value > 9.99) {
    return i > 1 ? i : 1;
  }
  return i > 2 ? i : 2;
};

const getToleranceData = answer => {
  const data = {};

  if (_.isNumber(answer) && !_.isNaN(answer) && answer !== 0) {
    const values = [];

    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25].map(k => {
      const start = ((100 - k) / 100) * answer;
      const end = ((100 + k) / 100) * answer;
      const i = getCountOfNumbersForTolerance(start);
      const j = getCountOfNumbersForTolerance(end);
      const result = calculationTolerance(start, end, i, j, values, answer);

      values.push(result.start);
      values.push(result.end);

      data[k] = result;
      return k;
    });
  }
  return data;
};

const getToleranceOptions = (data, isSN) => {
  const answer = formatAnswer(data.body.answer);

  if (_.isNumber(answer) && !_.isNaN(answer) && answer !== 0 && Number.isFinite(answer)) {
    const values = [];

    TOLERANCE_OPTIONS.map(option => {
      if (option.value !== 0) {
        const start = ((100 - option.value) / 100) * answer;
        const end = ((100 + option.value) / 100) * answer;
        const i = getCountOfNumbersForTolerance(start);
        const j = getCountOfNumbersForTolerance(end);

        const result = calculationTolerance(start, end, i, j, values, answer);
        values.push(result.start);
        values.push(result.end);
        const startValue = parseFloat(result.start);
        const endValue = parseFloat(result.end);
        const isStandardOrder = startValue < endValue;

        let label = isStandardOrder
          ? `${option.value}% (${Decimal(result.start).toPrecision()} – ${Decimal(result.end).toPrecision()})`
          : `${option.value}% (${Decimal(result.end).toPrecision()} – ${Decimal(result.start).toPrecision()})`;
        if (isSN && data.scientific_notation !== 0) {
          label = (
            <React.Fragment>
              {isStandardOrder ? (
                <span>
                  {`${option.value}% (${Decimal(result.start).toPrecision()} – ${Decimal(result.end).toPrecision()})`}
                </span>
              ) : (
                <span>
                  {`${option.value}% (${Decimal(result.end).toPrecision()} – ${Decimal(result.start).toPrecision()})`}
                </span>
              )}
              <span style={{ color: '#d4d5d4', paddingLeft: 2 }}>
                X10<sup>{data.scientific_notation}</sup>
              </span>
            </React.Fragment>
          );
        }
        _.set(option, 'label', label);
      }
      return option;
    });
  } else {
    TOLERANCE_OPTIONS.map(option => {
      _.set(option, 'label', `${option.value}%`);
      return option;
    });
  }
  return TOLERANCE_OPTIONS;
};

const getSelectionValue = () => {
  let selectedData = '';
  if (window.getSelection) {
    selectedData = window.getSelection().toString();
  } else {
    selectedData = document.selection.createRange().text;
  }
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    const field = document.activeElement;
    const startPosition = field.selectionStart;
    const endPosition = field.selectionEnd;
    const fieldValue = field.value;
    selectedData = fieldValue ? fieldValue.substring(startPosition, endPosition) : '';
  }
  return selectedData;
};

const isEmptyAnswerValue = value => _.isNil(value) || value.trim().length === 0;

const checkIfAnswerEmpty = (answer, kind, setting) => {
  if (['mf', 'numeric'].includes(kind)) {
    return setting.includes('unit')
      ? isEmptyAnswerValue(answer.unit) || isEmptyAnswerValue(answer.body.value)
      : isEmptyAnswerValue(answer.body.value);
  }
  if (kind === 'fib') {
    return _.has(answer.body, 'value') ? isEmptyAnswerValue(answer.body.value) : true;
  }
  return _.isEmpty(answer.body.value);
};

const getMarksCount = assessmentItems => {
  let mark = 0;
  const data = assessmentItems && assessmentItems.toJS ? assessmentItems.toJS() : null;

  if (_.isArray(data)) {
    data.map(i => {
      let amountOfEmptySubAnswers = 0;
      let itemMark = 0;
      let maxSubAnswersMark = 0;
      const setting = i.setting[i.kind];

      i.answers[i.kind].map(j => {
        const isAnswerEmpty = checkIfAnswerEmpty(j, i.kind, setting);
        if (isAnswerEmpty) {
          amountOfEmptySubAnswers += 1;
          return j;
        }

        let subAnswerMark = 0;
        j.marks.map(k => {
          if (k.kind === 'answer' || i.setting[i.kind].includes(k.kind)) {
            if (i.answers[i.kind].length === 1) {
              itemMark += k.value;
            } else {
              subAnswerMark += k.value;
            }
          }
          return k;
        });
        if (maxSubAnswersMark < subAnswerMark) {
          maxSubAnswersMark = subAnswerMark;
        }
        return j;
      });
      mark += itemMark;
      if (i.answers[i.kind].length > 1 && amountOfEmptySubAnswers === 0) {
        mark += maxSubAnswersMark;
      }
      return i;
    });
  }
  return mark;
};

const getMFInputValue = value => {
  const matchedAnswers = value.match(/\w+_{?\w*=?\w*}?\^\w+/g);
  if (matchedAnswers) {
    let newValue = value;
    matchedAnswers.forEach(matchedAnswer => {
      const indexOfMatchedValue = newValue.indexOf(matchedAnswer);
      const firstPartOfValue = newValue.slice(0, indexOfMatchedValue);
      const lastPartOfValue = newValue.slice(indexOfMatchedValue + matchedAnswer.length);
      const expressionParts = matchedAnswer.split('^');
      const updatedAnswer = expressionParts[0].concat(`^{${expressionParts[1][0]}}`, expressionParts[1].slice(1));
      newValue = firstPartOfValue.concat(updatedAnswer, lastPartOfValue);
    });
    return newValue;
  }
  return value;
};

const getNextInputName = (addRowKind, assessmentItems, index, isAddRow, kind, setting, subAnswersLength, subindex) => {
  const items = assessmentItems && assessmentItems.toJS ? assessmentItems.toJS() : null;
  const itemSetting = setting && setting.toJS ? setting.toJS() : null;
  if (isAddRow) {
    if (itemSetting && itemSetting.includes('unit')) {
      return `answers.${kind}[${subindex}].unit`;
    }
    if (subindex !== subAnswersLength - 1) {
      return `answers.${kind}[${subindex + 1}].body`;
    }
    return null;
  }

  if (_.isNull(items)) {
    return null;
  }
  if (itemSetting && itemSetting.includes('unit')) {
    return `assessment_items[${index}].answers.${kind}[${subindex}].unit`;
  }
  if (subindex === subAnswersLength - 1) {
    if (index === items.length - 1) {
      return addRowKind === 'mc' ? null : `answers.${addRowKind}[0].body`;
    }
    return `assessment_items[${index + 1}].answers.${items[index + 1].kind}[0].body`;
  }
  return `assessment_items[${index}].answers.${kind}[${subindex + 1}].body`;
};

const getOnlineNextInputName = (assessmentItems, index, kind, setting) => {
  const items = assessmentItems && assessmentItems.toJS ? assessmentItems.toJS() : null;
  if (_.isNull(items)) {
    return null;
  }
  if (setting && setting.includes('unit')) {
    return `assessment_items[${index}].body.unit`;
  }
  return index === items.length - 1 ? null : `assessment_items[${index + 1}].body.answer`;
};

export {
  getAnswerItem,
  getAnswerName,
  getAssessmentErrors,
  getDataForAddingRow,
  getDataForAddingRows,
  getMarksCount,
  getMFInputValue,
  getNextInputName,
  getNDAnswerLen,
  getNDAnswerSize,
  getOnlineNextInputName,
  getSelectionValue,
  getToleranceData,
  getToleranceOptions,
  getUnitsLen,
};
