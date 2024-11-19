export const styles = () => ({
  checklist: {
    position: 'absolute',
    bottom: '80px',
    right: '30px',
    background: '#fff',
    borderRadius: '3px',
    boxShadow: '0 0 8px rgb(0 0 0 / 15%)',
    zIndex: 10000,
    padding: '20px',
    width: 340,
  },
  checklist_body: {},
  checklist_button: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    zIndex: 1,
  },
  checklist_body_title: {
    textAlign: 'center',
    color: '#848484',
    padding: '8px 3.25rem',
  },
  checklist_header: {
    paddingBottom: '10px',
    width: '100%',
    alignItems: 'flex-end',
    display: 'inline-flex',
  },
  dismiss_checklist: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    margin: '4px 20px 4px 0',
  },
  dismiss_buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    padding: '4px 16px',
  },
  dismiss_checklist_text: {
    fontStyle: 'italic',
    fontSize: '0.875rem',
    color: 'rgba(0, 0, 0, 0.4)',
    cursor: 'pointer',
    '&:hover': {
      color: '#0F3AE8',
    },
  },
  dismiss_it_button: {
    '&:hover': {
      backgroundColor: '#5e5e5e',
    },
    textTransform: 'initial',
    backgroundColor: '#848484',
    padding: '5px 10px',
    minWidth: 'calc(50% - 8px)',
    margin: '4px',
  },
  header_text: {
    fontWeight: 600,
    '&.isPassed': {
      color: '#00D260',
      textAlign: 'center',
      width: '100%',
    },
  },
  expand_more_icon: {
    cursor: 'pointer',
    position: 'absolute',
    right: '1.25rem',
  },
  keep_it_button: {
    textTransform: 'initial',
    '&:hover': {
      border: '2px solid black',
    },
    border: '2px solid #848484',
    color: '#848484',
    padding: '5px 10px',
    minWidth: 'calc(50% - 8px)',
    margin: '4px',
  },
  checklist_dismiss_container: {
    padding: '25px 0 44px',
  },
  congratulations_body_text: {
    padding: '10px 0 0',
    fontSize: 14,
    textAlign: 'center',
  },
});
