export const styles = () => ({
  buttons: {
    marginTop: 35,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  button: {
    marginRight: 20,
  },
  block_input: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
  },
  error_input_join: {
    margin: '2px 0px',
    fontSize: 14,
    color: 'red',
    textAlign: 'left',
    position: 'static',
  },
  group_id: {
    border: '1px solid #9e9e9e',
    padding: '2px 10px 0px 10px',
  },
  label_item: {
    fontSize: 18,
    paddingRight: 15,
    width: 110,
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
  },
  input_focused: {
    borderColor: '#aba3ff',
    outline: 0,
  },
  joinclass_btn: {
    height: 47,
    lineHeight: '50px',
    padding: '0 24px',
    width: '100%',
    background: '#796eff',
    color: '#fff',
    borderRadius: 3,
    border: 'none',
    letterSpacing: '.5px',
    transition: 'background-color .15s, color .15s ease-in-out',
    cursor: 'pointer',
    fontSize: 18,
    fontFamily: 'Gordita',
    '& span': {
      height: 47,
    },
    '&:hover': {
      background: '#635ac7',
    },
  },
});
