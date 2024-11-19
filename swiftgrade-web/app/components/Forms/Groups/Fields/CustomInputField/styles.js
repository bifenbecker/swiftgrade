export const styles = theme => ({
  field: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 2,
    marginBottom: 22,
    position: 'relative',
    [theme.breakpoints.only('xs')]: {
      marginBottom: 35,
    },
  },
  mobile_field: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginBottom: 55,
    position: 'relative',
  },
  tooltip: {
    borderRadius: '4px',
    fontSize: 11,
    fontWeight: 300,
    textAlign: 'center',
  },
  arrow: {
    color: 'rgba(80, 80, 80, 0.98)',
  },
});
