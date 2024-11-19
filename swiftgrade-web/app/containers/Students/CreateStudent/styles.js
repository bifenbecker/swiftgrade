export const styles = () => ({
  wrapper_component: {
    padding: 0,
    margin: 0,
    maxHeight: '100vh',
    overflowY: 'auto',
  },
  component: {
    padding: '0 0 100px',
  },
  component_inner: {
    width: 530,
    margin: '0 auto',
    textAlign: 'center',
    minHeight: 'calc(100vh - 122px)',
    marginTop: -24,
    '@media only screen and (max-width: 1366px)': {
      width: 630,
      marginTop: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    '@media (max-width: 1024px) and (min-width: 577px)': {
      width: 500,
      paddingTop: 20,
    },
    '@media (max-width: 577px)': {
      width: '85%',
    },
    '& h2': {
      fontSize: 48,
      fontWeight: 400,
      color: '#151b26',
      margin: '8px 0 5px',
      fontFamily: 'Gordita Regular',
      lineHeight: 'normal',
      '@media only screen and (min-width:1024px) and (max-width: 1366px)': {
        fontSize: 50,
      },
      '@media (max-width: 1024px)': {
        fontSize: 40,
        margin: '15px 0',
      },
      '@media (max-width: 577px)': {
        fontSize: 35,
        margin: '5px 0 5px',
      },
    },
    '& svg': {
      width: 200,
      height: 175,
      '@media only screen and (min-width:1024px) and (max-width: 1366px)': {
        width: 250,
        height: 217,
      },
      '@media (max-width: 1024px) and (min-width: 577px)': {
        width: 240,
        height: 'auto',
      },
    },
  },
  terms_text: {
    fontSize: 13,
    fontWeight: 400,
    fontFamily: 'Gordita Regular',
    color: '#646f79',
    marginTop: 5,
    lineHeight: '23px',

    '& a': {
      textDecoration: 'none',
      borderBottom: '1px dotted #848f99',
      color: '#646f79',
      fontWeight: 400,
      textTransform: 'capitalize',
    },
  },
});
