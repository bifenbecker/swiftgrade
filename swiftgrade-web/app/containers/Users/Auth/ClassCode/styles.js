export const styles = () => ({
  class_code_title: {
    fontSize: 40,
    lineHeight: 1.5,
    fontFamily: 'Gordita Regular',
    color: '#151b26',
    margin: '20px 0',
    '@media(min-width:577px) and (max-width:1024px)': {
      margin: '20px 0',
    },
    '@media(max-width:577px)': {
      fontSize: 30,
    },
  },
  class_code_wrapper: {
    textAlign: 'center',
    background: '#fff',
    width: 480,
    display: 'inline-block',
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translateX(-50%)',
    '@media(min-width:577px) and (max-width:1024px)': {
      paddingTop: 20,
      flexDirection: 'column',
      justifyContent: 'center',
      // top: '30%',
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
  no_code_title: {
    color: '#9ca6af',
    fontFamily: 'Gordita Regular',
    fontSize: 14,
    margin: '15px 0px',
  },
});
