export const styles = () => ({
  loading: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containers: {
    padding: '0 0 100px',
    paddingBottom: 0,
  },
  main_contsinrs: {
    padding: 0,
    margin: 0,
  },
  left_content: {
    width: '80%',
    float: 'left',
    '@media (max-width: 520px)': {
      width: '85%',
    },
    height: '100vh',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
  left_main: {
    marginBottom: 48,
    padding: '20px 100px 0',
    position: 'relative',
    width: 500,
    boxSizing: 'content-box',
    '@media (max-width: 1024px)': {
      padding: '80px 25px 0',
    },
    '@media (max-width: 810px)': {
      padding: '20px 25px 0',
      width: 'auto',
      paddingRight: 0,
    },
    '@media (max-width: 768px)': {
      padding: '80px 25px 0',
    },
    '@media (max-width: 520px)': {
      padding: '20px 0 0 25px',
    },
  },
  h2div: {
    marginBottom: 20,
  },
  welcome_title: {
    font: '34px/40px "Gordita Regular"',
    color: '#273240',
    margin: 0,
    '@media (max-width: 810px)': {
      fontSize: 29,
    },
    '@media (max-width: 430px)': {
      lineHeight: '29px',
    },
    '@media (max-width: 400px)': {
      fontSize: 25,
    },
    '@media (max-width: 370px)': {
      fontSize: 22,
    },
    '@media (max-width: 320px)': {
      fontSize: 19,
    },
  },
  div_descrip: {
    marginTop: 7,
    '& p': {
      margin: 0,
    },
    '& span': {
      font: '18px/0 "Gordita Regular"',
      color: '#6f7782',
      letterSpacing: -0.25,
      marginTop: 16,
      '@media (max-width: 500px)': {
        fontSize: 17,
        lineHeight: '20px',
      },
      '@media (max-width: 430px)': {
        fontSize: 16,
        marginTop: 10,
      },
    },
  },
  lines: {
    width: '100%',
    borderBottom: '1px solid #dedede',
    height: 2,
    marginTop: 18,
    '@media (max-width: 520px)': {
      width: '95%',
    },
  },
  right_banners: {
    float: 'right',
    width: '20%',
    backgroundColor: 'rgb(162,101,162)',
    backgroundImage:
      'linear-gradient(180deg, rgba(162,101,162,1) 0%, rgba(157,100,157,1) 1%, rgba(223,138,213,1) 20%, rgba(244,152,200,1) 66%, rgba(243,157,120,1) 100%, rgba(208,128,200,1) 100%)',
    position: 'fixed',
    right: 0,
    height: '100%',
    '@media (max-width: 520px)': {
      width: '15%',
    },
  },
});
