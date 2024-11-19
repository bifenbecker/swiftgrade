export const UNITS_OPTIONS = [
  { label: 'a^b', len: 1, move: 'left', expression: '^{ }' },
  { label: 'a^3', len: 1, move: 'left', expression: '^{3}' },
  { label: 'a^2', len: 1, move: 'left', expression: '^{2}' },
  { label: '\\Omega', len: 1, move: null, expression: '\\Omega ' },
  { label: '\\mu', len: 1, move: null, expression: '\\mu ' },
];

const SET_NOTATION_OPTIONS = [
  {
    key: '{union}',
    label: '∪',
    len: 1,
    type: 'symbol',
    expression: '∪',
  },
  {
    key: '{intersection}',
    label: '∩',
    len: 1,
    type: 'symbol',
    expression: '∩',
  },
  {
    key: '{subset}',
    label: '⊆',
    len: 1,
    type: 'symbol',
    expression: '⊆',
  },
  {
    key: '{notsubset}',
    label: '⊄',
    len: 1,
    type: 'symbol',
    expression: '⊄',
  },
  {
    key: '{superset}',
    label: '⊇',
    len: 1,
    type: 'symbol',
    expression: '⊇',
  },
  {
    key: '{notsuperset}',
    label: '⊅',
    len: 1,
    type: 'symbol',
    expression: '⊅',
  },
  {
    key: '{emptyset}',
    label: 'Ø',
    len: 1,
    type: 'symbol',
    expression: 'Ø',
  },
  {
    key: '{propersubset}',
    label: '⊂',
    len: 1,
    type: 'symbol',
    expression: '⊂',
  },
  {
    key: '{propersuperset}',
    label: '⊃',
    len: 1,
    type: 'symbol',
    expression: '⊃',
  },
  {
    key: '{element}',
    label: '∈',
    len: 1,
    type: 'symbol',
    expression: '∈',
  },
  {
    key: '{notelemend}',
    label: '∉',
    len: 1,
    type: 'symbol',
    expression: '∉',
  },
  {
    key: '{therefore}',
    label: '∴',
    len: 1,
    type: 'symbol',
    expression: '∴',
  },
  {
    key: '{exists}',
    label: '∃',
    len: 1,
    type: 'symbol',
    expression: '∃',
  },
  {
    key: '{natural}',
    label: 'ℕ',
    len: 1,
    type: 'symbol',
    expression: 'ℕ',
  },
  {
    key: '{integer}',
    label: 'ℤ',
    len: 1,
    type: 'symbol',
    expression: 'ℤ',
  },
  {
    key: '{rational}',
    label: 'ℚ',
    len: 1,
    type: 'symbol',
    expression: 'ℚ',
  },
  {
    key: '{real}',
    label: 'ℝ',
    len: 1,
    type: 'symbol',
    expression: 'ℝ',
  },
  {
    key: '{complex}',
    label: 'ℂ',
    len: 1,
    type: 'symbol',
    expression: 'ℂ',
  },
  {
    key: '{ominus}',
    label: '⊖',
    len: 1,
    type: 'symbol',
    expression: '\\ominus',
  },
  {
    key: '|',
    label: '|',
    len: 1,
    type: 'symbol',
    expression: '|',
  },
];

