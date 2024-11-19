/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import { Map } from 'immutable';
import { EXPRESSIONS_REGEXES } from 'components/Fields/Assessment/MathAnswer/constants';
import { getNDAnswerLen, getNDAnswerSize, getSelectionValue, isValidMathAnswer } from './index';
import { calculationSigFig } from './calculation';

const addValueFromCalculator = (valuesData, funcsData) => {
  const { calculator, input, kind, mathField, name, value, selectedData, type } = valuesData;
  const {
    getNextInputName,
    setCalculator,
    setInputValue,
    setState,
    setFormValue,
    setCurrentInputTabElement,
    setPrevInputTabElement,
  } = funcsData;
  const isMove = ['move_left', 'move_right'].includes(calculator.expression);
  if (calculator.expression === 'backspace' || isMove) {
    if (calculator.expression === 'backspace') {
      mathField.focus().keystroke('Backspace');
    } else if (calculator.expression === 'move_left') {
      mathField.focus().keystroke('Left');
    } else {
      mathField.focus().keystroke('Right');
    }
  } else if (calculator.expression === 'tab') {
    setState({ isVKTab: true });
    setPrevInputTabElement(name);
    const nextInputName = getNextInputName();
    setFormValue('field_for_focus', nextInputName);
    setCurrentInputTabElement(nextInputName);
  } else if (calculator.type === 'fraction') {
    mathField.latex(`${calculator.expression.slice(0, 6)}${value}${calculator.expression.slice(6)}`);
    mathField.focus().keystroke('Left');
  } else {
    if (selectedData.length > 0) {
      replaceSelectedValue(mathField, calculator.expression, value, selectedData, setState);
    } else if (calculator.expression === 'enter' && type !== 'fill_assessment') {
      setInputValue(input);
      onEnterClick(valuesData, funcsData);
    } else {
      const isValidAnswer = isValidMathAnswer(calculator.kind, calculator.expression, value);
      if (isValidAnswer && calculator.type !== 'switcher' && calculator.expression !== 'enter') {
        mathField.focus().write(calculator.expression);
      }
    }

    if (calculator.move === 'backspace_left') {
      mathField.focus().keystroke('Backspace');
    }

    if (calculator.move === 'left') {
      mathField.focus().keystroke('Left');
    }
    if (calculator.move === 'up') {
      mathField.focus().keystroke('Left');
      mathField.focus().keystroke('Left');
    }
  }
  setCalculator({ key: 'non-decimal', len: 0, move: null, name, expression: null, kind, layout: calculator.layout });
  mathField.focus();
};

export const onEnterClick = (valuesData, funcsData) => {
  const { disabled, index, kind, mathField } = valuesData;
  const { addRow, onBlur, setFormValue } = funcsData;
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
};

export const onNumericAnswerFieldPaste = (e, input, mathField, onChangeValue, setState, sigFigsOn = null) => {
  const pastedValue = e.clipboardData.getData('text');
  const processedValue = processExpressionInsert(mathField, pastedValue);

  const valueLen = getNDAnswerLen(mathField.latex());
  const pastedValueLen = getNDAnswerLen(processedValue);

  const selectedValue = getSelectionValue();

  if (valueLen + pastedValueLen - selectedValue.length > 30) {
    e.preventDefault();
    return false;
  }

  if (!_.isEqual(pastedValue, processedValue)) {
    mathField.focus().write(processedValue);

    const size = getNDAnswerSize(input.name);
    onChangeValue(input, mathField, mathField.latex(), size);

    if (sigFigsOn) {
      const significantFigureValue = calculationSigFig(mathField.latex());
      setState({ sfValue: significantFigureValue });
    }

    e.preventDefault();
    return false;
  }
};

const processExpressionInsert = (mathField, newValue) => {
  let processedNewValue = newValue;

  EXPRESSIONS_REGEXES.forEach(item => {
    processedNewValue = processedNewValue.replace(item.regex, item.replace_pattern);
  });

  return processedNewValue;
};

const replaceSelectedValue = (mathField, newValue, prevValue, selectedData, setState) => {
  const currentValue = prevValue.replace(/ /g, '');
  const selectedValue = selectedData.replace(/ /g, '');
  mathField.latex(currentValue.replace(selectedValue, newValue));

  setState({ selectedData: '', mathField });
};

export const onReceiveProps = (valuesData, funcsData) => {
  const {
    calculator,
    fieldForFocus,
    kind,
    mathField,
    name,
    prevCalculator,
    prevFieldForFocus,
    selectedData,
    type,
  } = valuesData;
  const { onFocus, openCalculator } = funcsData;
  if (prevFieldForFocus !== fieldForFocus && fieldForFocus === name && mathField !== null) {
    if (type === 'process_assessment') {
      onFocus(fieldForFocus, kind, mathField);
    } else {
      onFocus(fieldForFocus, mathField);
    }

    if (_.isNull(calculator)) {
      openCalculator();
    }
  }

  const count = _.isNull(mathField) ? 0 : getNDAnswerLen(mathField.latex());
  const isSwitcherKey = _.has(calculator, 'type') && calculator.type === 'switcher';
  if (
    prevCalculator &&
    calculator &&
    calculator.name === name &&
    ((prevCalculator.expression !== calculator.expression && !_.isEmpty(calculator.expression)) || isSwitcherKey)
  ) {
    if (count + calculator.len - selectedData.length <= 30 && !isSwitcherKey) {
      addValueFromCalculator(valuesData, funcsData);
    } else {
      mathField.focus();
    }
  }
};

