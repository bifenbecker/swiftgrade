export const styles = () => ({
  form: {},
  start_btn_wrapper: {
    width: '500px', // 60%
    margin: 'auto',
    paddingLeft: 0,
    '@media (max-width:600px)': {
      width: '100%',
      padding: 0,
    },
  },
  start_btn: {
    height: 50,
    lineHeight: '50px',
    padding: '0 24px',
    width: '100%',
    color: '#fff',
    borderRadius: 3,
    border: 'none',
    letterSpacing: '.5px',
    transition: 'background-color .15s, color .15s ease-in-out',
    cursor: 'pointer',
    fontSize: 18,
    textTransform: 'capitalize',
    '& span': {
      height: 50,
    },
  },
  password_field: {
    width: '500px',
    margin: 'auto',
    paddingBottom: 20,
  },
  input_root: {
    backgroundColor: '#fff',
    border: '2px solid #e0e6e8',
    borderRadius: 3,
    boxSizing: 'border-box',
    color: '#6d7881',
    fontFamily: 'Gordita Regular',
    fontSize: 20,
    height: 51,
    position: 'relative',
    transition: 'border .15s',
    wordBreak: 'normal',

    '@media (max-width: 577px)': {
      fontSize: 16,
    },
  },
  input_focused: {
    borderColor: '#6d7881',
  },
  input: {
    padding: '0px 38px 0px 20px',
    height: 47,
    lineHeight: '25px',
    '&::placeholder': {
      color: '#bebfc6',
      letterSpacing: '.5px',
      opacity: 1,
    },
    '&::-ms-reveal, &::-ms-clear': {
      display: 'none',
    },
  },
});
