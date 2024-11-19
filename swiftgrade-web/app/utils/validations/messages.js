import { defineMessages } from 'react-intl';

export default defineMessages({
  requiredField: {
    id: 'form.validations.errors.requiredField',
    defaultMessage: 'This field is required',
  },
  requiredClassField: {
    id: 'groups.requiredClassName',
    defaultMessage: 'Class name required.',
  },
  requiredAssessmentName: {
    id: 'assessments.form.requiredAssessmentName',
    defaultMessage: 'Assessment name required',
  },
  passwordIsNotEqual: {
    id: 'form.validations.errors.passwordIsNotEqual',
    defaultMessage: 'Entered passwords do not match',
  },
  onlyLatin: {
    id: 'form.validations.errors.onlyLatin',
    defaultMessage: 'Only Latin letters are allowed',
  },
  maxLength: {
    id: 'form.validations.errors.maxLength',
    defaultMessage: 'The maximum length is {maxLengthValue} characters.',
  },
  invalidDate: {
    id: 'form.validations.errors.invalidDate',
    defaultMessage: 'Invalid date.',
  },
  onlyNumber: {
    id: 'form.validations.errors.onlyNumber',
    defaultMessage: 'Only numeric letters are allowed',
  },
  invalidData: {
    id: 'form.validations.errors.invalidData',
    defaultMessage: 'Invalid data.',
  },
});
