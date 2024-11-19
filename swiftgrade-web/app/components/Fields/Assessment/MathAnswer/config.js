import { onMathFocus, updateScrollPosition } from 'utils/helpers/assessments/mathEventsHelper';
import _ from 'lodash';

export const initMathAnswerMathquill = props => {
  const { fieldForFocus, kind, index, input, mathField, type, setFormValue, setStateData } = props;
  const value = input.value.get('value');

  if (value) {
    mathField.write(value);
  }
  if (index !== null) {
    setStateData({ mathField });
  } else {
    setStateData({ mathField, isFocus: true });
  }

  if (fieldForFocus === input.name && index !== null) {
    onMathFocus(fieldForFocus, kind, mathField, type);
  }
  if (mathField && index === null) {
    setFormValue('field_for_focus', input.name);
    onMathFocus(fieldForFocus, kind, mathField, type);
  }
  if (input.name === `answers.${kind}[0].body`) {
    setTimeout(() => updateScrollPosition(input.name, kind), 100);
  }
};

export const updateMathAnswerMathquill = (prevInput, input, mathField, setStateData) => {
  const prevValue = prevInput.value.get('value');
  const value = input.value.get('value');

  if (prevValue !== value && value !== mathField.latex()) {
    const v = _.isEmpty(value) ? '' : value;
    mathField.latex(v);
    setStateData({ mathField });
  }
};
