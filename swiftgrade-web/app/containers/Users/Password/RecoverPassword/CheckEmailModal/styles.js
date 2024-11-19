export const styles = () => ({
  popup_overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'fixed',
    background: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    transition: 'all .10s ease-in',
  },
  popup_content: {
    padding: '40px 30px 50px',
    background: '#fff',
    borderRadius: '8px',
    width: 600,
    textAlign: 'center',
    boxSizing: 'content-box',
    '@media(max-width:576px)': {
      padding: '25px 25px 40px',
      width: 'auto',
      margin: '0 20px 0',
    },
    '@media(min-width: 576px) and (max-width:1024px)': {
      padding: '25px 25px 40px',
      width: 600,
    },
    '@media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)': {
      padding: '25px 18px 40px',
    },
    '& h3': {
      font: '35px "Gordita Regular"',
      color: '#151b26',
      margin: '15px 0 20px',
      '@media(max-width:576px)': {
        fontSize: 30,
      },
      '@media(min-width: 576px) and (max-width:1024px)': {
        fontSize: 35,
      },
    },
    '& p': {
      font: '17px "Gordita Light"',
      color: '#646f79',
      margin: 0,
      '@media(max-width:576px)': {
        fontSize: 16,
      },
      '@media(min-width: 576px) and (max-width:1024px)': {
        fontSize: 18,
      },
    },
  },
  users_email: {
    fontFamily: 'Gordita',
  },
  close: {
    font: '17px "Gordita"',
    lineHeight: '42px',
    padding: '0px 40px',
    width: 'auto',
    background: '#796eff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: 3,
    border: 'none',
    letterSpacing: '.5px',
    transition: 'background-color .15s, color .15s ease-in-out',
    cursor: 'pointer',
    textTransform: 'capitalize',
    marginTop: 30,
    '&:hover': {
      background: '#635ac7',
      borderBottom: 'none',
      color: '#fff',
      textDecoration: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
  },
});
