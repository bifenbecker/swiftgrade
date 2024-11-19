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
    marginBottom: 15,
  },
  sign_up_btn: {
    height: 50,
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
    textTransform: 'capitalize',
    '& span': {
      height: 50,
    },
    '&:hover': {
      background: '#635ac7',
    },
  },
  icon_show_password: {
    position: 'absolute',
    right: 12,
  },
  remember_me: {
    textAlign: 'right',
    marginTop: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: '50%',
    left: 0,
    height: 18,
    width: 18,
    background: 'transparent',
    border: '1px solid rgba(166, 176, 183)',
    borderRadius: 3,
    transform: 'translateY(-50%)',
    padding: 0,
    '& svg': {
      display: 'none',
    },
  },
  checkbox_label: {
    display: 'flex',
    cursor: 'pointer',
    font: '16px "Gordita regular"',
    color: 'rgba(166, 176, 183)',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    userSelect: 'none',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& input:checked~.checkmark': {
      background: 'transparent',
    },
  },
  customcheckbox: {
    position: 'relative',
    paddingLeft: 25,

    '& label': {
      margin: 0,
    },
  },
  checkmark_checked: {
    '&:after': {
      display: 'block',
      content: '""',
      position: 'absolute',
      left: 6,
      top: 1,
      width: 5,
      height: 12,
      border: 'solid rgba(166, 176, 183)',
      borderWidth: '0 1px 1px 0',
      '-webkit-transform': 'rotate(45deg)',
      transform: 'rotate(45deg)',
    },
    '& svg': {
      display: 'none',
    },
  },
});
