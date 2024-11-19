export const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    background: 'white',
    width: '100%',
    minHeight: 38,
    padding: '0px 2px',
    borderColor: '#cccccc',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,

    '&.focus': {
      borderColor: '#6399cb !important',
      boxShadow: 'inset 0 0 0 1px #6399cb',
      '-webkit-box-shadow': 'inset 0 0 0 1px #6399cb',
      'z-index': 1,
    },
    '&.disabled': {
      pointerEvents: 'none',
      opacity: 1,
      color: '#aaaaaa',
    },
  },
  input: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
  },
  fraction: {
    margin: 'auto',
  },
  error: {
    margin: '2px 0px',
    fontSize: 14,
    color: 'red',
    position: 'absolute',
  },
  sig_figs: {
    paddingLeft: 8,
    paddingBottom: 2,
    marginTop: -2,
    fontSize: 12,
    color: '#4A4A4A',
    display: 'flex',
    fontFamily: 'Noto Sans',
    [theme.breakpoints.only('xs')]: {
      marginTop: 0,
      paddingLeft: 2,
      fontSize: 10,
    },
  },
  significant_figure_value: {
    paddingLeft: 5,
  },
});
