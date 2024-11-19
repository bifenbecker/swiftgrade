import { COLORS } from 'globalConstants';
import { LightenDarkenColor } from 'lighten-darken-color';

export const styles = theme => ({
  title: {
    marginBottom: 25,
    '&.isMobilePortrait': {
      marginBottom: 5,
    },
  },
  empty_assessments: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  empty_assessments_icon: {
    width: theme.spacing(40),
    height: theme.spacing(45),
    [theme.breakpoints.only('xs')]: {
      maxWidth: '80vw',
      maxHeight: '90vw',
    },
  },
  empty_student_assessments: {
    display: 'block',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15px',
    marginBottom: '20px',
  },
  empty_student_assessments_icon: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
    height: theme.spacing(35),
    margin: '0 auto',
  },
  empty_assessments_text: {
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 27,
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
    '&.isMobilePortrait': {
      padding: '16px 6px 16px 6px',
    },
  },
  table_icon: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    borderRadius: '50%',
    background: 'red',
  },
  action_icon_wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  circle_icon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    padding: 6,
    '&:hover': {
      borderRadius: '50%',
      background: '#e5e5e5',
    },
  },
  icon: {
    borderRadius: '50%',

    '&.select': {
      width: theme.spacing(5),
      height: theme.spacing(5),
      padding: 6,
    },

    '&.action': {
      width: theme.spacing(6),
      height: theme.spacing(6),
      padding: '6px 0px',
    },

    '&:hover': {
      backgroundColor: LightenDarkenColor(COLORS.grey[400], 40),
    },
    '&.disabled': {
      pointerEvents: 'none',
    },
  },
  icon_text: {
    display: 'grid',
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontSize: 12,
    marginTop: -4,
  },
  average: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  average_results: {
    fontSize: 12,
    color: COLORS.grey[700],
  },
  table_root_class: {
    [theme.breakpoints.only('xs')]: {
      padding: '16px 2px 16px 2px',
    },
    padding: 16,
    '&.isMobilePortrait': {
      padding: '6px 2px',
    },
  },
  action_column: {
    padding: 16,
    '&.isMobilePortrait': {
      padding: '16px 2px',
    },
  },
  name_column: {
    [theme.breakpoints.only('xs')]: {
      padding: '16px 2px 16px 2px',
    },
    padding: '16px 16px 16px 0px',
  },
  average_column: {
    '&.isMobilePortrait': {
      padding: '16px 2px',
    },
  },
  next_step_column: {
    '&.isMobilePortrait': {
      padding: '16px 2px',
    },
  },
  processing: {
    fontSize: 14,
  },
  processing_time_msg: {
    fontSize: 11,
  },
  kind_block: {
    display: 'block',
  },
  kind_subtitle: {
    fontSize: 11,
    color: '#616161',
  },
  add_new_assessment_note_arrow: {
    width: '75px',
    height: '50px',
    marginTop: '5px',
    marginLeft: '25px',
  },
  add_new_assessment_note_text: {
    display: 'flex',
    position: 'relative',
    marginLeft: '65px',
    fontSize: 15,
    color: '#3f3737',
  },
  assessments_students_title_block: {
    width: '87%',
    margin: 'auto',
    '&.isMobilePortrait': {
      width: '93%',
    },
  },
  create_btn_container: {
    width: '80%',
    margin: 'auto',
    '&.isMobilePortrait': {
      width: '93%',
    },
  },
  empty_assessments_container: {
    overflowY: 'auto',
    position: 'absolute',
    width: '100%',
    '&.isMobilePortrait': {
      paddingTop: 100,
    },
  },
  tooltip_wrapper: {
    width: 'min-content',
  },
  create_btn: {
    width: 112,
  },
  name_column_wrapper: {
    display: 'block',
  },
  date_type_title: {
    display: 'block',
    color: '#616161',
    fontSize: 12,
    lineHeight: 1.3,
    '@media (max-width: 343px)': {
      fontSize: 10,
    },
  },
  pulse: {
    animation: 'pulse 1.7s infinite',
    '&:hover': {
      animation: 'none',
    },
  },
});
