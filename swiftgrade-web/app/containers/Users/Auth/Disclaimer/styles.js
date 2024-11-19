export const styles = () => ({
  wrapper_component: {
    padding: 0,
    margin: 0,
    maxHeight: '100vh',
    overflowY: 'auto',
  },
  disclaimer: {
    width: '100%',
    padding: '65px 0 60px',
    '@media(min-width: 576px) and (max-width:1024px)': {
      width: '100%',
      padding: '0px 0 60px',
    },
    '@media(max-width: 576px)': {
      padding: '0px 0 60px',
    },
  },
  disclaimer_inner: {
    width: 550,
    margin: '0 auto',
    marginTop: 0,
    textAlign: 'left',
    minHeight: 'calc(100vh - 122px)',
    fontSize: 18,
    '@media(min-width: 576px) and (max-width:1024px)': {
      width: 500,
      paddingTop: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    '@media(max-width: 576px)': {
      width: '85%',
      fontSize: 14,
      paddingTop: 10,
      marginTop: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    '& h3': {
      textAlign: 'center',
      font: '40px Gordita regular',
      color: '#151b26',
      margin: '6px 0 0',
      '@media(max-width: 576px)': {
        fontSize: 30,
        margin: '50px 0 0',
      },
      '@media(min-width: 576px) and (max-width:1024px)': {
        fontSize: 40,
        margin: '15px 0',
      },
      '@media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)': {
        fontSize: 25,
        margin: '50px 0 0',
      },
    },
    '& p': {
      font: '18px Gordita regular',
    },
  },
  btn_main: {
    font: '18px "Gordita"',
    height: 50,
    lineHeight: '50px',
    padding: '0 24px',
    width: '100%',
    boxSizing: 'border-box',
    marginTop: 40,
    background: '#f9f9f9',
    color: '#1C3F7A',
    textDecoration: 'none',
    borderRadius: 3,
    border: 'none',
    letterSpacing: '.5px',
    transition: 'background .15s, color .15s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      background: '#f9f9f9',
    },
    '& svg': {
      width: 'auto',
      margin: '0 auto',
    },
    '@media(max-width: 576px) and (device-width: 320px)': {
      fontSize: 14,
    },
  },
  lottie: {
    width: 300,
    margin: '0 auto',
    marginTop: 30,
    marginBottom: 20,
    display: 'block',
  },
});
