import _ from 'lodash';
import { getSelectionValue, getUnitsLen, isValidUnitsSymbol } from './index';

export const addValueFromCalculator = props => {
  const { calculator, input, mathField, selectedData, setCalculator, setState } = props;
  if (selectedData.length > 0) {
    const currentValue = input.value.replace(/ /g, '');
    const selectedValue = selectedData.replace(/ /g, '');
    const newValue = currentValue.replace(selectedValue, calculator.expression);
    input.onChange(newValue);

    setState({ selectedData: '' });
  } else {
    mathField.focus().write(calculator.expression);
  }

  if (calculator.move === 'left') {
    mathField.focus().keystroke('Left');
  }
  setCalculator({ key: 'unit', len: 0, move: null, name: input.name, expression: null });
};

export const onReceiveProps = props => {
  const { calculator, input, mathField, prevCalculator, selectedData, isMobile } = props;
  if (mathField) {
    const count = getUnitsLen(mathField.latex());
    if (
      prevCalculator &&
      calculator &&
      calculator.name === input.name &&
      prevCalculator.expression !== calculator.expression &&
      !_.isEmpty(calculator.expression)
    ) {
      const maxLen = isMobile ? 7 : 5;
      if (count + calculator.len - selectedData.length <= maxLen) {
        addValueFromCalculator(props);
      } else {
        mathField.focus();
      }
    }
  }
};

export const onUnitFieldBlur = props => {
  const { details, isFocus, setCalculator, setFormValue, setState } = props;

  const isCalculator = details.get('is_calculator');
  const selectedData = getSelectionValue();
  if (isCalculator && selectedData.length > 0) {
    setState({ selectedData });
  }

  if (!isCalculator && isFocus) {
    setCalculator(null);
    setFormValue('field_for_focus', null);
    setState({ isFocus: false });
  }
};

export const onUnitFieldChange = (input, mathField) => {
  const newValue = mathField.latex();

  if (!_.isEqual(newValue, input.value)) {
    input.onChange(newValue);
  }
};

export const onUnitFieldFocus = (currentCalculator, input, setCalculator, setState) => {
  if (_.isEmpty(currentCalculator) || (_.has(currentCalculator, 'name') && currentCalculator.name !== input.name)) {
    const calculator = { key: 'unit', len: 0, name: input.name, expression: null };
    setCalculator(calculator);
  }
  setState({ isFocus: true });
};

export const onUnitFieldKeyDown = (e, mathField, setPrevInputTabElement) => {
  const count = getUnitsLen(mathField.latex());
  const selectedValue = getSelectionValue();
  const { key: currentKey } = e;

  if (count < 5 && currentKey === '/') {
    mathField.focus().write('/');
    e.preventDefault();
    return false;
  }

  if (
    (count - selectedValue.length >= 5 || !isValidUnitsSymbol(currentKey)) &&
    !(e.ctrlKey || e.metaKey) &&
    currentKey !== 'Tab'
  ) {
    e.preventDefault();
    return false;
  }
  if (currentKey === 'Tab') {
    setPrevInputTabElement(e.currentTarget.id);
  }
};

export const onUnitFieldPaste = (e, mathField) => {
  const pastedValue = e.clipboardData.getData('text');

  const valueLen = getUnitsLen(mathField.latex());
  const pastedValueLen = getUnitsLen(pastedValue);

  const selectedValue = getSelectionValue();

  let isValid = true;
  for (let i = 0; i < pastedValue.length; i += 1) {
    if (!isValidUnitsSymbol(pastedValue[i])) {
      isValid = false;
      break;
    }
  }

  if (valueLen + pastedValueLen - selectedValue.length > 5 || !isValid) {
    e.preventDefault();
    return false;
  }
};
