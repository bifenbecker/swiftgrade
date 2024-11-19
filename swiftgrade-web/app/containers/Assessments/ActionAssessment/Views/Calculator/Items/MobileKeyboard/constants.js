import {
  A_SUBSCRIPT_B_OPTION,
  A_SUPERSCRIPT_B_OPTION,
  ABS_OPTION,
  APOSTROPHE_SYMBOL,
  BACKSPACE_OPTION,
  COLON_SYMBOL,
  COMMA_SYMBOL,
  ENTER_OPTION,
  INEQUALITIES_OPTIONS,
  LEFT_BRACKET_OPTION,
  LEFT_CURLY_BRACKET_OPTION,
  LEFT_SQUARE_BRACKET_OPTION,
  LOGARITHM_OPTIONS,
  LOWER_LETTERS_OPTIONS,
  MATH_OPTIONS,
  NUMBERS_OPTION,
  PERCENTAGE_SYMBOL,
  RIGHT_BRACKET_OPTION,
  RIGHT_CURLY_BRACKET_OPTION,
  RIGHT_SQUARE_BRACKET_OPTION,
  SHIFT_OPTION,
  SHIFT_DOWN_OPTION,
  SQRT_N_OPTION,
  SQRT_OPTION,
  TAB_OPTION,
  TRIGONOMETRIC_OPTIONS,
  UPPER_LETTERS_OPTIONS,
  SET_NOTATION_OPTIONS,
} from '../../constants';

const MOBILE_NUMBERS_KEYBOARD = [
  'x y {a_sup_b} {a_sup_2} 7 8 9 {division} {math}',
  '( ) < > 4 5 6 {mult} {left_arrow} {right_arrow}',
  '{abs} , {less_equal} {greater_equal} 1 2 3 {minus} {bksp} {tab}',
  '{abc} {pi} {sqrt} {sqrt_n} 0 . {equal} {plus} {enter}',
];

const MOBILE_LOWER_LETTERS_KEYBOARD = [
  'q w e r t y u i o p',
  'a s d f g h j k l {theta}',
  '{shift} z x c v b n m {bksp}',
  '{123} {a_sub_b} ! [ { ~ {quotation} {tab} {enter}',
];

const MOBILE_UPPER_LETTERS_KEYBOARD = [
  'Q W E R T Y U I O P',
  'A S D F G H J K L {theta}',
  '{shift_down} Z X C V B N M {bksp}',
  '{123} {number_sign} % ] } : {apostrophe} {tab} {enter}',
];

const MOBILE_MATH_FORMULA_KEYBOARD = [
  '{log_a} {sin} {cos} {tan} {csc} {sec} {cot}',
  '{log} {sin_inv} {cos_inv} {tan_inv} {csc_inv} {sec_inv} {cot_inv}',
  '{ln} {sin_h} {cos_h} {tan_h} {csc_h} {sec_h} {cot_h}',
  '{delta} {infinity} {sqrt_n} {abs} {int} {deriv} {sum} {prod} {set} {back}',
];

const MOBILE_NUMERIC_KEYBOARD = [
  '{sin} {cos} {tan} 7 8 9 {pi} e ( )',
  '{csc} {sec} {cot} 4 5 6 {division} {a_sup_b} {left_arrow} {right_arrow}',
  '{log} {log_a} {ln} 1 2 3 {mult} {bksp} {tab}',
  '{inv} {sqrt} {sqrt_n} 0 . {plus} {minus} {enter}',
];

const MOBILE_NUMERIC_INVERSION_KEYBOARD = [
  '{sin_inv} {cos_inv} {tan_inv} 7 8 9 {pi} e ( )',
  '{csc_inv} {sec_inv} {cot_inv} 4 5 6 {division} {a_sup_b} {left_arrow} {right_arrow}',
  '{log} {log_a} {ln} 1 2 3 {mult} {bksp} {tab}',
  '{inv} {sqrt} {sqrt_n} 0 . {plus} {minus} {enter}',
];

const MOBILE_SET_NOTATION_KEYBOARD = [
  '{element} {notelemend} {union} {intersection} {propersubset} {propersuperset} {subset} {superset} {notsubset} {notsuperset} |',
  '{natural} {real} {complex} {rational} {integer} {emptyset} {ominus} {therefore} {exists} {back}',
];