export const setCalculatorValue = props => {
  const {
    currentCalculator,
    fieldForFocus,
    kind,
    name,
    virtualKeyboardLayout,
    setCalculator,
    setFormValue,
    setState,
  } = props;
  if (_.isEmpty(currentCalculator) || (_.has(currentCalculator, 'name') && currentCalculator.name !== name)) {
    const calculator = { key: 'non-decimal', len: 0, name, expression: null, kind };
    if (kind === 'mf') {
      calculator.layout = virtualKeyboardLayout;
    }
    setCalculator(calculator);
  }

  if (fieldForFocus !== name) {
    setFormValue('field_for_focus', name);
  }

  setState({ isFocus: true });
};

export const getMathValue = ({ analysis, input, inputValue, latex }) => {
  const answer = !_.isEmpty(latex) && _.has(analysis.answer, 'evaluation') ? analysis.answer.evaluation.value : null;
  const count = getNDAnswerLen(latex);
  const isError = _.isEmpty(latex) ? false : analysis.answer.isError;
  const size = getNDAnswerSize(input.name);

  return Map({
    actual_height: size.actualHeight,
    answer,
    evaluation_displayed:
      !_.isEmpty(latex) && _.has(analysis.answer, 'evaluationDisplayed') && analysis.answer.evaluationDisplayed,
    fraction_mode: !_.isEmpty(latex) && _.has(analysis.answer, 'fraction_mode') && analysis.answer.fraction_mode,
    height: size.height,
    value: inputValue || latex,
    width: size.height === 1 ? count : size.width,
    valid: !isError && !_.isNaN(answer) && ![Infinity, -Infinity].includes(answer),
  });
};

export const setMathInputValue = ({
  expressionAnalysis: analysis,
  input,
  inputValue,
  mathField,
  sigFigsOn,
  setFormValue,
  setStateData,
}) => {
  const latex = mathField.latex();
  const value = getMathValue({ analysis, input, inputValue, latex });

  input.onChange(value);
  setStateData({ isUpdate: false });

  if (sigFigsOn) {
    const key = input.name.replace('body', 'significant_figure');
    const sigFigsValue = calculationSigFig(latex);

    setFormValue(key, sigFigsValue);
  }
};

export const openMathCalculator = (valuesData, funcsData) => {
  const { setCalculator, setDesmosValue, setFormValue, setState } = funcsData;
  const {
    calculator: currentCalculator,
    expressionAnalysis,
    fieldForFocus,
    input,
    kind,
    virtualKeyboardLayout,
  } = valuesData;
  const { name, value } = input;
  const analysis = expressionAnalysis && expressionAnalysis.answer;
  const answer = analysis && _.has(analysis, 'evaluation') ? analysis.evaluation.value : null;
  const inputValue = value.toJS().value;

  if (value.toJS().answer !== answer || (kind === 'mf' && inputValue && _.isNull(answer))) {
    setDesmosValue(inputValue);
  }

  const data = {
    currentCalculator,
    fieldForFocus,
    kind,
    name,
    virtualKeyboardLayout,
    setCalculator,
    setFormValue,
    setState,
  };
  setCalculatorValue(data);
};

export const getMathAnswerData = (expressionAnalysis, input, isFocus, mathField, isInvalidAnswerFocused = false) => {
  const value = _.isNull(mathField) ? '' : mathField.latex();

  const blurred = mathField && mathField.__controller.blurred;
  if ((!isFocus || blurred) && !isInvalidAnswerFocused) {
    const data = input.value.toJS();
    return {
      answer: data.answer,
      value,
      evaluation_displayed: data.evaluation_displayed,
      fraction_mode: data.fraction_mode,
      is_error: false,
    };
  }

  if (_.isEmpty(value)) {
    return {
      answer: null,
      value,
      evaluation_displayed: false,
      fraction_mode: false,
      is_error: false,
    };
  }

  const analysis = expressionAnalysis && _.has(expressionAnalysis, 'answer') ? expressionAnalysis.answer : null;
  const answer = analysis && _.has(analysis, 'evaluation') ? analysis.evaluation.value : null;
  return {
    answer,
    value,
    evaluation_displayed: analysis && _.has(analysis, 'evaluationDisplayed') && analysis.evaluationDisplayed,
    fraction_mode: analysis && _.has(analysis, 'fraction_mode') && analysis.fraction_mode,
    is_error: analysis && analysis.isError && !_.isEmpty(value),
  };
};
