export const styles = theme => ({
  remark_results_modal_text: {
    whiteSpace: 'pre-wrap',
    fontSize: 14,
  },
  remark_results_modal_buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: theme.spacing(6),
  },
  btns: {
    background: 'none',
    boxShadow: 'none',
    color: '#6e6ee7',
    textTransform: 'none',
    transition: 'all .3s',
    '&:hover': {
      background: 'none',
      boxShadow: 'none',
      opacity: 0.7,
    },
  },
});