const INVERSION_OPTION = { key: '{inv}', label: 'INV', expression: null, len: 0, move: null, type: 'switcher' };

const ROUND_BRACKETS_OPTION = {
  key: '{round_brackets}',
  label: '( )',
  expression: '\\left( \\right)',
  len: 2,
  move: null,
  type: 'symbol',
};

const MOBILE_MF_KEYBOARD_LAYOUT = {
  lower_letters: MOBILE_LOWER_LETTERS_KEYBOARD,
  upper_letters: MOBILE_UPPER_LETTERS_KEYBOARD,
  functions: MOBILE_MATH_FORMULA_KEYBOARD,
  numbers: MOBILE_NUMBERS_KEYBOARD,
  set_notation: MOBILE_SET_NOTATION_KEYBOARD,
};

const MOBILE_NUMERIC_KEYBOARD_LAYOUT = {
  functions: MOBILE_NUMERIC_KEYBOARD,
  functions_inversion: MOBILE_NUMERIC_INVERSION_KEYBOARD,
};

const MOBILE_LOWER_LETTERS_OPTIONS = LOWER_LETTERS_OPTIONS.concat([
  A_SUBSCRIPT_B_OPTION,
  BACKSPACE_OPTION,
  COMMA_SYMBOL,
  ENTER_OPTION,
  LEFT_CURLY_BRACKET_OPTION,
  LEFT_SQUARE_BRACKET_OPTION,
  NUMBERS_OPTION,
  ROUND_BRACKETS_OPTION,
  SHIFT_OPTION,
  SHIFT_DOWN_OPTION,
  TAB_OPTION,
  { key: '~', label: '~', expression: '\\sim', len: 1, move: null, type: 'symbol' },
  { key: '!', label: '!', expression: '!', len: 1, move: null, type: 'symbol' },
  { key: '{quotation}', label: '"', expression: "''", len: 1, move: null, type: 'symbol' },
]);

const MOBILE_UPPER_LETTERS_OPTIONS = UPPER_LETTERS_OPTIONS.concat([
  A_SUPERSCRIPT_B_OPTION,
  APOSTROPHE_SYMBOL,
  BACKSPACE_OPTION,
  COLON_SYMBOL,
  ENTER_OPTION,
  NUMBERS_OPTION,
  PERCENTAGE_SYMBOL,
  RIGHT_CURLY_BRACKET_OPTION,
  RIGHT_SQUARE_BRACKET_OPTION,
  ROUND_BRACKETS_OPTION,
  SHIFT_OPTION,
  SHIFT_DOWN_OPTION,
  TAB_OPTION,
  { key: '{theta}', label: '𝜃', expression: '\\theta', len: 1, move: null, type: 'symbol' },
  { key: '{number_sign}', label: '#', expression: '\\sharp', len: 1, move: null, type: 'symbol' },
]);

const MOBILE_SET_NOTATION_OPTIONS = SET_NOTATION_OPTIONS.concat([
  { key: '{back}', label: 'Back', expression: null, len: null, move: null, type: 'switcher' },
]);

const MOBILE_NUMBERS_OPTIONS = MATH_OPTIONS.concat(
  A_SUPERSCRIPT_B_OPTION,
  ABS_OPTION,
  BACKSPACE_OPTION,
  ENTER_OPTION,
  LEFT_BRACKET_OPTION,
  RIGHT_BRACKET_OPTION,
  INEQUALITIES_OPTIONS,
  SQRT_OPTION,
  TAB_OPTION,
  SET_NOTATION_OPTIONS,
  [
    { key: '{math}', label: 'functions', expression: null, len: null, move: '', type: 'switcher' },
    { key: '{abc}', label: 'ABC', expression: null, len: null, move: '', type: 'switcher' },
    { key: '{a_sup_2}', label: 'a²', expression: '^2', len: 2, move: 'left', type: 'symbol' },
    { key: 'x', label: 'x', expression: 'x', len: 1, move: null, type: 'symbol' }, //
    { key: 'y', label: 'y', expression: 'y', len: 1, move: null, type: 'symbol' }, //
    { key: ',', label: ',', expression: ',', len: 1, move: null, type: 'symbol' },
    { key: '{abs}', label: '|a|', expression: '\\left|\\right|', len: 2, move: 'left', type: 'symbol' },
  ],
);

