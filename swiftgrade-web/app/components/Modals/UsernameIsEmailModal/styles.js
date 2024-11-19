export const styles = () => ({
  buttons_wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  transparent_modal_button: {
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
  },
});
