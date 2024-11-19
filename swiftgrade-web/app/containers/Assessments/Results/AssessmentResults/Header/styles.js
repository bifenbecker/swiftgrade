export const styles = theme => ({
  button_wrap_for_table: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 100,
    marginTop: 15,
  },
  icon_open_close_table: {
    cursor: 'pointer',
    marginRight: 30,
  },
  results_header: {
    height: theme.spacing(5),
    width: '100%',
    marginBottom: 20,

    '@media (max-width: 600px)': {
      maxWidth: '99vw',
    },
  },
  results_items_container: {
    maxWidth: 'max-content',
    flexGrow: 1,
  },
  results_saving_status_wrapper: {
    marginTop: 10,
    marginRight: 12,
  },
});