const A_SUBSCRIPT_B_OPTION = {
  key: '{a_sub_b}',
  label: 'aₙ',
  expression: '_{ }',
  len: 1,
  move: 'left',
  type: 'symbol',
};
const A_SUPERSCRIPT_B_OPTION = {
  key: '{a_sup_b}',
  label: 'aⁿ',
  expression: '^{ }',
  len: 1,
  move: 'left',
  type: 'symbol',
};
const ABS_OPTION = { key: '{abs}', label: '|a|', expression: '\\left|\\right|', len: 2, move: 'left', type: 'symbol' };
const APOSTROPHE_SYMBOL = { key: '{apostrophe}', label: "'", expression: "'", len: 1, move: null, type: 'symbol' };
const BACKSPACE_OPTION = { key: '{bksp}', label: '⌫', expression: 'backspace', len: 1, move: null, type: 'symbol' };
const COLON_SYMBOL = { key: ':', label: ':', expression: ':', len: 1, move: null, type: 'symbol' };
const COMMA_SYMBOL = { key: ',', label: ',', expression: ',', len: 1, move: null, type: 'symbol' };
const ENTER_OPTION = { key: '{enter}', label: '↵', expression: 'enter', len: 0, move: null, type: 'symbol' };
const LEFT_BRACKET_OPTION = {
  key: '(',
  label: '(',
  expression: '\\left(\\right)',
  len: 1,
  move: 'backspace_left',
  type: 'symbol',
};
const LEFT_CURLY_BRACKET_OPTION = {
  key: '{',
  label: '{',
  expression: '\\left\\{\\right\\}',
  len: 1,
  move: 'backspace_left',
  type: 'symbol',
};
const LEFT_SQUARE_BRACKET_OPTION = {
  key: '[',
  label: '[',
  expression: '\\left[\\right]',
  len: 1,
  move: 'backspace_left',
  type: 'symbol',
};
const RIGHT_CURLY_BRACKET_OPTION = {
  key: '}',
  label: '}',
  expression: '\\left\\{ \\right\\}',
  len: 1,
  move: null,
  type: 'symbol',
};
const RIGHT_SQUARE_BRACKET_OPTION = {
  key: ']',
  label: ']',
  expression: '\\left[ \\right]',
  len: 1,
  move: null,
  type: 'symbol',
};
const RIGHT_BRACKET_OPTION = {
  key: ')',
  label: ')',
  expression: '\\left( \\right)',
  len: 1,
  move: null,
  type: 'symbol',
};
const NUMBERS_OPTION = { key: '{123}', label: '1 2 3', expression: null, len: null, move: null, type: 'switcher' };
const PERCENTAGE_SYMBOL = { key: '%', label: '%', expression: '%', len: 1, move: null, type: 'symbol' };
const SHIFT_OPTION = { key: '{shift}', label: '⇧', expression: null, len: null, move: null, type: 'switcher' };
const SHIFT_DOWN_OPTION = {
  key: '{shift_down}',
  label: '⇩',
  expression: null,
  len: null,
  move: null,
  type: 'switcher',
};
const SQRT_OPTION = { key: '{sqrt}', label: '√', expression: '\\sqrt{ }', len: 1, move: 'left', type: 'symbol' };
const SQRT_N_OPTION = { key: '{sqrt_n}', label: 'ⁿ√', expression: '\\sqrt[]{}', len: 1, move: 'up', type: 'symbol' };
const TAB_OPTION = { key: '{tab}', label: 'TAB', expression: 'tab', len: 0, move: 'tab', type: 'move' };
const SET_OPTION = { key: '{set}', label: 'Set', expression: null, len: null, move: null, type: 'switcher' };

const INEQUALITIES_OPTIONS = [
  { key: '<', label: '<', expression: '<', len: 1, move: null, type: 'symbol' },
  { key: '>', label: '>', expression: '>', len: 1, move: null, type: 'symbol' },
  { key: '{less_equal}', label: '≤', expression: '\\leq', len: 1, move: null, type: 'symbol' },
  { key: '{greater_equal}', label: '≥', expression: '\\geq', len: 1, move: null, type: 'symbol' },
];

const LOGARITHM_OPTIONS = [
  { key: '{ln}', label: 'ln', expression: '\\ln \\left(\\right)', len: 4, move: 'left', type: 'symbol' },
  { key: '{log_a}', label: 'logₐ', expression: '\\log _ \\left(\\right)', len: 5, move: 'up', type: 'symbol' },
  { key: '{log}', label: 'log', expression: '\\log \\left(\\right)', len: 5, move: 'left', type: 'symbol' },
];

