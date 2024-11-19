import _ from 'lodash';
import {
  getAnswerName,
  getAssessmentErrors,
  getDataForAddingRow,
  getDataForAddingRows,
  getNDAnswerLen,
  getNDAnswerSize,
  getAnswerItem,
  getMarksCount,
  getSelectionValue,
  getToleranceData,
  getUnitsLen,
} from './getter';
import { getDesmos } from './desmos';
import { getInitValuesAssessmentForm } from './initialization';
import { setAnswerAfterKindChanges, setAnswerAndMarksAfterSettingChanges } from './setter';
import {
  isValidMathAnswer,
  isValidMathFormulaSymbol,
  isValidNonDecimalAnswer,
  isValidNonDecimalSymbol,
  isValidNumericAnswer,
  isValidUnitsSymbol,
} from './validation';

const formatAssessmentsItems = assessmentItems => {
  const data = [];

  assessmentItems.map((item, index) => {
    const { answers, kind, setting } = item;

    answers[kind].map((answer, number) => {
      if (_.has(answer, 'body') && _.has(answer.body, 'answer')) {
        const ans = formatAnswer(answer.body.answer);
        _.set(answer.body, 'answer', parseFloat(ans));
        if (kind === 'numeric') {
          _.set(answer, 'tolerance_data', getToleranceData(ans));
        }
      }
      const sn =
        setting[kind].includes('scientific_notation') && _.isNumber(answer.scientific_notation)
          ? answer.scientific_notation
          : null;
      _.set(answer, 'scientific_notation', sn);

      const sf =
        setting[kind].includes('significant_figure') && _.isNumber(answer.significant_figure)
          ? answer.significant_figure
          : null;
      _.set(answer, 'significant_figure', sf);
      _.set(answer, 'marks', answer.marks.filter(j => j.kind === 'answer' || setting[kind].includes(j.kind)));
      _.set(answer, 'number', number + 1);
      return answer;
    });

    const itemData = {
      answers: answers[kind],
      kind,
      number: index + 1,
      setting: setting[kind],
    };
    data.push(itemData);
    return item;
  });
  return data;
};

const formatAnswer = answer => {
  if (_.isNumber(answer)) {
    const stringAnswer = answer > 0 ? answer.toString() : answer.toString().replace('-', '');

    if (_.isNaN(answer) || [Infinity, -Infinity].includes(answer)) {
      return undefined;
    }
    if (stringAnswer.includes('e')) {
      const decimalPart = parseFloat(stringAnswer.slice(0, stringAnswer.indexOf('e'))).toFixed(2);
      const degree = stringAnswer.split(answer > 1 ? '+' : '-')[1];
      return parseFloat(decimalPart)
        .toString()
        .concat(`e${answer > 1 ? '' : '-'}${degree}`);
    }
    if (!_.isInteger(answer) && answer > -0.001 && answer < 0.001) {
      const nonZeroIndex = stringAnswer
        .slice(2)
        .split('')
        .findIndex(symbol => symbol !== '0');
      const decimalPart = parseFloat((answer * 10 ** (nonZeroIndex + 1)).toFixed(2));
      return decimalPart.toString().concat(`e-${nonZeroIndex + 1}`);
    }
    if (!_.isInteger(answer) && answer < 100000 && answer > 1) {
      return answer.toFixed(2);
    }
    if (stringAnswer.length > 5 && answer > 1) {
      const degree = _.isInteger(answer) ? stringAnswer.length : stringAnswer.split('.')[0].length;
      const decimalPart = parseFloat((answer / 10 ** (degree - 1)).toFixed(2));
      return decimalPart.toString().concat(`e${degree - 1}`);
    }
    if (!_.isInteger(answer) && stringAnswer.length > 10) {
      return answer.toFixed(answer > 0.01 || answer < -0.01 ? 2 : 10);
    }
    return answer;
  }
  return answer;
};

const isAssessmentItemsChange = (currentProps, prevProps) => {
  const { assessmentItems, heights } = currentProps;
  const { assessmentItems: prevAssessmentItems, heights: prevHeights } = prevProps;

  const assessmentItemsLen = assessmentItems && assessmentItems.size ? assessmentItems.size : 0;
  const prevAssessmentItemsLen = prevAssessmentItems && prevAssessmentItems.size ? prevAssessmentItems.size : 0;

  const isAddFirstRow = assessmentItemsLen === 1 && prevAssessmentItemsLen === 0;
  const isItemsChange =
    !isAddFirstRow && (!_.isEqual(assessmentItems, prevAssessmentItems) || !_.isEqual(heights, prevHeights));
  return { isItemsChange, key: assessmentItemsLen < prevAssessmentItems ? 'delete' : 'add' };
};

const isAssessmentPasswordExist = assessment =>
  assessment && _.has(assessment, 'settings') && assessment.settings.is_password_entered;

const checkIsEmptyAnswerValue = answer => _.isNull(answer) || (_.isString(answer) && answer.trim().length === 0);

const checkIsShowProgressMarker = (assessmentItem, kind, setting) => {
  const body = assessmentItem.get('body');
  if (kind === 'fib') {
    return !checkIsEmptyAnswerValue(body);
  }
  if (['mf', 'numeric'].includes(kind)) {
    const answer = body.get('answer');
    const unit = body.get('unit');
    const isEmptyAnswer = checkIsEmptyAnswerValue(answer);
    return setting.includes('unit') ? !(isEmptyAnswer || checkIsEmptyAnswerValue(unit)) : !isEmptyAnswer;
  }
  return !(_.isNull(body) || _.isEmpty(body));
};

export {
  checkIsEmptyAnswerValue,
  checkIsShowProgressMarker,
  formatAnswer,
  formatAssessmentsItems,
  getAnswerItem,
  getAnswerName,
  getAssessmentErrors,
  getDataForAddingRow,
  getDataForAddingRows,
  getDesmos,
  getInitValuesAssessmentForm,
  getMarksCount,
  getNDAnswerLen,
  getNDAnswerSize,
  getSelectionValue,
  getUnitsLen,
  isAssessmentItemsChange,
  isAssessmentPasswordExist,
  isValidMathAnswer,
  isValidMathFormulaSymbol,
  isValidNonDecimalAnswer,
  isValidNonDecimalSymbol,
  isValidNumericAnswer,
  isValidUnitsSymbol,
  setAnswerAfterKindChanges,
  setAnswerAndMarksAfterSettingChanges,
};
