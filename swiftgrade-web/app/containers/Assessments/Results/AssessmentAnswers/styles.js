export const styles = theme => ({
  answers_header: {
    minHeight: 40,
    margin: '20px 0px 10px 3px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '99vw',
  },
  answers_select: {
    borderRadius: 15,
    width: 60,
    height: 30,
  },
  answers_select_root: {
    border: '1px solid #e5e5e5',
    borderRadius: 10,
    '&:focus': {
      borderRadius: 10,
    },
    paddingTop: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
    color: '#585858',
  },
  answers_mark: {
    padding: `${theme.spacing(2)}px ${theme.spacing(0.375)}px`,
    position: 'relative',
    '&.correct': {
      background: '#BCEFAD !important',
    },
    '&.partially_correct': {
      background: '#ffe48a !important',
    },
    '&.incorrect': {
      background: '#f79196 !important',
    },
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup_tab_answer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fff',
    border: '1px solid #000',
    padding: '8px 8px 38px',
    width: '100%',
    overflowY: 'auto',
  },
  popup_column_left: {
    width: '100%',
  },
  answer_item_container: {
    position: 'relative',
    display: 'flex',
    minWidth: 65,
    '& > div:not(.popup_answer_tab_wrap)': {
      maxHeight: 60,
      overflow: 'hidden',
      margin: '0 !important',
    },
  },
  no_students: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(30),
    fontFamily: 'Roboto Light',
    color: '#C3C3C4',
    fontWeight: 300,
    fontSize: 20,
    userSelect: 'none',
  },
  table_height: {
    maxHeight: 'calc(100vh - 245px) !important',
    paddingBottom: 80,
    minWidth: '500px',
  },
  answers_select_dropdown: {
    '& > div': {
      width: 'auto !important',
      minWidth: 50,
      height: '100%',
    },
    '& ul': {
      scrollbarWidth: 'thin',
      overflow: '-moz-scrollbars-none',
      display: 'flex',
      flexDirection: 'column',
      '&::-webkit-scrollbar': {
        width: 4,
        height: 4,
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#ccc',
      },
      '&::-webkit-scrollbar-track': {
        background: '#eee',
      },
      '& li': {
        height: 'auto',
        minHeight: 30,
        paddingLeft: 10,
        paddingRight: 10,

        '& div': {
          display: 'block',
          lineHeight: '2',
          margin: 'auto',
        },
      },
    },
  },
  need_grading_button: {
    cursor: 'pointer',
    fontSize: 12,
    marginTop: 50,
    position: 'absolute',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  table_main_wrapper: {
    maxWidth: '99vw',
    overflowX: 'scroll',
  },
  filter_button: {
    minWidth: 110,
    position: 'relative',
    top: -30,
  },
});