const LOWER_LETTERS_OPTIONS = [
  { key: 'q', label: 'q', expression: 'q', len: 1, move: null, type: 'symbol' },
  { key: 'w', label: 'w', expression: 'w', len: 1, move: null, type: 'symbol' },
  { key: 'e', label: 'e', expression: 'e', len: 1, move: null, type: 'symbol' },
  { key: 'r', label: 'r', expression: 'r', len: 1, move: null, type: 'symbol' },
  { key: 't', label: 't', expression: 't', len: 1, move: null, type: 'symbol' },
  { key: 'y', label: 'y', expression: 'y', len: 1, move: null, type: 'symbol' },
  { key: 'u', label: 'u', expression: 'u', len: 1, move: null, type: 'symbol' },
  { key: 'i', label: 'i', expression: 'i', len: 1, move: null, type: 'symbol' },
  { key: 'o', label: 'o', expression: 'o', len: 1, move: null, type: 'symbol' },
  { key: 'p', label: 'p', expression: 'p', len: 1, move: null, type: 'symbol' },
  { key: 'a', label: 'a', expression: 'a', len: 1, move: null, type: 'symbol' },
  { key: 's', label: 's', expression: 's', len: 1, move: null, type: 'symbol' },
  { key: 'd', label: 'd', expression: 'd', len: 1, move: null, type: 'symbol' },
  { key: 'f', label: 'f', expression: 'f', len: 1, move: null, type: 'symbol' },
  { key: 'g', label: 'g', expression: 'g', len: 1, move: null, type: 'symbol' },
  { key: 'h', label: 'h', expression: 'h', len: 1, move: null, type: 'symbol' },
  { key: 'j', label: 'j', expression: 'j', len: 1, move: null, type: 'symbol' },
  { key: 'k', label: 'k', expression: 'k', len: 1, move: null, type: 'symbol' },
  { key: 'l', label: 'l', expression: 'l', len: 1, move: null, type: 'symbol' },
  { key: 'z', label: 'z', expression: 'z', len: 1, move: null, type: 'symbol' },
  { key: 'x', label: 'x', expression: 'x', len: 1, move: null, type: 'symbol' },
  { key: 'c', label: 'c', expression: 'c', len: 1, move: null, type: 'symbol' },
  { key: 'v', label: 'v', expression: 'v', len: 1, move: null, type: 'symbol' },
  { key: 'b', label: 'b', expression: 'b', len: 1, move: null, type: 'symbol' },
  { key: 'n', label: 'n', expression: 'n', len: 1, move: null, type: 'symbol' },
  { key: 'm', label: 'm', expression: 'm', len: 1, move: null, type: 'symbol' },
  { key: '{theta}', label: '𝜃', expression: '\\theta', len: 1, move: null, type: 'symbol' },
];

const MATH_OPTIONS = [
  { key: '0', label: '0', expression: '0', len: 1, move: null, type: 'symbol' },
  { key: '1', label: '1', expression: '1', len: 1, move: null, type: 'symbol' },
  { key: '2', label: '2', expression: '2', len: 1, move: null, type: 'symbol' },
  { key: '3', label: '3', expression: '3', len: 1, move: null, type: 'symbol' },
  { key: '4', label: '4', expression: '4', len: 1, move: null, type: 'symbol' },
  { key: '5', label: '5', expression: '5', len: 1, move: null, type: 'symbol' },
  { key: '6', label: '6', expression: '6', len: 1, move: null, type: 'symbol' },
  { key: '7', label: '7', expression: '7', len: 1, move: null, type: 'symbol' },
  { key: '8', label: '8', expression: '8', len: 1, move: null, type: 'symbol' },
  { key: '9', label: '9', expression: '9', len: 1, move: null, type: 'symbol' },
  { key: '{division}', label: '÷', expression: '\\frac{}{}', len: 1, move: null, type: 'fraction' },
  { key: '{mult}', label: '×', expression: '\\cdot', len: 1, move: null, type: 'symbol' },
  { key: '{minus}', label: '-', expression: '-', len: 1, move: null, type: 'symbol' },
  { key: '{plus}', label: '+', expression: '+', len: 1, move: null, type: 'symbol' },
  { key: '{equal}', label: '=', expression: '=', len: 1, move: null, type: 'symbol' },
  { key: '{pi}', label: '𝜋', expression: '\\pi', len: 2, move: null, type: 'symbol' },
  { key: '{left_arrow}', label: '←', expression: 'move_left', len: 1, type: 'move' },
  { key: '{right_arrow}', label: '→', expression: 'move_right', len: 1, type: 'move' },
  { key: '.', label: '.', expression: '.', len: 1, move: null, type: 'symbol' },
  A_SUPERSCRIPT_B_OPTION,
  ABS_OPTION,
  SQRT_N_OPTION,
];

