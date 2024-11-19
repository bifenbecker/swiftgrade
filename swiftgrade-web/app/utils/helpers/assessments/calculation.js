import _ from 'lodash';

const calculationSigFig = value => {
  if (value === '0' || value.replace('.', '').match(/^0+$/)) {
    return 0;
  }

  const match = value.match(/^(?<number>[+|-]?\d*(\.\d*)?)((\\cdot|\*|\\times|\u007D)(10\^|E)\{?\d+}?)?$/)
  value = match && match.groups && match.groups.number;
  if (value && _.isNumber(Number(value))) {
    const firstSymbol = value && value.length > 0 && value[0];
    const v = ['+', '-'].includes(firstSymbol) ? value.replace(firstSymbol, '') : value;

    let sigFigsNumber = 0;
    let pointFound = false;
    let zerosWithinNumber = 0;

    for (let i = 0; i < v.length; i += 1) {
      if (v[i] === '.') {
        pointFound = true;
        if (zerosWithinNumber > 0) {
          sigFigsNumber += zerosWithinNumber;
          zerosWithinNumber = 0;
        }
      } else if (v[i] !== '0' && v[i] !== '.') {
        sigFigsNumber += 1;
        if (zerosWithinNumber > 0) {
          sigFigsNumber += zerosWithinNumber;
          zerosWithinNumber = 0;
        }
      } else if (v[i] === '0' && pointFound && sigFigsNumber > 0) {
        sigFigsNumber += 1;
      } else if (v[i] === '0' && !pointFound && sigFigsNumber > 0) {
        zerosWithinNumber += 1;
      }
    }
    return sigFigsNumber === 0 ? null : sigFigsNumber;
  }
  return null;
};

const getAmountOfNonZeroDigits = (str, amount) => {
  let newAmount = amount;
  str.split('').forEach(digit => {
    if (digit.match(/^[1-9]$/)) {
      newAmount += 1;
    }
  });
  return newAmount;
};

const roundNumbersWithExponentPart = answer => {
  const exponentPart = answer.includes('e') && answer.substring(answer.indexOf('e'));
  if (exponentPart) {
    const decimalPart = Number(answer.slice(0, answer.indexOf('e'))).toFixed(2);
    return decimalPart + exponentPart;
  }
  return answer;
};

const calculationTolerance = (a, b, i, j, values, answer) => {
  if (i > 100 || j > 100) {
    return {
      start: a.toFixed(100),
      end: b.toFixed(100),
    };
  }
  const updatedA = roundNumbersWithExponentPart(a.toString());
  const updatedB = roundNumbersWithExponentPart(b.toString());

  const start = Number(updatedA).toFixed(i);
  const end = Number(updatedB).toFixed(j);

  let startAmountOfNonZero = 0;
  let endAmountOfNonZero = 0;

  startAmountOfNonZero = getAmountOfNonZeroDigits(start, startAmountOfNonZero);
  endAmountOfNonZero = getAmountOfNonZeroDigits(end, endAmountOfNonZero);

  const isStartRoundedTooMuch =
    (parseFloat(start) >= answer && answer > 0) || (parseFloat(start) <= answer && answer < 0); // for the answers between -1 and 1
  const isEndRoundedTooMuch = (parseFloat(end) <= answer && answer > 0) || (parseFloat(end) >= answer && answer < 0);

  if (start !== end) {
    const nextI =
      values.includes(start) ||
      (i > 2 && start[start.length - 1] === '0' && startAmountOfNonZero === 0) ||
      isStartRoundedTooMuch ||
      (startAmountOfNonZero === 1 && answer < 1 && answer > -1 && start[start.length - 1] !== '0') ||
      (!start.includes('e') && values && values.length > 0 && values[values.length - 2].length > start.length)
        ? i + 1
        : i;
    const nextJ =
      values.includes(end) ||
      (j > 2 && end[end.length - 1] === '0' && endAmountOfNonZero === 0) ||
      isEndRoundedTooMuch ||
      (!end.includes('e') && values && values.length > 0 && values[values.length - 1].length > end.length) ||
      (endAmountOfNonZero === 1 && answer < 1 && answer > -1 && end[end.length - 1] !== '0')
        ? j + 1
        : j;

    if (i === nextI && j === nextJ) {
      return { start, end };
    }
    return calculationTolerance(a, b, nextI, nextJ, values, answer);
  }
  return calculationTolerance(a, b, i + 1, j + 1, values, answer);
};

export { calculationSigFig, calculationTolerance };
