export const styles = () => ({
  answer_fib: {
    textAlign: 'left',
    // textTransform: 'lowercase',
    // '&:first-letter': {
    //   textTransform: 'uppercase',
    // },
  },
  autocorrection_text: {
    paddingTop: 2,
  },
  fib_student_answer_wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 600px)': {
      maxWidth: 100,
      wordBreak: 'break-all',
    },
  },
  numeric_and_mf_answers: {
    '& .mq-math-mode .mq-empty': {
      background: 'white',
    },
  },
});
