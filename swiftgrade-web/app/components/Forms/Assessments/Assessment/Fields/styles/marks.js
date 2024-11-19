export const styles = theme => ({
  answer_marks_wrapper: {
    height: '100%',
    borderLeft: '1px solid #d4d4d4',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '23%',

    '&.isAddRow': {
      borderLeft: '1px solid #9e9e9e',
    },
    [theme.breakpoints.only('sm')]: {
      width: '23%',
    },
    [theme.breakpoints.only('xs')]: {
      width: '21%',
    },
  },
  answer_marks: {
    display: 'flex',
    padding: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
  },
  answer_kind: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 11,
    fontFamily: 'Noto Sans',
    fontWeight: 300,
    paddingBottom: 1,

    '@media (max-width: 1400px)': {
      width: '90%',
      fontSize: 10,
    },
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  answer_mark: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  multiple_mark: {
    flexGrow: 0,
    maxWidth: '20%',
    flexBasis: '20%',
    textAlign: 'center',

    [theme.breakpoints.between('md', 'lg')]: {
      flexGrow: 0,
      maxWidth: '28%',
      flexBasis: '28%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      flexGrow: 0,
      maxWidth: '33%',
      flexBasis: '33%',
    },
    [theme.breakpoints.only('sm')]: {
      textAlign: 'center',
      flexGrow: 0,
      maxWidth: '48%',
      flexBasis: '48%',
    },
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
      flexGrow: 0,
      maxWidth: '100%',
      flexBasis: '100%',
      padding: '2px 0',
    },
  },
  mark_select: {
    border: '1px solid #CCCCCC',
    padding: '4px 9px 4px 0px',
    textAlign: 'center',
    [theme.breakpoints.only('sm')]: {
      fontSize: '12px',
    },
  },
  mark_root: {
    position: 'relative',
    maxWidth: 50,

    '@media (max-width: 1400px)': {
      width: '90%',
    },
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  mark_option: {
    minHeight: 20,
    fontSize: 12,
    margin: 0,
    padding: '2px 6px 2px 6px',

    '@media (max-width: 1400px)': {
      paddingLeft: 4,
      paddingRight: 4,
    },
  },
  max_score: {
    marginTop: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 9.5,
    fontFamily: 'Noto Sans',
    color: 'rgb(126, 126, 126)',
  },
  marks_select: {
    '& .MuiPaper-root.MuiAutocomplete-paper': {
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

        '& div': {
          display: 'block',
          lineHeight: '2',
        },
      },
    },
  },
  max_score_title: {
    fontSize: 14,
    textAlign: 'center',
    [theme.breakpoints.only('xs')]: {
      fontSize: 12,
    },
  },
  marks_container: {
    padding: '12px 0px 8px',
    '&.multiple': {
      padding: '10px 0',
    },
    [theme.breakpoints.only('xs')]: {
      padding: '8px 0',
      '&.multiple': {
        padding: '6px 0',
      },
    },
  },
});
