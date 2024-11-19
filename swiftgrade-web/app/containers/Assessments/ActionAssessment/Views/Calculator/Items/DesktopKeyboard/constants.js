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
  SET_OPTION,
  TRIGONOMETRIC_OPTIONS,
  UPPER_LETTERS_OPTIONS,
  SET_NOTATION_OPTIONS,
} from '../../constants';

const DESKTOP_LOWER_LETTERS_KEYBOARD = [
  'q w e r t y u i o p {a_sub_b} [ {',
  'a s d f g h j k l {theta} ~ {quotation} {bksp}',
  '{123} {shift} z x c v b n m ! {tab} {enter}',
];

const DESKTOP_UPPER_LETTERS_KEYBOARD = [
  'Q W E R T Y U I O P {number_sign} ] }',
  'A S D F G H J K L ) : {apostrophe} {bksp}',
  '{123} {shift_down} Z X C V B N M % {tab} {enter}',
];

const DESKTOP_NUMBER_KEYBOARD = [
  '( ) < > y 7 8 9 0 {division} {minus} {math} {bksp}',
  '{a_sup_2} {a_sup_b} {less_equal} {greater_equal} x 4 5 6 , {mult} {plus} {left_arrow} {right_arrow} {tab}',
  '{abc} {abs} {sqrt} {sqrt_n} {pi} 1 2 3 . {equal} {enter}',
];

const DESKTOP_SETS_KEYBOARD = [
  '{element} {notelemend} {union} {intersection} {propersubset} {propersuperset} {subset} {superset} {notsubset} {notsuperset} |',
  '{natural} {real} {complex} {rational} {integer} {emptyset} {ominus} {therefore} {exists} {back}',
];

const DESKTOP_MATH_KEYBOARD = [
  '{sin} {cos} {tan} {csc} {sec} {cot} {sin_h} {cos_h} {tan_h} {csc_h} {sec_h} {cot_h}',
  '{sin_inv} {cos_inv} {tan_inv} {csc_inv} {sec_inv} {cot_inv} {sin_h_inv} {cos_h_inv} {tan_h_inv} {csc_h_inv} {sec_h_inv} {cot_h_inv}',
  '{delta} {infinity} {abs} {sqrt_n} {log_a} {log} {ln} {int} {deriv} {sum} {prod} {set} {back}',
];

const DESKTOP_NUMERIC_KEYBOARD = [
  '{a_sup_b} {sqrt} {pi} {log} {sin} {cos} {tan} {csc} {sec} {cot}',
  '{a_sup_2} {sqrt_n} {ln} {log_a} {sin_inv} {cos_inv} {tan_inv} {csc_inv} {sec_inv} {cot_inv}',
];

const DESKTOP_KEYBOARD_LAYOUT = {
  lower_letters: DESKTOP_LOWER_LETTERS_KEYBOARD,
  upper_letters: DESKTOP_UPPER_LETTERS_KEYBOARD,
  mf_functions: DESKTOP_MATH_KEYBOARD,
  numeric_functions: DESKTOP_NUMERIC_KEYBOARD,
  numbers: DESKTOP_NUMBER_KEYBOARD,
  set_notation: DESKTOP_SETS_KEYBOARD,
};

const DESKTOP_NUMBERS_OPTIONS = MATH_OPTIONS.concat(
  A_SUPERSCRIPT_B_OPTION,
  BACKSPACE_OPTION,
  ENTER_OPTION,
  INEQUALITIES_OPTIONS,
  LEFT_BRACKET_OPTION,
  RIGHT_BRACKET_OPTION,
  SQRT_OPTION,
  SQRT_N_OPTION,
  TAB_OPTION,
  ABS_OPTION,
  [
    { key: 'x', label: 'x', expression: 'x', len: 1, move: null, type: 'symbol' },
    { key: 'y', label: 'y', expression: 'y', len: 1, move: null, type: 'symbol' },
    { key: '{a_sup_2}', label: 'a²', expression: '^2', len: 2, move: 'left', type: 'symbol' },
    { key: ',', label: ',', expression: ',', len: 1, move: null, type: 'symbol' },
    { key: '{math}', label: 'functions', expression: null, len: null, move: null, type: 'switcher' },
    { key: '{abc}', label: 'A B C', expression: null, len: null, move: null, type: 'switcher' },
  ],
);

const DESKTOP_SET_NOTATION_OPTIONS = SET_NOTATION_OPTIONS.concat([
  { key: '{back}', label: 'Back', expression: null, len: null, move: null, type: 'switcher' },
]);

const DESKTOP_LOWER_LETTERS_OPTIONS = LOWER_LETTERS_OPTIONS.concat([
  { key: '!', label: '!', expression: '!', len: 1, move: null, type: 'symbol' },
  { key: '{quotation}', label: '"', expression: '"', len: 1, move: null, type: 'symbol' },
  { key: '~', label: '~', expression: '\\sim', len: 1, move: null, type: 'symbol' },
  COMMA_SYMBOL,
  A_SUBSCRIPT_B_OPTION,
  BACKSPACE_OPTION,
  ENTER_OPTION,
  LEFT_BRACKET_OPTION,
  LEFT_CURLY_BRACKET_OPTION,
  LEFT_SQUARE_BRACKET_OPTION,
  NUMBERS_OPTION,
  SHIFT_OPTION,
  SHIFT_DOWN_OPTION,
  TAB_OPTION,
]);

