export const styles = () => ({
  wrapper_component: {
    padding: 0,
    margin: 0,
    maxHeight: '100vh',
    overflowY: 'auto',
  },
  component: {
    '@media only screen and (min-width: 1024px)': {
      padding: '0 0 50px',
    },
  },
  component_inner: {
    width: '100%',
    margin: '6px auto 0',
    textAlign: 'center',
    minHeight: 'calc(100vh - 122px)',
    paddingBottom: 50,
    '@media only screen and (max-width: 1366px)': {
      width: 630,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 70px)',
    },
    '@media only screen and (max-width: 1024px)': {
      width: 500,
      paddingTop: 20,
      marginTop: 0,
    },
    '@media (max-width: 577px)': {
      width: '95%',
      paddingTop: 10,
    },
    '& h2': {
      fontSize: 48,
      fontWeight: 400,
      color: '#151b26',
      margin: '9px 0 5px',
      fontFamily: 'Gordita Regular',
      lineHeight: 'normal',
      '@media only screen and (min-width:1024px) and (max-width: 1366px)': {
        fontSize: 50,
        marginTop: 5,
      },
      '@media (max-width: 1024px)': {
        fontSize: 40,
        margin: '15px 0',
      },
      '@media (max-width: 577px)': {
        fontSize: 35,
      },
    },
  },
  novalid_icon: {
    '& svg': {
      width: 250,
      height: 'auto',
      '@media only screen and (min-width:1024px) and (max-width: 1366px)': {
        width: 280,
      },
      '@media (max-width: 577px)': {
        width: 160,
      },
    },
  },
});
