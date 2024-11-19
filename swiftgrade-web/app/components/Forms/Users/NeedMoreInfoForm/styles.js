export const styles = () => ({
  from_containers: {
    width: '100%',
  },
  form_groups: {
    marginBottom: 10,
    '@media (max-width: 425px)': {
      marginBottom: 0,
    },
  },
  form_groups_input: {
    marginBottom: 25,
    '@media (max-width: 425px)': {
      marginBottom: '15px',
    },
  },
  error: {
    margin: '2px 0px',
    fontSize: 14,
    color: 'red',
    textAlign: 'left',
    position: 'absolute',
  },
  input_field_root: {
    marginTop: 10,
    padding: 0,
    borderRadius: 0,
    border: 'none',
  },
  input_root: {
    background: '#fff',
    border: '1px solid #cacaca',
    color: '#6d7881',
    borderRadius: 5,
    height: 38,
    margin: '10px 0 0',
    padding: '0 0 0 8px',
    transition: 'border .15s',
    boxSizing: 'border-box',
    lineHeight: '18px',
    boxShadow: '0px 0px 1px #e0e6e8',
    width: 270,
    fontSize: 15,
    '&::placeholder': {
      color: '#b7bfc6',
      opacity: 1,
      letterSpacing: '.5px',
      lineHeight: '18px',
    },
  },
  input_focused: {
    borderColor: '#f7b3cc',
    outline: 0,
  },
  select_field: {
    background: '#fff',
    border: '1px solid #e4e4e4',
    color: '#273240',
    borderRadius: 4,
    height: 38,
    margin: '10px 0 15px',
    padding: '0 8px',
    transition: 'border .15s',
    boxSizing: 'border-box',
    lineHeight: '18px',
    boxShadow: '0px 0px 1px #e4e4e4',
    width: 270,
    fontSize: 14,
    appearance: 'none',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    '& .MuiInputAdornment-positionEnd': {
      right: 10,
      '& svg': {
        width: '12px !important',
        height: '12px !important',
        fill: '#000',
      },
    },
  },
  input_select: {
    padding: 0,
  },
  select_focused: {
    borderColor: '#f7b3cc',
    outline: 0,
  },
  label: {
    color: '#273240',
    fontSize: 15,
    lineHeight: 'normal',
    '& span:after': {
      content: '":"',
    },
  },
  checks_boxes: {
    border: '1px solid #e2e2e2',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    padding: '17px 17px',
    paddingBottom: 5,
    boxSizing: 'content-box',
    marginTop: 10,
    '@media (max-width: 810px)': {
      padding: '17px 10px',
      width: '95%',
    },
    '@media (max-width: 520px)': {
      width: '100%',
    },
    '@media (max-width: 380px)': {
      width: '100%',
    },
  },
  checkbox_item: {
    position: 'relative',
    color: '#292731',
    margin: '0 0 15px',
    cursor: 'pointer',
    '@media (min-width: 1025px)': {
      width: 'calc(100%/4 - 5px)',
    },
    '@media (max-width: 1024px)': {
      width: 'calc(100%/3 - 5px)',
    },
    '@media (max-width: 576px)': {
      width: 'calc(100%/2 - 5px)',
    },
    '@media (max-width: 450px)': {
      width: '50%',
    },
    '& svg': {
      display: 'none',
    },
    '&:hover .MuiButtonBase-root': {
      border: '1px solid #d58acd',
    },
  },
  checkbox_root: {
    position: 'absolute',
    top: 4,
    left: 0,
    height: 10,
    width: 10,
    background: '#fff',
    borderRadius: 3,
    border: '1px solid #bbb',
    padding: 0,
    boxSizing: 'content-box',
    '&:hover': {
      border: '1px solid #d58acd',
    },
  },
  checked_checkbox_root: {
    background: '#d58acd',
    border: '1px solid #d58acd',
    '&:after': {
      position: 'absolute',
      content: '""',
      left: 3,
      top: 0,
      width: 4,
      height: 8,
      border: '1px solid white',
      borderWidth: '0 2px 2px 0',
      '-webkit-transform': 'rotate(45deg)',
      transform: 'rotate(40deg)',
    },
    '&:hover': {
      backgroundColor: '#d58acd',
    },
  },
  checkbox_label: {
    paddingLeft: 20,
    fontSize: 14,
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    userSelect: 'none',
  },
  done: {
    margin: 0,
    padding: '8px 16px',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    background: 'rgb(223, 138, 212)',
    border: 'none',
    boxShadow: '0px 0px 2px #d0d2d0',
    cursor: 'pointer',
    borderRadius: 0,
    marginTop: 15,
    '@media (max-width: 1024px)': {
      marginTop: '1rem',
    },
    '@media (max-width: 520px)': {
      marginTop: '1rem',
    },
    '& > *': {
      lineHeight: '18px',
    },
    '&:hover, &:focus, &:active': {
      background: '#ffd7ff',
      border: 'none',
      boxShadow: '0px 0px 2px #d0d2d0',
    },
  },
  done_dark: {
    background: '#dc67c8',
    '&:hover, &:focus, &:active': {
      background: '#dc67c8',
      border: 'none',
      boxShadow: '0px 0px 2px #d0d2d0',
    },
  },
});
