import _ from 'lodash';

const MC_REPLACE_DATA = {
  '\\#': '#',
  '\\mathbb{Q}': 'ℚ',
  '\\mathbb{R}': 'ℝ',
  '\\mathbb{N}': 'ℕ',
  '\\mathbb{Z}': 'ℤ',
  '\\mathbb{C}': 'ℂ',
  '\\varepsilon': 'ε',
};

const LEFT_CURLY_BRACKET = '\\left{';
const RIGHT_CURLY_BRACKET = '\\right}';

export const formatMCValues = (mcValue, parentItem) => {
  let cleanedResult = mcValue;
  if (_.has(parentItem, 'correct_value')) {
    const correctValue = parentItem.correct_answer.value;

    Object.entries(MC_REPLACE_DATA).forEach(item => {
      if (mcValue.includes(item[0]) && _.isString(mcValue)) {
        cleanedResult = cleanedResult.replace(item[0], item[1]);
      }
    });
    if (
      correctValue.includes(LEFT_CURLY_BRACKET) ||
      (correctValue.includes(RIGHT_CURLY_BRACKET) && !cleanedResult.includes(LEFT_CURLY_BRACKET))
    ) {
      cleanedResult = cleanedResult.replace(/{/, LEFT_CURLY_BRACKET);
      cleanedResult = cleanedResult.replace(/}/, RIGHT_CURLY_BRACKET);
    }
  }
  return cleanedResult;
};
