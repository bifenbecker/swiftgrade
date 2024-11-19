export const styles = () => ({
  transparent_modal_button: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: 'max-content',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },

    '&.Mui-disabled': {
      backgroundColor: 'transparent',
    },
  },
  tutorial_ask_to_write_neatly_body: {
    marginBottom: '20px',
    '& img': {
      height: '75px',
      margin: '10px',
    },
  },
  tutorial_ask_to_write_neatly_body_container: {
    width: '85%',
    margin: '20px auto 40px',
  },
  tutorial_ask_to_write_neatly_body_grid: {
    display: 'flex',
    margin: '0px',

    '& li': {
      width: '50%',
      '&:first-child': {
        marginRight: '25px',
      },
    },
  },
  tutorial_ask_to_write_neatly_body_img: {
    width: '50%',
    paddingBottom: '15px',

    '&:first-child': {
      marginLeft: '25px',
    },
  },
  students_must_fill_circles_img: {
    paddingBottom: '15px',

    '&:first-child': {
      marginLeft: '25px',
    },
    '&:last-child': {
      marginLeft: '-10px',
    },
  },
  important_text: {
    textDecoration: 'underline',
  },
  tutorial_body_list: {
    paddingLeft: '35px',
    '& li': {
      marginBottom: '5px',
    },
  },
  tutorial_create_assessment_note: {
    display: 'flex',
    marginBottom: '10px',
  },
  tutorial_create_assessment_video: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,

    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
  tutorial_icon: {
    width: '20px',
    height: '20px',
    position: 'relative',
    top: '-3px',
  },
  tutorial_modal_buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
  tutorial_no_students_body: {
    display: 'flex',
    flexFlow: 'column',

    '& span': {
      marginBottom: '10px',
    },
  },
  tutorial_online_body: {
    fontSize: '18px',
  },
  tutorial_student_instructions_body: {
    paddingLeft: '17px',
    '& li': {
      margin: '5px 0px',
      marginLeft: '15px',
    },
  },
  tutorial_student_instructions_body_title: {
    paddingLeft: '17px',
  },
  tutorial_students_must_fill_circles: {
    paddingTop: '10px',
    '& img': {
      height: '75px',
      marginTop: '10px',
      marginBottom: '30px',
      '&:last-child': {
        marginBottom: '0px',
      },
      '@media(max-width: 600px)': {
        maxWidth: '100%',
        width: 'auto',
        height: 'auto',
        maxHeight: 60,
      },
    },
  },
  tutorial_checkbox_label: {
    fontSize: '0.875rem',
    paddingBottom: '2px',
  },
  released_images_container: {
    display: 'flex',
    justifyContent: 'center',
  },
  released_video_container: {
    width: '75%',
    display: 'block',
    margin: 'auto',
  },
});
