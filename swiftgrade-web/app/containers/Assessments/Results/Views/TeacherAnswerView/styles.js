export const styles = () => ({
  arrow_answer_key: {
    position: 'absolute',
    outline: 0,
    margin: 'auto',
    display: 'block',
    cursor: 'pointer',
    bottom: -20,
    '&.reversed': {
      transform: 'rotate(180deg)',
    },
    '&.results_tab': {
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
  popup_answer_wrap: {
    position: 'absolute',
    maxWidth: '85vw',
    minWidth: '100%',
    width: 'max-content',
    top: '100%',
    zIndex: 9,
    minHeight: '50vh',
    marginBottom: 150,
    marginTop: 20,
    '@media (max-width: 768px)': {
      maxWidth: '95vw',
    },
    '&.results_tab': {
      left: 0,
      marginTop: 0,
    },
  },
  popup_answer: {
    alignItems: 'baseline',
    justifyContent: 'center',
    background: '#fff',
    border: '1px solid #000',
    padding: '30px 15px 15px',
    marginBottom: 100,
    width: '100%',

    '&.pdf': {
      marginBottom: 0,
      border: 'unset',
    },
  },
  popup_answer_marks_wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    margin: '6px 0',

    '& .mq-root-block, .mq-math-mode .mq-root-block': {
      padding: 0,
      fontFamily: 'inherit',
    },
  },
  popup_answer_option: {
    fontSize: 16,
    fontWeight: 600,
    width: '100%',
  },
  popup_answer_or: {
    color: '#d5d5d5',
    display: 'block',
    width: '100%',
    textAlign: 'center',
  },
  popup_close_button: {
    position: 'absolute',
    textTransform: 'none',
    border: 'none',
    width: 15,
    height: 15,
    top: 10,
    right: 10,
    background: 'transparent',
    cursor: 'pointer',
    color: '#828282',
    padding: 0,
    '&:focus': {
      outline: 'none',
    },
  },
  glow: {
    fontWeight: 600,
    textShadow: '1px 1px 2px #e0dede',
    '& .mq-math-mode *': {
      fontWeight: 600,
    },
    background: 'yellow',
  },
  answer_message: {
    marginRight: 10,
    minWidth: 90,
    alignSelf: 'center',
    '&.isMobile': {
      minWidth: 35,
    },
  },
  result_answer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  answer_wrap: {
    display: 'flex',
    alignItems: 'center',
    '& .mq-math-mode .mq-empty': {
      background: 'white',
    },
  },
  autocorrection_text: {
    paddingTop: 4,
    textAlign: 'center',
  },
  character_matching_tooltip: {
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 12,
    maxWidth: 450,
    border: '1px solid rgba(0, 0, 0, 0.87)',
  },
  fib_answer_wrapper: {
    '@media (max-width: 600px)': {
      maxWidth: 100,
      wordBreak: 'break-all',
    },
  },
});
