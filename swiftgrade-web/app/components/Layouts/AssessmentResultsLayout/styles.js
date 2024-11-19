export const styles = () => ({
  header: {
    width: '100%',
    height: 'auto',
    color: 'white',

    '&.iOS': {
      height: 'auto',
    },
  },
  header_container: {
    '&.MuiGrid-container': {
      width: '98%',
      display: 'flex',
      flexWrap: 'wrap',
      boxSizing: 'borderBox',
      height: '100%',
      margin: 'auto',
    },
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
