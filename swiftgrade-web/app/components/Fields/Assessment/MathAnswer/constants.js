const MATH_ANSWERS_CONFIG = (id, index, isMobile, kind) => ({
  substituteTextarea: () => {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('autocapitalize', 'off');
    textarea.setAttribute('autocomplete', 'off');
    textarea.setAttribute('autocorrect', 'off');
    textarea.setAttribute('spellcheck', false);
    textarea.setAttribute('x-palm-disable-ste-all', true);

    if (isMobile) {
      textarea.setAttribute('readOnly', true);
    }
    return textarea;
  },
  id,
  autoCommands: AUTO_COMMANDS(kind),
  spaceBehavesLikeTab: true,
  sumStartsWithNEquals: true,
  autoOperatorNames: COMMON_OPERATOR_NAMES.concat(' ', AUTO_OPERATOR_NAMES[kind]),
});

const AUTO_COMMANDS = kind =>
  ({
    mf: 'pi sqrt sum nthroot prod plusminus pm int theta infinity Delta',
    numeric: 'pi sqrt nthroot',
  }[kind]);

const COMMON_OPERATOR_NAMES = 'sin cos log tan csc sec cot ln arccos arcsin arctan arccsc arccot arcsec';

const AUTO_OPERATOR_NAMES = {
  mf: 'sinh cosh tanh coth csch sech',
};

const EXPRESSIONS_REGEXES = [
  { regex: /\*/g, replace_pattern: '\\cdot' },
  { regex: /(sqrt)\(\s*(\w+)\s*\)/g, replace_pattern: '\\$1{$2}' },
  { regex: /(sqrt)(\d+)/g, replace_pattern: '\\$1{$2}' },
  { regex: /(nthroot)\(\s*(\w+)\s*,\s*(\w+)\s*\)/g, replace_pattern: '\\sqrt[$3]{$2}' },
  { regex: /(nthroot)\(\d+\)/g, replace_pattern: '\\sqrt[]{$2}' },
];

export { EXPRESSIONS_REGEXES, MATH_ANSWERS_CONFIG };
