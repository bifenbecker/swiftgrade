export const styles = theme => ({
  title: {
    marginBottom: 25,
    '&.isMobilePortrait': {
      marginBottom: 5,
    },
  },
  table: {
    margin: 'auto',
    maxWidth: '80%',
  },
  table_root: {
    '&.isMobile': {
      padding: '6px 4px',
    },
    padding: theme.spacing(2),
  },
  empty_students: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  empty_students_icon: {
    width: theme.spacing(55),
    height: theme.spacing(60),
    [theme.breakpoints.only('xs')]: {
      maxWidth: '80vw',
      maxHeight: '90vw',
    },
  },
  invite_students_note: {
    display: 'flex',
    flexFlow: 'column',
    marginLeft: '30px',

    '& span': {
      marginTop: '5px',
      marginLeft: '20px',
    },

    '& svg': {
      width: '60px',
      height: 'max-content',
      marginTop: '5px',
    },
  },
  student_code_container: {
    padding: 10,
    '& a': {
      textDecoration: ' none',
    },
  },
  code_item: {
    padding: 16,
    border: '1px solid #eee',
    fontSize: 32,
    width: 'calc(100% - 120px)',
    textAlign: 'center',
    marginTop: 26,
    [theme.breakpoints.only('xs')]: {
      width: 'calc(100% - 61px)',
    },
  },
  copy_code_text: {
    fontSize: 14,
  },
  copy_button: {
    marginLeft: 'auto',
    marginTop: 'auto',
    padding: 15,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
  },
  copy_icon: {
    width: 80,
    height: 80,
    margin: '26px 0 0 0',
    padding: 0,
    [theme.breakpoints.only('xs')]: {
      width: 60,
    },
  },
  copy_container: {
    display: 'flex',
    flexDirection: 'column',
  },
  popup_close_icon: {
    position: 'absolute',
    background: 'transparent',
    border: 'none',
    right: 11,
    top: 11,
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
    },
  },
  student_description: {
    paddingTop: 25,
  },
  circle: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    borderRadius: '50%',
    cursor: 'pointer',
    outline: 'none',
  },
  circle_icon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    padding: 6,
  },
  copy_popup: {
    position: 'absolute',
    top: -55,
    left: 0,
    right: 0,
    margin: 'auto',
  },
  empty_assessments_container: {
    [theme.breakpoints.only('xs')]: {
      overflowY: 'auto',
      position: 'absolute',
      width: '100%',
      '@media (orientation: portrait)': {
        paddingTop: 100,
      },
    },
  },
  assessments_students_title_block: {
    width: '87%',
    margin: 'auto',
    '&.isMobilePortrait': {
      width: '93%',
    },
  },
  join_btn_container: {
    width: '80%',
    margin: 'auto',
    '&.isMobilePortrait': {
      width: '93%',
    },
  },
  student_table_column: {
    '&.isMobile': {
      wordBreak: 'break-word',
      paddingLeft: '4px',
    },
  },
  username_or_email_column_head: {
    '&.isMobile': {
      paddingRight: '16px',
    },
  },
  add_students: {
    display: 'inline-block',
  },
  student_description_video: {
    display: 'block',
    justifyContent: 'center',
    paddingTop: 15,
    width: '75%',
    margin: 'auto',
  },
  student_new_class_btn: {
    color: '#3f51b5',
    boxShadow: 'none',
    background: 'transparent',
    textTransform: 'none',
    transition: 'all .3s',
    fontSize: 14,
    '&:hover': {
      opacity: 0.7,
      boxShadow: 'none',
      background: 'transparent',
    },
  },
  pulse: {
    animation: 'pulse 1.7s infinite',
    '&:hover': {
      animation: 'none',
    },
  },
  enrollement_options_body_wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  enrollement_options_body: {
    display: 'block',
    width: '100%',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    borderRadius: 5,
    margin: 10,
  },
  enrollement_options_icon: {
    width: 70,
    height: 70,
  },
  enrollement_options_title_text: {
    marginTop: 10,
    marginBottom: 0,
    '& span': {
      textTransform: 'none',
      fontWeight: 'normal',
      fontSize: 'large',
    },
  },
  enrollement_options_body_text: {
    marginTop: 0,
    marginBottom: 30,
    '& span': {
      textTransform: 'none',
      fontWeight: 'normal',
      fontSize: 'smaller',
      color: '#9ca6af',
    },
  },
  table_title: {
    height: '50px',
  },
});
