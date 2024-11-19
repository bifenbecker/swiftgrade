export const styles = () => ({
  error_input_join: {
    margin: '2px 0px',
    fontSize: 14,
    color: 'red',
    textAlign: 'left',
    position: 'static',
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
    borderColor: '#aba3ff',
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
  icon_show_password: {
    position: 'absolute',
    right: 12,
    cursor: 'pointer',
  },
});
