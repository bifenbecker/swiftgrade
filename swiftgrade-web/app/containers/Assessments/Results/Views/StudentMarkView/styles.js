export const styles = theme => ({
  mark_textfield: {
    height: 18,
    width: 35,
    border: '1px solid #9e9e9e',
    '& .MuiOutlinedInput-root': {
      borderRadius: 'unset',
    },
  },
  mark_textfield_input: {
    padding: '1px 2px',
    fontSize: 14,
  },
  mark_total_column: {
    textAlign: 'start',
  },
  mc_answer_letters: {
    fontFamily: 'Symbola, "Times New Roman", serif',
    fontSize: 16,
  },
  mark_item: {
    display: 'flex',
    marginBottom: 5,
    marginTop: 5,
  },
  mark_item_name: {
    whiteSpace: 'nowrap',
    width: 30,
  },
  mark_item_total: {
    whiteSpace: 'nowrap',
    marginLeft: 4,
  },
  needs_grading_wrap: {
    marginTop: -4,
    cursor: 'pointer',
    position: 'absolute',
    right: '10%',
    color: 'rgb(52, 52, 52)',
    [theme.breakpoints.down('md')]: {
      right: 0,
    },
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
    },
    '&.answers': {
      right: 0,
      [theme.breakpoints.down('md')]: {
        position: 'relative',
        marginRight: -5,
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
      },
    },
  },
  needs_grading_icon: {
    width: 30, // 25
    height: 22, // 20
  },
  needs_grading_tooltip: {
    display: 'block',
  },
  total_mark_view: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
});
