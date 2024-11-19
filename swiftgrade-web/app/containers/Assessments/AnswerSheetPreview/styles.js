export const styles = theme => ({
  assessment_name: {
    marginBottom: theme.spacing(0.375),
    '@media (max-width: 600px)': {
      fontSize: 12,
      width: '90%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  blank_sheet_notes: {
    color: 'gray',
  },
  blank_sheet_notes_item: {
    display: 'flex',
    marginBottom: '25px',
    '@media (max-width: 450px)': {
      fontSize: 12,
    },
  },
  extra_sheets_title: {
    fontWeight: 'bold',
  },
  loading: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number_of_sheets: {
    margin: `${theme.spacing(10.25)}px 0px 0px ${theme.spacing(3.5)}px`,
    [theme.breakpoints.down('md')]: {
      margin: `${theme.spacing(2.5)}px 0px 0px ${theme.spacing(1.5)}px`,
    },
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.spacing(2.5)}px 0px 0px ${theme.spacing(0.5)}px`,
    },
  },
  title: {
    marginBottom: '25px',
    fontSize: 20,
    textDecoration: 'underline',
    '&.isEmptyClass': {
      '@media (max-width: 450px)': {
        fontSize: 14,
      },
    },
  },
  select_container: {
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: 120,
      fontSize: 12,
    },
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    margin: `${theme.spacing(2.5)}px 0px`,
    width: '100%',
    height: 'auto',
    '@media (max-width: 600px)': {
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  count_sheets_wrapper: {
    '@media (min-width: 600px)': {
      display: 'flex',
    },
  },
  plus_item: {
    '@media (min-width: 600px)': {
      marginLeft: 3,
    },
  },
  select: {
    borderRadius: 10,
    border: '2px solid #e0e0e0',
    width: 65,
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),

    '&.without_students': {
      marginLeft: 0,
    },
  },
  answer_sheet_preview_select: {
    padding: `${theme.spacing(0.875)}px ${theme.spacing(2)}px ${theme.spacing(0.875)}px 0px`,
    textAlign: 'center',
    borderRadius: 10,
    '&:focus': {
      borderRadius: 10,
    },
  },
  download: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 'auto',
    marginTop: 'auto',
    marginBottom: '32%',
    '@media (max-width: 768px)': {
      marginBottom: 'auto',
    },
    '@media (max-width: 450px)': {
      '&.isEmptyClass': {
        marginTop: 0,
      },
    },
  },
  download_btn_text: {
    fontWeight: 700,
    fontSize: 12,
    textTransform: 'capitalize',
  },
  download_btn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  pdf: {
    height: '100%',
    background: '#DCDCDC',
    marginTop: theme.spacing(8.5),
    paddingBottom: theme.spacing(10),
    overflow: 'auto',
  },
  select_dropdown: {
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
        textAlign: 'center',
        paddingLeft: 5,
        paddingRight: 5,
      },
    },
  },
  tutorial_custom_pdf: {
    display: 'flex',
    flexFlow: 'column',
    textAlign: 'left',
  },
  tutorial_modal: {
    display: 'flex',
    flexFlow: 'column',

    '& span': {
      marginBottom: '10px',
    },
  },
  info_icon_wrapper: {
    padding: '0 4px',
  },
  info_icon_container: {
    display: 'inline-block',
    margin: 'auto',
    paddingTop: 5,
    paddingLeft: 5,
    '& svg': {
      width: '17px',
      height: '17px',
      opacity: '0.3',
    },
  },
  pulse: {
    borderRadius: '50%',
    animation: 'pulse 1.7s infinite',
    '&:hover': {
      animation: 'none',
    },
  },
});
