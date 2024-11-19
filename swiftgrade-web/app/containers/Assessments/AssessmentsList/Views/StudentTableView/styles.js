export const styles = theme => ({
  title: {
    marginBottom: 25,
  },
  empty_assessments: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  empty_student_assessments: {
    display: 'block',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15px',
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
      marginBottom: 20,
    },
  },
  empty_student_assessments_icon: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
    height: theme.spacing(35),
    margin: '0 auto',
    [theme.breakpoints.only('xs')]: {
      width: '80vw',
    },
  },
  empty_assessments_text: {
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 27,
    color: 'rgb(187, 187, 187)',
    [theme.breakpoints.only('xs')]: {
      fontSize: 18,
    },
  },
  circle: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    borderRadius: '50%',
    cursor: 'pointer',
    outline: 'none',
    '&.disabled': {
      cursor: 'default',
    },
  },
  table_icon: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    borderRadius: '50%',
    background: 'red',
  },
  circle_icon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    padding: 6,
  },
  table_root_class: {
    [theme.breakpoints.only('xs')]: {
      padding: '16px 2px 16px 2px',
      '&.isMobilePortrait': {
        padding: '6px 2px',
      },
    },
    padding: 16,
  },
  name_column: {
    [theme.breakpoints.only('xs')]: {
      padding: '16px 2px 16px 2px',
    },
    padding: '16px 16px 16px 0px',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  dateTooltip: {
    marginLeft: '-5rem',
  },
  processing: {
    fontSize: 14,
  },
  processing_time_msg: {
    fontSize: 11,
  },
  time_limit_column: {
    paddingLeft: 0,
    [theme.breakpoints.only('xs')]: {
      paddingRight: 0,
    },
  },
  classroom_icon: {
    width: '19.2px',
    height: '19.2px',
    color: 'white',
    padding: 1,
    fontSize: 28,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    margin: 'auto',
  },
  classroom_label: {
    position: 'relative',
    cursor: 'default',
  },
  timer_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0px 4px',
  },
  timer_item_value: {
    fontSize: 14,
  },
  timer_item_msg: {
    fontSize: 12,
  },
  date_time_block: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time_text: {
    fontSize: 12,
    color: '#616161',
  },
  action_column: {
    padding: 16,
    '&.isMobilePortrait': {
      padding: '16px 2px',
    },
  },
  empty_assessments_container: {
    overflowY: 'auto',
    position: 'absolute',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      '@media (orientation: portrait)': {
        paddingTop: 100,
      },
    },
  },
  assessments_students_title_block: {
    width: '87%',
    margin: 'auto',
    [theme.breakpoints.only('xs')]: {
      '@media (orientation: portrait)': {
        width: '93%',
      },
    },
  },
});
