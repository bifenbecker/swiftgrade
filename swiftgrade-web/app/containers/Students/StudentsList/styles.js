export const styles = theme => ({
  loading: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  students: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    margin: 'auto',
    maxWidth: '80%',
  },
  account_icon: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  circle: {
    borderRadius: '50%',
    width: 28,
    height: 28,
    margin: 'auto',
    cursor: 'pointer',
  },
  circle_icon: {
    height: 40,
    display: 'flex',
  },
  first_name_column: {
    [theme.breakpoints.only('xs')]: {
      padding: '16px 2px 16px 2px',
    },
    paddingLeft: 0,
  },
  add_students_modal_text: {
    whiteSpace: 'pre-wrap',
    marginBottom: theme.spacing(1),
  },
  add_students_list_messages: {
    lineHeight: '30px',
    marginLeft: '20px',
    paddingLeft: theme.spacing(1.25),
  },
  tutorial_student_settings: {
    display: 'flex',
    flexFlow: 'column',
    textAlign: 'left',
  },
  tutorial_student_settings_title: {
    fontWeight: 'bold',
    marginBottom: '15px',
    textAlign: 'center',
  },
  tutorial_student_settings_body: {
    lineHeight: '30px',
  },
  students_congratulations: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 10,
    '& img': {
      width: '10%',
    },
  },
});
