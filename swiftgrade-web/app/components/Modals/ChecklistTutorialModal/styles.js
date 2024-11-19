export const styles = theme => ({
  header_wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon_congratulations: {
    fontSize: '5rem',
    marginBottom: 20,
  },
  checklist_modal_wrapper: {
    padding: 3,
  },
  button_wrapper: {
    width: 170,
    textTransform: 'none',
    background: '#0F3AE8',
    '&.isPassed': {
      background: 'rgba(82, 200, 91, 1)',
    },
  },
  footer_title_wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  arrow_icon: {
    paddingTop: 4,
  },
  header_title: {
    padding: '15px 0 0',
    '&.isPassed': {
      color: 'rgba(82, 200, 91, 1)',
    },
  },
  checklist_body: {
    [theme.breakpoints.down('sm')]: {
      maxHeight: '500px !important',
    },
  },
  button_container: {
    width: '100%',
    padding: '30px 0 10px',
    textAlign: 'end',
  },
  footer: {
    display: 'block',
  },
});