const MOBILE_MF_FUNCTIONS_OPTIONS = LOGARITHM_OPTIONS.concat(SQRT_OPTION, SQRT_N_OPTION, TRIGONOMETRIC_OPTIONS, [
  { key: '{sin_h}', label: 'sinh', expression: '\\sinh \\left(\\right)', len: 6, move: 'left', type: 'symbol' },
  { key: '{cos_h}', label: 'cosh', expression: '\\cosh \\left(\\right)', len: 6, move: 'left', type: 'symbol' },
  { key: '{tan_h}', label: 'tanh', expression: '\\tanh \\left(\\right)', len: 6, move: 'left', type: 'symbol' },
  { key: '{csc_h}', label: 'csch', expression: '\\csch \\left(\\right)', len: 6, move: 'left', type: 'symbol' },
  { key: '{sec_h}', label: 'sech', expression: '\\sech \\left(\\right)', len: 6, move: 'left', type: 'symbol' },
  { key: '{cot_h}', label: 'coth', expression: '\\coth \\left(\\right)', len: 6, move: 'left', type: 'symbol' },
  { key: '{abs}', label: '|a|', expression: '\\left|\\right|', len: 2, move: 'left', type: 'symbol' },
  { key: '{sum}', label: '∑', expression: '\\sum_{n=}^{}', len: 3, move: 'up', type: 'symbol' },
  { key: '{prod}', label: '∏', expression: '\\prod_{n=}^{}', len: 3, move: 'up', type: 'symbol' },
  { key: '{delta}', label: 'Δ', expression: '\\Delta', len: 1, move: null, type: 'symbol' },
  { key: '{infinity}', label: '∞', expression: '\\infty', len: 1, move: null, type: 'symbol' },
  { key: '{int}', label: '∫', expression: '\\int_{}^{}', len: 1, move: 'up', type: 'symbol' },
  { key: '{deriv}', label: 'd－dx', expression: '\\frac{d}{dx}', len: 4, move: null, type: 'symbol' },
  { key: '{back}', label: 'Back', expression: null, len: null, move: null, type: 'switcher' },
  { key: '{set}', label: 'Set', expression: null, len: null, move: null, type: 'switcher' },
]);

const MOBILE_NUMERIC_FUNCTIONS_OPTIONS = MATH_OPTIONS.concat(
  BACKSPACE_OPTION,
  ENTER_OPTION,
  INVERSION_OPTION,
  LEFT_BRACKET_OPTION,
  LOGARITHM_OPTIONS,
  RIGHT_BRACKET_OPTION,
  SQRT_OPTION,
  TAB_OPTION,
  TRIGONOMETRIC_OPTIONS,
  { key: 'e', label: 'e', expression: 'e', len: 1, move: null, type: 'symbol' },
);

const getMobileOptions = (key, kind) => {
  if (kind === 'numeric') {
    return MOBILE_NUMERIC_FUNCTIONS_OPTIONS;
  }
  return {
    lower_letters: MOBILE_LOWER_LETTERS_OPTIONS,
    functions: MOBILE_MF_FUNCTIONS_OPTIONS,
    upper_letters: MOBILE_UPPER_LETTERS_OPTIONS,
    numbers: MOBILE_NUMBERS_OPTIONS,
    set_notation: MOBILE_SET_NOTATION_OPTIONS,
  }[key];
};

const MOBILE_MF_SWITCHERS = {
  '{math}': 'functions',
  '{abc}': 'lower_letters',
  '{shift}': 'upper_letters',
  '{shift_down}': 'lower_letters',
  '{set}': 'set_notation',
  '{123}': 'numbers',
  '{back}': 'numbers',
};

const MOBILE_NUMERIC_SWITCHERS = {
  '{inv}': ['functions', 'functions_inversion'],
};

export {
  getMobileOptions,
  MOBILE_MF_KEYBOARD_LAYOUT,
  MOBILE_NUMERIC_KEYBOARD_LAYOUT,
  MOBILE_MF_SWITCHERS,
  MOBILE_NUMERIC_SWITCHERS,
};