const TRIGONOMETRIC_OPTIONS = [
  { key: '{sin}', label: 'sin', expression: '\\sin \\left(\\right)', len: 5, move: 'left', type: 'symbol' },
  { key: '{cos}', label: 'cos', expression: '\\cos \\left(\\right)', len: 5, move: 'left', type: 'symbol' },
  { key: '{tan}', label: 'tan', expression: '\\tan \\left(\\right)', len: 5, move: 'left', type: 'symbol' },
  { key: '{cot}', label: 'cot', expression: '\\cot \\left(\\right)', len: 5, move: 'left', type: 'symbol' },
  { key: '{csc}', label: 'csc', expression: '\\csc \\left(\\right)', len: 5, move: 'left', type: 'symbol' },
  { key: '{sec}', label: 'sec', expression: '\\sec \\left(\\right)', len: 5, move: 'left', type: 'symbol' },
  { key: '{sin_inv}', label: 'sin⁻¹', expression: '\\sin ^{-1}\\left(\\right)', len: 7, move: 'left', type: 'symbol' },
  { key: '{cos_inv}', label: 'cos⁻¹', expression: '\\cos ^{-1}\\left(\\right)', len: 7, move: 'left', type: 'symbol' },
  { key: '{tan_inv}', label: 'tan⁻¹', expression: '\\tan ^{-1}\\left(\\right)', len: 7, move: 'left', type: 'symbol' },
  { key: '{cot_inv}', label: 'cot⁻¹', expression: '\\cot ^{-1}\\left(\\right)', len: 7, move: 'left', type: 'symbol' },
  { key: '{csc_inv}', label: 'csc⁻¹', expression: '\\csc ^{-1}\\left(\\right)', len: 7, move: 'left', type: 'symbol' },
  { key: '{sec_inv}', label: 'sec⁻¹', expression: '\\sec ^{-1}\\left(\\right)', len: 7, move: 'left', type: 'symbol' },
];

