export const styles = () => ({
  login_popup_overlay: {
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    transition: 'all .10s ease-in',
  },
  login_popup_content: {
    position: 'relative',
    padding: '40px 100px 50px',
    background: '#F6F8F9',
    borderRadius: 4,
    width: 700,
    textAlign: 'center',
    zIndex: 999,
    '@media(max-width: 576px)': {
      padding: '25px 25px 40px',
      width: '90%',
    },
    '@media(min-width:557px) and (max-width:1024px)': {
      padding: '25px 50px 40px',
      width: 600,
    },
    '@media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)': {
      padding: '25px 18px 40px',
      height: '95%',
    },
    '@media(max-width:319px)': {
      padding: '25px 18px 40px',
      width: '93%',
    },
    '& h3': {
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
  close: {
    position: 'absolute',
    top: 40,
    right: 40,
    width: 'auto',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: 3,
    border: 'none',
    cursor: 'pointer',
    zIndex: 999,
    '@media(max-width: 576px)': {
      top: 30,
      right: 30,
    },
    '& svg': {
      width: 25,
      height: 25,
      fill: '#b7bfc6',
      opacity: '.6',
      transition: 'opacity .15s ease-in-out',
      '&:hover': {
        fill: '#b7bfc6',
        opacity: 1,
      },
      '@media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)': {
        width: 20,
      },
    },
  },
  login_modal_header: {
    position: 'relative',
  },
  modal_inner_content: {
    '@media(max-width: 576px)': {
      padding: '15px 0px 0px',
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
});
