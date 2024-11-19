import messages from './messages';

export const STUDENT_FIELDS = [
  { name: 'first_name', message: messages.firstName, disabled: false, title: messages.firstNameTitle },
  { name: 'last_name', message: messages.lastName, disabled: false, title: messages.lastNameTitle },
  { name: 'username', message: messages.emailOrUsername, disabled: true, title: messages.usernameTitle },
];

export const RESULTS_TAB_STUDENT_FIELDS = disabled => [
  { name: 'first_name', message: messages.firstName, disabled, title: messages.firstNameTitle, maxLength: 30 },
  { name: 'last_name', message: messages.lastName, disabled, title: messages.lastNameTitle, maxLength: 30 },
  {
    name: 'username',
    message: messages.usernameOrEmail,
    disabled,
    title: messages.usernameOrEmailTitle,
    maxLength: 255,
  },
];
