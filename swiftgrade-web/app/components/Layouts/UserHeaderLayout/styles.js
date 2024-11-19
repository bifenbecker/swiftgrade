export const styles = () => ({
  top_navbar: {
    padding: '10px 64px 0',
    transition: 'box-shadow .15s ease-in-out',
    zIndex: 999,
    position: 'relative',
    '@media (max-width: 1024px)': {
      padding: '10px 35px',
      boxShadow: '0 2px 12px 0 rgba(36, 50, 66, .075)',
      height: 80,
      display: 'flex',
    },
    '@media (max-width: 577px)': {
      padding: '10px 20px 5px',
      height: 65,
    },
  },
  logo: {
    fontSize: 24,
    fontFamily: 'Gordita',
    '& a': {
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'flex-end',
    },
    '@media (max-width: 577px)': {
      fontSize: 19,
    },
  },
  logo_text: {
    position: 'relative',
    top: -1,
    left: 1,
    color: '#273347',
  },
  logo_icon: {
    position: 'relative',
    top: -3,

    '& svg': {
      '@media (max-width: 577px)': {
        height: 45,
      },
    },
  },
  main_nav: {
    '@media screen and (max-width: 576px)': {
      position: 'fixed',
      width: '100%',
      background: '#fff',
      boxShadow: '0 0 10px 4px rgba(56, 55, 67, 0.08)',
      zIndex: 2,
    },
  },
  container: {
    margin: '0 auto',
    maxWidth: 1440,
    width: 'calc(100% - 110px)',
    lineHeight: 'inherit',
    display: 'flex',
    alignItems: 'baseline',
    paddingTop: 21,
    paddingBottom: 21,
    justifyContent: 'space-between',
    '@media screen and (max-width: 992px)': {
      width: 'calc(100% - 60px)',
    },
    '@media screen and (max-width: 576px)': {
      paddingTop: 9,
      paddingBottom: 9,
      alignItems: 'center',
    },
  },
});
