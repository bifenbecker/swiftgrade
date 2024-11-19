export const styles = () => ({
  root_radio: {
    display: 'none',
  },
  root_label: {
    margin: '20px 0 0px',
  },
  label: {
    fontFamily: 'Gordita',
    lineHeight: '50px',
    padding: '0 24px',
    width: '100%',
    background: '#fff',
    color: '#796eff',
    borderRadius: 4,
    border: '2px solid #796eff',
    cursor: 'pointer',
    fontSize: 18,
    letterSpacing: '.5px',
    height: '54px',
    '@media(max-width:1366px)': {
      fontSize: 16,
    },
    '&:hover': {
      background: '#e2dfff75',
    },
    '&:focus': {
      background: '#796eff',
      color: '#fff',
    },
  },
  checked: {
    '& + $label': {
      background: '#796eff',
      color: '#fff',
      '&:hover': {
        background: '#635ac7',
        border: '2px solid #635ac7',
      },
    },
  },
  create_account_title: {
    fontSize: 40,
    lineHeight: 1.5,
    fontFamily: 'Gordita Regular',
    color: '#151b26',
    margin: '20px 0',
    '@media(min-width:577px) and (max-width:1024px)': {
      margin: '27px 0',
    },
    '@media(max-width:577px)': {
      fontSize: 30,
    },
  },
  create_account: {
    textAlign: 'center',
    background: '#fff',
    width: 480,
    display: 'inline-block',
    position: 'absolute',
    top: '22%',
    left: '50%',
    transform: 'translateX(-50%)',
    '@media(min-width:577px) and (max-width:1024px)': {
      paddingTop: 20,
      flexDirection: 'column',
      justifyContent: 'center',
      top: '30%',
    },
    '@media only screen and (min-width:1024px) and (max-width: 1366px)': {
      marginTop: 0,
      flexDirection: 'column',
      justifyContent: 'center',
      top: '28%',
    },
    '@media(max-width:577px)': {
      width: '85%',
      paddingTop: 10,
      margintop: 0,
      justifyContent: 'center',
      top: '30%',
    },
  },
  icon_create_account: {
    margin: '0 auto',
    display: 'block',
    '@media(min-width:577px) and (max-width:1024px)': {
      width: 250,
      height: 211,
    },
    '@media only screen and (min-width:1024px) and (max-width: 1366px)': {
      width: 240,
      height: 202,
    },
    '@media(max-width:577px)': {
      width: 200,
      height: 168,
    },
    '@media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)': {
      width: 160,
      height: 135,
    },
  },
  type_btn: {
    margin: '20px 0 0px',
    height: 50,
    lineHeight: '50px',
    padding: '0 24px',
    width: '100%',
    background: '#fff',
    color: '#796eff',
    borderRadius: 3,
    border: '2px solid #796eff',
    letterSpacing: '.5px',
    transition: 'background-color .15s, color .15s ease-in-out',
    cursor: 'pointer',
    fontSize: 18,
    fontFamily: 'Gordita',
    '&.teacher': {
      background: '#796eff',
      color: '#fff',
      '&:hover': {
        background: '#635ac7',
        border: '2px solid #635ac7',
      },
      '&:focus': {
        border: '2px solid #796eff',
        background: '#796eff',
        color: '#fff',
      },
    },
    '& span': {
      height: 50,
    },
    '&:hover': {
      background: '#e2dfff75',
      border: '2px solid #796eff',
    },
    '&:focus': {
      background: '#fff',
      color: '#796eff',
    },
    '@media(max-width:1366px)': {
      fontSize: 16,
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
