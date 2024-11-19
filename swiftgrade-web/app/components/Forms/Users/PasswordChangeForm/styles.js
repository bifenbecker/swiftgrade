export const styles = () => ({
  form: {
    maxWidth: 270,
    width: '100%',
    margin: '0 auto',
  },
  block_input: {
    position: 'relative',
    width: '100%',
    marginBottom: 25,
  },
  change_password_btn: {
    textTransform: 'none',
    color: '#549dfb',
    marginRight: 10,
    fontFamily: 'Arial, sans-serif',
  },
  error: {
    margin: '2px 0px',
    fontSize: 14,
    color: 'red',
    textAlign: 'left',
    position: 'absolute',
  },
  input_root: {
    backgroundColor: '#fff',
    border: '1px solid #e4e4e4',
    fontSize: 14,
    color: '#6d7881',
    borderRadius: 3,
    height: 37,
    lineHeight: 'normal',
    margin: 0,
    marginBottom: 0,
    padding: '0px 0px 0px 8px',
    transition: 'border .15s',
    width: '100%',
    boxSizing: 'border-box',
    '&::placeholder': {
      color: '#bebfc6',
      lineHeight: '49px',
      opacity: 1,
    },
  },
  input: {
    border: 'none',
    padding: 0,
    paddingRight: 38,
    '&::-ms-reveal, &::-ms-clear': {
      display: 'none',
    },
  },
  input_focused: {
    borderColor: '#549dfb',
    outline: 1,
  },
});
