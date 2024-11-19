export const styles = () => ({
  loading: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper_component: {
    padding: 0,
    margin: 0,
    maxHeight: '100vh',
    overflowY: 'auto',
  },
  your_name: {
    width: '100%',
    padding: '65px 0 60px',
    '@media(min-width: 576px) and (max-width:1024px)': {
      width: '100%',
      padding: '30px 0 60px',
    },
    '@media(max-width: 576px)': {
      padding: '30px 0 60px',
    },
  },
  your_name_inner: {
    maxWidth: 500,
    width: '90%',
    margin: '0 auto',
    marginTop: 0,
    textAlign: 'center',
    minHeight: 'calc(100vh - 122px)',
    '& svg': {
      width: 130,
      height: 'auto',
      margin: '0 auto',
      display: 'block',
    },
  },
});
