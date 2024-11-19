export const styles = theme => ({
  loading: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  create_button: {
    marginBottom: theme.spacing(3),
  },
  name_column: {
    [theme.breakpoints.only('xs')]: {
      padding: '16px 2px 16px 2px',
    },
    padding: '16px 16px 16px 0px',
  },
  processing: {
    fontSize: 14,
  },
  processing_time_msg: {
    fontSize: 11,
  },
});
