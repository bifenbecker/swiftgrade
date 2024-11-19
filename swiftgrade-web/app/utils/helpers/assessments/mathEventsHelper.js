/* eslint-disable no-underscore-dangle */
import _ from 'lodash';

import { CALCULATOR_ID } from 'globalConstants';
import { getNDAnswerLen, getNDAnswerSize, getSelectionValue } from './getter';
import { calculationSigFig } from './calculation';
import { isValidMathFormulaSymbol, isValidNonDecimalSymbol } from './validation';

const CALCULATOR_OFFSET_BY_KIND = {
  mf: 23,
  numeric: 15,
};

const updateScrollPosition = (elementName, kind = 'numeric') => {
  const inputElement = document.querySelector(`div[id="${elementName}"]`);
  const calculatorElement = document.querySelector(`div[id="${CALCULATOR_ID}"]`);

  if (inputElement && calculatorElement) {
    const getTopOffset = el => {
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return rect.top + scrollTop;
    };

    const calculatorOffset = getTopOffset(calculatorElement);
    const inputOffset = getTopOffset(inputElement);

    const difference = inputOffset + inputElement.offsetHeight + CALCULATOR_OFFSET_BY_KIND[kind] - calculatorOffset;
    if (difference > 0) {
      window.scrollTo(window.scrollX, window.scrollY + difference);
    }
  }
};

const onMathChange = (input, mathField, onChangeValue, setStateData, sigFigsOn = null) => {
  const newValue = mathField.latex();
  const elementName = input.name;

  if (!_.isEqual(newValue, input.value.get('value'))) {
    const size = getNDAnswerSize(elementName);
    onChangeValue(input, mathField, newValue, size);
  }

  if (sigFigsOn) {
    const significantFigureValue = calculationSigFig(newValue);
    setStateData({ sfValue: significantFigureValue });
  }

  // This cause scroll to bottom even if user wants to change answer on top of screen
  // updateScrollPosition(elementName);
};

const onMathFocus = (fieldForFocus, kind, mathField, type) => {
  const x = window.scrollX;
  const y = window.scrollY;

  mathField.focus();
  mathField.__controller.cursor.show();
  mathField.__controller.cursor.blink();

  if (fieldForFocus) {
    if (type === 'process_assessment') {
      const indexes = fieldForFocus.match(`^assessment_items\\[(\\d+)\\].answers.${kind}\\[(\\d+)\\].body$`);
      const subindex = indexes && indexes[2] && _.isNumber(Number(indexes[2])) ? Number(indexes[2]) : null;

      if ((_.isNumber(subindex) && subindex !== 0) || _.isNull(indexes)) {
        window.scrollTo(x, y);
      }
    } else {
      const indexes = fieldForFocus.match('^assessment_items\\[(\\d+)\\].body');
      if (_.isNull(indexes)) {
        window.scrollTo(x, y);
      }
    }
  }
};

const onMathPaperKeyDown = (e, kind, input, mathField, setPrevInputTabElement, setInputValue, setStateData) => {
  if (e.key === 'Enter') {
    setInputValue(input);
  }
  onMathAnswerFieldKeyDown(e, kind, input, mathField, setPrevInputTabElement, setStateData);
};

const onMathKeyUp = (valuesData, funcsData) => {
  const { e, index, disabled, kind, mathField } = valuesData;
  const { addRow, onBlur, setCurrentInputTabElement, setFormValue, setStateData } = funcsData;
  if (e.key === 'Tab') {
    setCurrentInputTabElement(e.currentTarget.id);
    setStateData({ isTab: true });
  } else if (e.key === 'Enter') {
    if (!disabled) {
      addRow(index);

      if (!_.isNull(index)) {
        onBlur();
        setFormValue('field_for_focus', `assessment_items[${index + 1}].answers.${kind}[0].body`);
      } else {
        setFormValue('field_for_focus', `answers.${kind}[0].body`);
      }
    } else {
      onBlur();
      mathField.__controller.cursor.hide();
    }
  }
};

const onMouseUp = setState => {
  const selectedData = getSelectionValue();
  setState({ selectedData });
};

const onMathAnswerFieldKeyDown = (e, kind, input, mathField, setPrevInputTabElement, setState) => {
  const count = getNDAnswerLen(mathField.latex());
  const size = getNDAnswerSize(input.name);
  const isValidSymbol = kind === 'numeric' ? isValidNonDecimalSymbol : isValidMathFormulaSymbol;

  const isNotValid = e.key !== 'Tab' && !(e.ctrlKey || e.metaKey) && !isValidSymbol(e.key);
  const selectedData = getSelectionValue();
  const selectedDataCount = getNDAnswerLen(selectedData);

  if (e.key === 'Tab') {
    setPrevInputTabElement(e.currentTarget.id);
  }

  setState({ selectedData: '' });

  if (
    isNotValid ||
    (count - selectedDataCount >= 30 && e.key !== 'Tab' && !(e.ctrlKey || e.metaKey)) ||
    (e.key === '/' && size.actualHeight > 112)
  ) {
    e.preventDefault();
    return false;
  }
};

const updateStateOnBlur = props => {
  const {
    calculator,
    details,
    fieldForFocus,
    input,
    isFocus,
    isVKTab,
    setCalculator,
    setFormValue,
    setState,
    setAssessmentDetails,
  } = props;
  const isCalculator = details.get('is_calculator');
  let newState = {};
  if (calculator && calculator.layout) {
    newState = { virtualKeyboardLayout: document.hasFocus() ? null : calculator.layout };
  }
  if (!isCalculator && isFocus) {
    if (_.isNull(fieldForFocus) || fieldForFocus === input.name) {
      setCalculator(null);
    }
    setFormValue('field_for_focus', null);
    setState({ isFocus: false });
  }

  const selectedData = getSelectionValue();
  if (!isCalculator) {
    newState.isFocus = false;
    setState(newState);
    input.onBlur();
  } else if (selectedData.length > 0) {
    setState({ selectedData });
  } else if (isCalculator && isVKTab) {
    setState({ isFocus: false, isVKTab: false });
    setCalculator(null);
    if (fieldForFocus !== input.name && fieldForFocus.includes('unit')) {
      const assessmentDetails = details.set('is_calculator', false);
      setAssessmentDetails(assessmentDetails);
      input.onBlur();
    }
  }
};

export {
  onMathChange,
  onMathFocus,
  onMathPaperKeyDown,
  onMathKeyUp,
  onMouseUp,
  onMathAnswerFieldKeyDown,
  updateScrollPosition,
  updateStateOnBlur,
};
