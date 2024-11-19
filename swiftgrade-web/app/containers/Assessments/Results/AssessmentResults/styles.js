export const styles = () => ({
  loading: {
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle_icon: {
    '&:hover': {
      backgroundColor: 'rfba(0,0,0, 0.04)',
    },
  },
  table_main_wrapper: {
    width: '99vw',
    overflowX: 'scroll',
  },
  popup_close_icon: {
    position: 'absolute',
    background: 'transparent',
    border: 'none',
    right: 11,
    top: 11,
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
    },
  },
});
