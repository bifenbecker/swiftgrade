export const styles = () => ({
  finish_btn_container: {
    float: 'right',
    paddingTop: 16,
    textAlign: 'end',
  },
  finish_btn: {
    borderRadius: 4,
    color: '#3367d6',
    fontSize: 16,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: 'max-content',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },

    '&.Mui-disabled': {
      backgroundColor: 'transparent',
    },
    '&.MuiButton-root:hover': {
      textDecoration: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
});
