export const styles = () => ({
  block_input: {
    maxWidth: '350px',
    margin: '0 auto',
    position: 'relative',
    width: '100%',
    marginBottom: 25,
    '& .MuiInputBase-root': {
      width: '100%',
    },
  },
  change_password: {
    maxWidth: 270,
  },
  change_password_btn: {
    maxWidth: 145,
    width: '100%',
    fontSize: 14,
    cursor: 'pointer',
    textDecoration: 'underline',
    color: '#888',
    '&:focus': {
      outline: 'none',
    },
  },
  save_btn: {
    maxWidth: 70,
    height: 36,
    padding: 0,
    width: '100%',
    background: 'rgb(0, 162, 232)',
    color: '#fff',
    border: 'none',
    letterSpacing: '.5px',
    transition: 'background-color .15s, color .15s ease-in-out',
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Segoe UI,Optima,Arial,sans-serif',
    borderRadius: 0,
    '&:hover': {
      background: '#00a2e8',
    },
    '&.disabled': {
      background: 'rgb(191, 236, 255)',
    },
  },
  save: {
    maxWidth: 270,
    margin: '0 auto',
  },
});
