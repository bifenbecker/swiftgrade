export const styles = () => ({
  block_input: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
  },
  input_root: {
    backgroundColor: '#fff',
    border: '2px solid #e0e6e8',
    fontSize: 19,
    color: '#6d7881',
    borderRadius: 3,
    height: 47,
    lineHeight: 'normal',
    margin: 0,
    marginBottom: 0,
    padding: '0px 0px 0px 20px',
    transition: 'border .15s',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'Gordita Regular',
    letterSpacing: '.5px',
    '&::placeholder': {
      color: '#bebfc6',
      letterSpacing: '.5px',
      opacity: 1,
    },
    '@media (max-width: 577px)': {
      fontSize: 16,
    },
    '& input:-webkit-autofill': {
      '-webkit-box-shadow': '0 0 0px 1000px white inset',
      fontFamily: 'Gordita Regular',
      fontSize: 19,
    },
  },
  input_focused: {
    borderColor: '#aba3ff',
    outline: 0,
  },
  btn_wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  skip_button: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'underline',
    cursor: 'pointer',
    opacity: '.5',
    fontSize: '18px',
    marginRight: 30,
  },
  verify_btn: {
    lineHeight: '50px',
    padding: '0 24px',
    background: '#796eff',
    fontSize: 18,
    fontFamily: 'Gordita',
    '& span': {
      height: 47,
    },
    '&:hover': {
      background: '#635ac7',
    },
  },
  bodyText: {
    fontSize: 17,
  },
});
