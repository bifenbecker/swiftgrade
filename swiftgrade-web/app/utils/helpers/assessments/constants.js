import { List, Map } from 'immutable';

const ANSWER_BODY = Map({
  actual_height: 30,
  answer: null,
  evaluation_displayed: false,
  fraction_mode: false,
  height: 1,
  value: '',
  width: 0,
});
const NUMERIC_ANSWER_MARKS = List([
  Map({ kind: 'answer', value: 1 }),
  Map({ kind: 'unit', value: 0.25 }),
  Map({ kind: 'significant_figure', value: 0.25 }),
]);
const MC_ANSWER_BODY = Map({ actual_height: 30, height: 1, value: [] });
const MC_ANSWER_MARKS = List([Map({ kind: 'answer', value: 1 })]);
const MF_ANSWER_BODY = Map({
  actual_height: 30,
  answer: null,
  evaluation_displayed: false,
  fraction_mode: false,
  height: 1,
  value: '',
  width: 0,
});
const MF_ANSWER_MARKS = List([Map({ kind: 'answer', value: 1 }), Map({ kind: 'unit', value: 0.25 })]);
const FIB_ANSWER_MARKS = List([Map({ kind: 'answer', value: 1 })]);
const FIB_ANSWER_BODY = Map({ actual_height: 30, height: 1, value: '' });

const ANSWERS = Map({
  fib: List([Map({ body: FIB_ANSWER_BODY, marks: FIB_ANSWER_MARKS })]),
  mc: List([Map({ body: MC_ANSWER_BODY, marks: MC_ANSWER_MARKS })]),
  mf: List([Map({ body: MF_ANSWER_BODY, marks: MF_ANSWER_MARKS, unit: '' })]),
  numeric: List([
    Map({
      body: ANSWER_BODY,
      scientific_notation: 3,
      significant_figure: null,
      unit: '',
      tolerance: 0,
      marks: NUMERIC_ANSWER_MARKS,
    }),
  ]),
});

const ANSWER_BODY_BY_KIND = {
  fib: FIB_ANSWER_BODY,
  mc: MC_ANSWER_BODY,
  mf: MF_ANSWER_BODY,
  numeric: ANSWER_BODY,
};

const SETTING = Map({
  fib: List(['autocorrection']),
  mc: List([]),
  mf: List([]),
  numeric: List([]),
});

const DESMOS_OPTIONS = {
  decimalToFraction: true,
  degreeMode: true,
  expressionsTopbar: false,
  graphpaper: false,
  keypad: false,
  settingsMenu: false,
  showResetButtonOnGraphpaper: false,
  zoomButtons: false,
};

const INIT_VALUES = params => {
  const { assessmentIndex, assessmentItems, heights, count, name } = params;
  return {
    answers: ANSWERS,
    assessment_index: assessmentIndex || null,
    assessment_items: assessmentItems || [],
    heights: heights || {},
    kind: 'fib',
    name: name || `Assessment ${count + 1}`,
    setting: SETTING,
  };
};

const NON_DECIMAL_SYMBOLS = [
  'a',
  'e',
  's',
  'i',
  'n',
  'c',
  'o',
  't',
  'a',
  'n',
  'l',
  'g',
  'q',
  'r',
  'n',
  'h',
  'p',
  '*',
  '/',
  '+',
  '-',
  '(',
  ')',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '.',
  '^',
];

const SPECIAL_MATH_FORMULA_SYMBOLS = ['theta', 'geq', 'leq'];

const COEFFFICIENT = {
  1: 9.3,
  2: 8.2,
  3: 7.9,
  4: 7.9,
  5: 7.9,
};

const TOLERANCE_OPTIONS = [
  { key: '', label: '0%', value: 0 },
  { key: 1, label: '1%', value: 1 },
  { key: 2, label: '2%', value: 2 },
  { key: 3, label: '3%', value: 3 },
  { key: 4, label: '4%', value: 4 },
  { key: 5, label: '5%', value: 5 },
  { key: 6, label: '6%', value: 6 },
  { key: 7, label: '7%', value: 7 },
  { key: 8, label: '8%', value: 8 },
  { key: 9, label: '9%', value: 9 },
  { key: 10, label: '10%', value: 10 },
  { key: 15, label: '15%', value: 15 },
  { key: 20, label: '20%', value: 20 },
  { key: 25, label: '25%', value: 25 },
];

const NEW_TAB_LINKS = (assessmentId, groupId, key) =>
  ({
    create: `/groups/${groupId}/create_assessment/`,
    edit: `/groups/${groupId}/assessments/${assessmentId}/`,
    result: `/groups/${groupId}/assessments/${assessmentId}/results/`,
  }[key]);

export {
  ANSWER_BODY,
  ANSWER_BODY_BY_KIND,
  ANSWERS,
  COEFFFICIENT,
  DESMOS_OPTIONS,
  INIT_VALUES,
  FIB_ANSWER_BODY,
  FIB_ANSWER_MARKS,
  MC_ANSWER_BODY,
  MC_ANSWER_MARKS,
  MF_ANSWER_BODY,
  MF_ANSWER_MARKS,
  NEW_TAB_LINKS,
  NON_DECIMAL_SYMBOLS,
  NUMERIC_ANSWER_MARKS,
  SETTING,
  SPECIAL_MATH_FORMULA_SYMBOLS,
  TOLERANCE_OPTIONS,
};
