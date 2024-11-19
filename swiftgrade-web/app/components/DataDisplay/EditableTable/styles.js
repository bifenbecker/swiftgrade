export const styles = () => ({
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
  add_students_table_buttons: {
    marginTop: 35,
    justifyContent: 'space-between',
  },
  add_students_table_title: {
    display: 'block',
    color: '#9ca6af',
    textAlign: 'center',
    marginBottom: 20,
  },
  view_errors_popup_title: {
    color: 'red',
    marginBottom: 20,
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  view_errors_wrapper: {
    '&.isMobile': {
      position: 'absolute',
      top: '45px',
      right: '0px',
    },
  },
  add_students_table_buttons_left: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    alignContent: 'center',
    color: '#9ca6af',
    fontSize: 'small',
  },
  add_students_table_buttons_right: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  cell_error: {
    borderBottom: '1px solid #f00',
    fontSize: 'small',
    color: '#9ca6af',
  },
  table_text_btn: {
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
    '&:disabled': {
      color: 'grey',
      opacity: 0.7,
      boxShadow: 'none',
      background: 'transparent',
    },
  },
  errors_body: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: '1.5em',
  },
  max_students_error: {
    color: 'red',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loading_text: {
    fontWeight: 700,
    padding: 5,
    background: 'white',
  },
});
