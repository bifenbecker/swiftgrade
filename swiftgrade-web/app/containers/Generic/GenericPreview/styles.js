export const styles = theme => ({
  tutorial_modal: {
    display: 'flex',
    flexFlow: 'column',

    '& span': {
      marginBottom: '10px',
    },
  },
  tutorial_modal_title: {
    fontWeight: 'bold',
  },
  tutorial_modal_body: {
    textAlign: 'left',
  },
  page: {
    height: '100vh',
  },
  header: {
    width: '100%',
    height: theme.spacing(10),
    minWidth: 500,
  },
  loading: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
