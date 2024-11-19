import _ from 'lodash';
import { isNumber } from '../common';
import { NON_DECIMAL_SYMBOLS, SPECIAL_MATH_FORMULA_SYMBOLS } from './constants';

const formatNDValues = (value, prevValue) => {
  [
    /\\pi /g,
    /\\sqrt/g,
    /\\frac/g,
    /\\left/g,
    /\\right/g,
    /\\cdot /g,
    /\\cdot/g,
    /\^/g,
    /\{ }/g,
    /{/g,
    /}/g,
    /\\/g,
    /_/g,
    /\[/g,
    /]/g,
  ].map(key => {
    value = value.replace(key, '');
    prevValue = prevValue.replace(key, '');
    return key;
  });

  return { value, prevValue };
};

const isValidNumericAnswer = value => (_.isEmpty(value) || isNumber(value)) && value.length <= 20;

const isValidNonDecimalAnswer = (value, prevValue) => {
  const data = formatNDValues(value, prevValue);
  const invalidValues = { value: [], prevValue: [] };

  Object.keys(data).map(k => {
    data[k].split('').map(symbol => {
      if (!NON_DECIMAL_SYMBOLS.includes(symbol)) {
        invalidValues[k].push(symbol);
      }
      return symbol;
    });
    return k;
  });
  return _.isEmpty(_.difference(invalidValues.value, invalidValues.prevValue));
};

const isValidMathAnswer = (kind, value, prevValue = '') => {
  const data = formatNDValues(value, prevValue);
  const invalidValues = { value: [], prevValue: [] };
  Object.keys(data).map(k => {
    const answer = data[k];
    if (SPECIAL_MATH_FORMULA_SYMBOLS.includes(answer) && kind !== 'mf') {
      invalidValues[k].push(answer);
      return k;
    }
    answer.split('').map(symbol => {
      if (
        symbol !== ' ' &&
        ((kind === 'numeric' && !NON_DECIMAL_SYMBOLS.includes(symbol)) ||
          (kind === 'mf' && !isValidMathFormulaSymbol(symbol)))
      ) {
        invalidValues[k].push(symbol);
      }
      return symbol;
    });
    return k;
  });
  return _.isEmpty(_.difference(invalidValues.value, invalidValues.prevValue));
};

const isValidNonDecimalSymbol = symbol => NON_DECIMAL_SYMBOLS.includes(symbol);

const isValidUnitsSymbol = str => !_.isNull(str.match(/^[A-Za-z0-9$%^]+$/));

const isValidScientificNotationSymbol = str => !_.isNull(str.match(/^[-0-9]+$/));

const isValidFIBSymbol = str => !_.isNull(str.match(/^[A-Za-z0-9(),. ']+$/));

const isValidIntegerSymbol = str => !_.isNull(str.match(/^\d+$/));

const isValidMathFormulaSymbol = symbol =>
  !_.isNull(symbol.match(/^([A-Za-z0-9^.+\-/*!()=<>_|,:$%'{}#"ℚℕℤℝℂ⊅⊄∪∩⊆⊇Ø⊂⊃∈∉∴∃]|\[|\])+$/));

export {
  isValidFIBSymbol,
  isValidIntegerSymbol,
  isValidMathAnswer,
  isValidMathFormulaSymbol,
  isValidNonDecimalAnswer,
  isValidNonDecimalSymbol,
  isValidNumericAnswer,
  isValidScientificNotationSymbol,
  isValidUnitsSymbol,
};
