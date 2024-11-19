import messages from './messages';

const LINKS = {
  privatePolicy: 'https://goswiftgrade.com/privacy-policy.html',
  termsAndConditions: 'https://goswiftgrade.com/terms-and-conditions.html',
};

const MESSAGES = {
  student: {
    title: messages.studentSignUp,
    p: messages.joinClassDescStart,
  },
  teacher: {
    title: messages.teacherSignUp,
    p: messages.bySiningUp,
  },
};

const META_TEXTS = {
  student: {
    title: messages.studentPageTitle,
    description: messages.studentPageDescription,
  },
  teacher: {
    title: messages.teacherPageTitle,
    description: messages.teacherPageDescription,
  },
};

export { LINKS, MESSAGES, META_TEXTS };
