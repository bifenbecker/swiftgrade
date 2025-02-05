export const styles = () => ({
  apple_action: {
    position: 'relative',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, .2)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    width: '48%',
    borderRadius: 3,
    cursor: 'pointer',
    margin: '15px auto 0',
    transition: 'box-shadow .15s',
    marginLeft: 0,
    '@media (max-width: 577px)': {
      width: '100%',
      padding: '0 24px',
    },
    '& svg': {
      color: '#151b26',
      position: 'absolute',
      width: 19,
      height: '100%',
      left: 12,
      bottom: 2,
      '@media (max-width: 577px)': {
        left: 15,
      },
    },
    '&:hover': {
      boxShadow: '0px 5px 10px rgba(0, 0, 0, .2)',
    },
  },
  apple_action_text: {
    fontFamily: 'Gordita',
    fontSize: 16,
    height: 45,
    lineHeight: '45px',
    color: '#9ca6af',
    position: 'relative',
    textTransform: 'capitalize',
    letterSpacing: '.5px',
    textDecoration: 'none',
    margin: 0,
    textAlign: 'end',
    padding: '2px 20px 0 0',
    width: '100%',
    '@media (max-width: 1024px)': {
      fontSize: 16,
    },
    '@media (max-width: 577px)': {
      textAlign: 'center',
      paddingRight: 0,
    },
  },
});
