export const styles = () => ({
  wrapper_component: {
    padding: 0,
    margin: 0,
    maxHeight: '100vh',
    overflowY: 'auto',
  },
  reset_password: {
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
  reset_password_inner: {
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
    '& h3': {
      font: '50px Gordita regular',
      color: '#151b26',
      margin: '15px 0 10px',
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
  reset_main_icon: {
    width: 130,
    height: 'auto',
    margin: '0 auto',
    display: 'block',
  },
  loading: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