const DESKTOP_UPPER_LETTERS_OPTIONS = UPPER_LETTERS_OPTIONS.concat([
  COLON_SYMBOL,
  APOSTROPHE_SYMBOL,
  PERCENTAGE_SYMBOL,
  A_SUBSCRIPT_B_OPTION,
  BACKSPACE_OPTION,
  ENTER_OPTION,
  NUMBERS_OPTION,
  RIGHT_BRACKET_OPTION,
  RIGHT_CURLY_BRACKET_OPTION,
  RIGHT_SQUARE_BRACKET_OPTION,
  SHIFT_OPTION,
  SHIFT_DOWN_OPTION,
  SQRT_OPTION,
  TAB_OPTION,
  { key: '{number_sign}', label: '#', expression: '#', len: 1, move: null, type: 'symbol' },
]);

const DESKTOP_MATH_FORMULA_OPTIONS = [
  { key: '{sin_h}', label: 'sinh', expression: '\\sinh \\left(\\right)', len: 6, move: 'left', type: 'symbol' },
  { key: '{cos_h}', label: 'cosh', expression: '\\cosh \\left(\\right)', len: 6, move: 'left', type: 'symbol' },
  { key: '{tan_h}', label: 'tanh', expression: '\\tanh \\left(\\right)', len: 6, move: 'left', type: 'symbol' },
  { key: '{csc_h}', label: 'csch', expression: '\\csch \\left(\\right)', len: 6, move: 'left', type: 'symbol' },
  { key: '{sec_h}', label: 'sech', expression: '\\sech \\left(\\right)', len: 6, move: 'left', type: 'symbol' },
  { key: '{cot_h}', label: 'coth', expression: '\\coth \\left(\\right)', len: 6, move: 'left', type: 'symbol' },
  {
    key: '{sin_h_inv}',
    label: 'sinh⁻¹',
    expression: '\\sinh ^{-1}\\left(\\right)',
    len: 8,
    move: 'left',
    type: 'symbol',
  },
  {
    key: '{cos_h_inv}',
    label: 'cosh⁻¹',
    expression: '\\cosh ^{-1}\\left(\\right)',
    len: 8,
    move: 'left',
    type: 'symbol',
  },
  {
    key: '{tan_h_inv}',
    label: 'tanh⁻¹',
    expression: '\\tanh ^{-1}\\left(\\right)',
    len: 8,
    move: 'left',
    type: 'symbol',
  },
  {
    key: '{csc_h_inv}',
    label: 'csch⁻¹',
    expression: '\\csch ^{-1}\\left(\\right)',
    len: 8,
    move: 'left',
    type: 'symbol',
  },
  {
    key: '{sec_h_inv}',
    label: 'sech⁻¹',
    expression: '\\sech ^{-1}\\left(\\right)',
    len: 8,
    move: 'left',
    type: 'symbol',
  },
  {
    key: '{cot_h_inv}',
    label: 'coth⁻¹',
    expression: '\\coth ^{-1}\\left(\\right)',
    len: 8,
    move: 'left',
    type: 'symbol',
  },
  { key: '{sum}', label: '∑', expression: '\\sum_{n=}^{}', len: 3, move: 'up', type: 'symbol' },
  { key: '{int}', label: '∫', expression: '\\int_{}^{}', len: 1, move: 'up', type: 'symbol' },
  { key: '{deriv}', label: 'd－dx', expression: '\\frac{d}{dx}', len: 4, move: null, type: 'symbol' },
  { key: '{prod}', label: '∏', expression: '\\prod_{n=}^{}', len: 3, move: 'up', type: 'symbol' },
  { key: '{delta}', label: 'Δ', expression: '\\Delta', len: 1, move: null, type: 'symbol' },
  { key: '{infinity}', label: '∞', expression: '\\infty', len: 1, move: null, type: 'symbol' },

  ABS_OPTION,
  SET_OPTION,
  { key: '{back}', label: 'Back', expression: null, len: null, move: null, type: 'switcher' },
];

const DESKTOP_MATH_OPTIONS = LOGARITHM_OPTIONS.concat(TRIGONOMETRIC_OPTIONS, [
  { key: '{pi}', label: '𝜋', expression: '\\pi', len: 2, move: '', type: 'symbol' },
  { key: '{a_sup_2}', label: 'a²', expression: '^2', len: 2, move: '', type: 'symbol' },
  A_SUPERSCRIPT_B_OPTION,
  NUMBERS_OPTION,
  SQRT_OPTION,
  SQRT_N_OPTION,
]);

const getDesktopOptions = key =>
  ({
    lower_letters: DESKTOP_LOWER_LETTERS_OPTIONS,
    mf_functions: DESKTOP_MATH_OPTIONS.concat(DESKTOP_MATH_FORMULA_OPTIONS),
    numeric_functions: DESKTOP_MATH_OPTIONS,
    upper_letters: DESKTOP_UPPER_LETTERS_OPTIONS,
    numbers: DESKTOP_NUMBERS_OPTIONS,
    set_notation: DESKTOP_SET_NOTATION_OPTIONS,
  }[key]);

const DESKTOP_SWITCHERS = kind => ({
  '{math}': kind === 'numeric' ? 'numeric_functions' : 'mf_functions',
  '{abc}': 'lower_letters',
  '{shift}': 'upper_letters',
  '{shift_down}': 'lower_letters',
  '{set}': 'set_notation',
  '{123}': 'numbers',
  '{back}': 'numbers',
});

export { DESKTOP_KEYBOARD_LAYOUT, getDesktopOptions, DESKTOP_SWITCHERS };
