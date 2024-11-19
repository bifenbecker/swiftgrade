export const styles = theme => ({
  form: {
    outline: 'none !important',
    position: 'absolute',
    width: '100%',
    marginTop: theme.spacing(10),
    overflowX: 'hidden',
  },
  answer_limit_view: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  answer_limit_view_button: {
    alignSelf: 'flex-end',
  },
  footer: {
    [theme.breakpoints.between('xs', 'sm')]: {
      padding: `${theme.spacing(2.75)}px ${theme.spacing(1)}px`,
    },
    [theme.breakpoints.only('sm')]: {
      height: 179,
    },
    padding: `${theme.spacing(2.75)}px ${theme.spacing(3.5)}px`,
    width: 'calc(100vw - 4px)',
    height: 129,
    zIndex: 1,
    position: 'relative',
    '&.edit_assessment_with_results': {
      marginTop: 20,
    },
    '&.isMobile': {
      height: 230,
    },
    '&.isMC': {
      height: 100,
    },
  },
  total_marks: {
    border: '1px solid #757575',
    padding: '5px 8px',
    color: '#757575',
    fontSize: 14,
    '& > *': {
      fontSize: 14,
      lineHeight: '1.75',
    },
  },
  line: {
    borderTop: '1px dashed #424242',
    marginBottom: theme.spacing(1.6),
  },
  add_row_wrapper: {
    width: '100vw',
    [theme.breakpoints.between('xs', 'sm')]: {
      left: theme.spacing(1),
      right: theme.spacing(1),
    },
    position: 'relative',
    padding: `0px ${theme.spacing(3.5)}px`,

    [theme.breakpoints.between('xs', 'sm')]: {
      padding: `0px ${theme.spacing(1)}px`,
    },
    '&.edit_assessment_with_results': {
      marginTop: 70,
    },
    '&.itemsExist': {
      marginBottom: 0,
    },
  },
  action_assessment_btn: {
    '&:disabled': {
      backgroundColor: 'rgb(224, 224, 224)',
      borderColor: 'rgb(224, 224, 224)',
    },
  },
});
