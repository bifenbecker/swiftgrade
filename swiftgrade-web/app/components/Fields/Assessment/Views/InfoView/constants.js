import messages from './messages';

export const TOOLTIP_MESSAGES = {
  characterMatching: {
    title: messages.characterMatching,
    bodyHeader: messages.exactSameCharacters,
    forExampleHeader: messages.forExample,
    forExampleFirst: messages.yourAnswer,
    forExampleSecond: messages.exampleAnswerFirst,
    forExampleThird: messages.characterMatchingMarkedCorrect,
    forExampleFourth: messages.exampleAnswerFirst,
  },
  equivalence: {
    title: messages.equivalence,
    bodyHeader: messages.mathematicallyEquivalent,
    forExampleHeader: messages.forExample,
    forExampleFirst: messages.yourAnswer,
    forExampleSecond: messages.exampleAnswerFirst,
    forExampleThird: messages.equivalentAnswers,
    forExampleFourth: messages.exampleAnswerSecond,
  },
};

export const CUSTOM_INFO_MESSAGES = {
  'A piecewise expression must have at least one condition.': 'Brackets should not be curly {}.',
  "Function '' is not defined.":
    'Derivatives and apostrophise are not supported. Function {variableName} is not defined.',
  "Sorry, I don't understand this use of prime notation.":
    'Derivatives and apostrophise are not supported. Sorry, we don’t understand this use of prime notation.',
};
