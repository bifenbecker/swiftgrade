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
