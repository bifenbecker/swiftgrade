export const styles = () => ({
  signin_or: {
    position: 'relative',
    color: '#9ca6af',
    paddingBottom: 20,
    paddingTop: 20,
    fontFamily: 'Gordita Thin',
    width: '70%',
    margin: '0 auto',
    '&:before, &:after': {
      position: 'absolute',
      borderTop: '1px solid #d5dce0',
      content: '""',
      height: 1,
      left: 0,
      top: '50%',
      width: '35%',
      zIndex: 0,
    },
    '&:before': {
      left: 'auto',
      right: 0,
    },
    '& span': {
      fontFamily: 'Gordita Regular',
      fontSize: 18,
    },
  },
  auth_buttons: {
    display: 'flex',
    width: '90%',
    margin: 'auto',
    justifyContent: 'space-between',
    '@media (max-width: 577px)': {
      display: 'block',
    },
  },
});