const UPPER_LETTERS_OPTIONS = [
  { key: 'Q', label: 'Q', expression: 'Q', len: 1, move: null, type: 'symbol' },
  { key: 'W', label: 'W', expression: 'W', len: 1, move: null, type: 'symbol' },
  { key: 'E', label: 'E', expression: 'E', len: 1, move: null, type: 'symbol' },
  { key: 'R', label: 'R', expression: 'R', len: 1, move: null, type: 'symbol' },
  { key: 'T', label: 'T', expression: 'T', len: 1, move: null, type: 'symbol' },
  { key: 'Y', label: 'Y', expression: 'Y', len: 1, move: null, type: 'symbol' },
  { key: 'U', label: 'U', expression: 'U', len: 1, move: null, type: 'symbol' },
  { key: 'I', label: 'I', expression: 'I', len: 1, move: null, type: 'symbol' },
  { key: 'O', label: 'O', expression: 'O', len: 1, move: null, type: 'symbol' },
  { key: 'P', label: 'P', expression: 'P', len: 1, move: null, type: 'symbol' },
  { key: 'A', label: 'A', expression: 'A', len: 1, move: null, type: 'symbol' },
  { key: 'S', label: 'S', expression: 'S', len: 1, move: null, type: 'symbol' },
  { key: 'D', label: 'D', expression: 'D', len: 1, move: null, type: 'symbol' },
  { key: 'F', label: 'F', expression: 'F', len: 1, move: null, type: 'symbol' },
  { key: 'G', label: 'G', expression: 'G', len: 1, move: null, type: 'symbol' },
  { key: 'H', label: 'H', expression: 'H', len: 1, move: null, type: 'symbol' },
  { key: 'J', label: 'J', expression: 'J', len: 1, move: null, type: 'symbol' },
  { key: 'K', label: 'K', expression: 'K', len: 1, move: null, type: 'symbol' },
  { key: 'L', label: 'L', expression: 'L', len: 1, move: null, type: 'symbol' },
  { key: 'Z', label: 'Z', expression: 'Z', len: 1, move: null, type: 'symbol' },
  { key: 'X', label: 'X', expression: 'X', len: 1, move: null, type: 'symbol' },
  { key: 'C', label: 'C', expression: 'C', len: 1, move: null, type: 'symbol' },
  { key: 'V', label: 'V', expression: 'V', len: 1, move: null, type: 'symbol' },
  { key: 'B', label: 'B', expression: 'B', len: 1, move: null, type: 'symbol' },
  { key: 'N', label: 'N', expression: 'N', len: 1, move: null, type: 'symbol' },
  { key: 'M', label: 'M', expression: 'M', len: 1, move: null, type: 'symbol' },
];

const COMMON_FUNCTIONS_STYLES = [
  {
    class: 'svg_functions',
    buttons: '{a_sup_b} {a_sup_2} {sqrt_n} {a_sub_b} {bksp}',
  },
  {
    class: 'a_superscript_b',
    buttons: '{a_sup_b}',
  },
  {
    class: 'a_subscript_b',
    buttons: '{a_sub_b}',
  },
  {
    class: 'a_superscript_2',
    buttons: '{a_sup_2}',
  },
  {
    class: 'sqrt_n',
    buttons: '{sqrt_n}',
  },
  {
    class: 'empty_button',
    buttons: ' ',
  },
  {
    class: 'math_derivative',
    buttons: '{deriv}',
  },
  {
    class: 'letters',
    buttons:
      'q w e r t y u i o p a s d f g h j k l z x c v b n m ' +
      'Q W E R T Y U I O P A S D F G H J K L Z X C V B N M {a_sup_2} {a_sup_b} {a_sub_b}',
  },
  {
    class: 'math_numbers',
    buttons: '{123}',
  },
  {
    class: 'service_symbols',
    buttons:
      '{123} {abc} {shift} {shift_down} {back} {bksp} {left_arrow} {right_arrow} {math} {set} 0 1 2 3 4 5 6 7 8 9 .',
  },
  {
    class: 'numbers_helper',
    buttons: '{left_arrow} {right_arrow} {bksp}',
  },
  {
    class: 'enter',
    buttons: '{enter}',
  },
  {
    class: 'backspace',
    buttons: '{bksp}',
  },
  {
    class: 'tab',
    buttons: '{tab}',
  },
  {
    class: 'functions',
    buttons: '{math}',
  },
  {
    class: 'move_buttons',
    buttons: '{enter} {tab}',
  },
];

export {
  A_SUBSCRIPT_B_OPTION,
  A_SUPERSCRIPT_B_OPTION,
  ABS_OPTION,
  APOSTROPHE_SYMBOL,
  BACKSPACE_OPTION,
  COLON_SYMBOL,
  COMMA_SYMBOL,
  COMMON_FUNCTIONS_STYLES,
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
  SQRT_OPTION,
  SQRT_N_OPTION,
  TAB_OPTION,
  TRIGONOMETRIC_OPTIONS,
  SET_NOTATION_OPTIONS,
  UPPER_LETTERS_OPTIONS,
  SET_OPTION,
};
