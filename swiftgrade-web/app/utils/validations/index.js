import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const wrapMessage = (message, options) => <FormattedMessage {...message} values={options} />;

const requiredField = (msg, value) => {
  if ((typeof value === 'string' && /^\s*$/.test(value)) || (Array.isArray(value) && value.length === 0)) {
    return msg;
  }

  if (value || value === 0) {
    return undefined;
  }

  return msg;
};

export const required = value => {
  const msg = wrapMessage(messages.requiredField);
  return requiredField(msg, value);
};

export const requiredAssessmentName = value => {
  const msg = wrapMessage(messages.requiredAssessmentName);
  return requiredField(msg, value);
};

export const onlyLatin = value => {
  if (value && !/^[a-zA-Z0-9 -]+$/.test(value)) {
    return wrapMessage(messages.onlyLatin);
  }
  return undefined;
};

export const onlyNumber = value => {
  if (value && !/^-?\d*(\.\d+)?$/.test(value)) {
    return wrapMessage(messages.onlyNumber);
  }
  return undefined;
};

export const onlyInteger = value => {
  if (!value) {
    return null;
  }
  if (!/^\d+$/.test(value)) {
    return wrapMessage(messages.onlyNumber);
  }

  return undefined;
};

export const maxLength = (maxLengthValue, message) => value =>
  value && value.length > maxLengthValue ? wrapMessage(message, { maxLengthValue }) : undefined;

export const maxLength50 = maxLength(50, messages.maxLength);

const equalWithFields = (fields, value, formValues) => {
  for (let i = 0; i < fields.length; i += 1) {
    if (formValues.get(fields[i]) !== value) {
      return false;
    }
  }
  return true;
};

export const equalWithPassword = (value, formValues) =>
  equalWithFields(['password'], value, formValues) ? undefined : wrapMessage(messages.passwordIsNotEqual);

export const isValidUsername = username => /^[A-Za-z0-9]*$/.test(username);
export const isValidEmail = email => /\S+@\S+\.\S+/.test(email);
