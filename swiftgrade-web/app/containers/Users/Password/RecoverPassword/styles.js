export const styles = () => ({
  wrapper_component: {
    padding: 0,
    margin: 0,
    maxHeight: '100vh',
    overflowY: 'auto',
  },
  forgot_password: {
    width: '100%',
    padding: '65px 0 60px',
    '@media(min-width: 576px) and (max-width:1024px)': {
      width: '100%',
      padding: '0px 0 60px',
    },
    '@media(max-width: 576px)': {
      padding: '30px 0 60px',
    },
  },
  forgot_password_inner: {
    width: 550,
    margin: '0 auto',
    marginTop: 0,
    textAlign: 'center',
    minHeight: 'calc(100vh - 122px)',
    '@media(min-width: 576px) and (max-width:1024px)': {
      width: 500,
      paddingTop: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    '@media(max-width: 576px)': {
      width: '85%',
      paddingTop: 10,
      marginTop: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    '& svg': {
      width: 300,
      margin: '0 auto',
      display: 'block',
      '@media(min-width: 576px) and (max-width:1024px)': {
        width: 280,
      },
      '@media(max-width: 576px)': {
        width: 250,
      },
      '@media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)': {
        width: 230,
      },
    },
    '& h3': {
      font: '50px Gordita regular',
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
  },
  btn_main: {
    font: '18px "Gordita"',
    height: 50,
    lineHeight: '50px',
    padding: '0 24px',
    width: '100%',
    boxSizing: 'border-box',
    marginTop: 0,
    background: '#796eff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: 3,
    border: 'none',
    letterSpacing: '.5px',
    transition: 'background .15s, color .15s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      background: '#635ac7',
      borderBottom: 'none',
      color: '#fff',
      textDecoration: 'none',
    },
  },
  input_field: {
    background: '#fff',
    border: '2px solid #e0e6e8',
    font: '20px "Gordita Regular"',
    color: '#6d7881',
    borderRadius: 3,
    height: 50,
    margin: '15px 0',
    padding: '0 0 0 20px',
    transition: 'border .15s',
    width: '100%',
    boxSizing: 'border-box',
    lineHeight: '50px',
    '& input': {},
  },
});
