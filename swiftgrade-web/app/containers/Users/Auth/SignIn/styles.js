export const styles = () => ({
  login_content: {
    padding: '40px 100px 50px',
    borderRadius: 4,
    width: 700,
    textAlign: 'center',
    margin: 'auto',
    '@media(max-width: 576px)': {
      padding: '65px 25px 40px',
      width: '90%',
    },
    '@media(min-width:557px) and (max-width:1024px)': {
      padding: '25px 50px 40px',
      width: 600,
    },
    '@media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)': {
      padding: '65px 18px 40px',
      height: '95%',
    },
    '@media(max-width:319px)': {
      padding: '65px 18px 40px',
      width: '93%',
    },
    '& h1': {
      fontSize: 50,
      fontWeight: 400,
      fontFamily: 'Gordita Regular',
      color: '#151b26',
      margin: '15px 0 25px',
      '@media(max-width: 576px)': {
        fontSize: 35,
      },
      '@media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)': {
        fontSize: 30,
        margin: '10px 0 10px',
      },
    },
  },
  login_header: {
    position: 'relative',
  },
  inner_content: {
    '@media(max-width: 576px)': {
      padding: '15px 0px 0px',
      '@media(max-height: 615px) and (orientation: portrait)': {
        paddingTop: 0,
      },
    },
  },
  login_footer_links: {
    margin: '50px 0 0',
    '@media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)': {
      margin: '30px 0 0',
    },
  },
  forgot_password: {
    '& a': {
      color: '#9ca6af',
      cursor: 'pointer',
      fontWeight: 500,
      textDecoration: 'none',
      transition: 'color .3s',
      font: '17px "Gordita"',
      '&:hover': {
        borderBottom: '2px solid #9ca6af',
      },
      '@media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)': {
        fontSize: 16,
      },
    },
  },
  login_signup: {
    color: '#9ca6af',
    cursor: 'pointer',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'color .3s',
    font: '17px "Gordita Regular"',
    marginTop: 10,
    '@media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)': {
      marginTop: 15,
      fontSize: 16,
    },
    '& a': {
      color: '#796eff',
      transition: 'color .3s',
      marginLeft: 1,
      fontFamily: 'Gordita',
      textDecoration: 'none',
      '&:hover': {
        borderBottom: '2px solid #635ac7',
        color: '#635ac7',
      },
    },
  },
  content_container: {
    width: '100%',
    top: 0,
    '&.isMobile': {
      display: 'flex',
      height: '100%',
      '@media (min-width: 600px)': {
        height: 'calc(100% - 99px)',
      },
    },
  },
  sign_in_container: {
    height: '100vh',
    overflow: 'auto',
  },
  loading_progress: {
    color: '#9ab7f5',
    width: '70px !important',
    height: '70px !important',
  },
  mobile_loading_progress: {
    color: '#9ab7f5',
    width: 40,
    height: 40,
  },
  loading_progress_wrapper: {
    marginTop: 30,
  },
  loading_progress_container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    marginTop: -100,
  },
});
