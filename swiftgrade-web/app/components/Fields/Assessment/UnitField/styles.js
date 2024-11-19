export const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    background: 'white',
    width: 73,
    minHeight: 32,
    padding: '0px 2px',
    borderColor: '#cccccc',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    // height: 32,

    '&.focus': {
      borderColor: '#6399cb !important',
      boxShadow: 'inset 0 0 0 1px #6399cb',
      '-webkit-box-shadow': 'inset 0 0 0 1px #6399cb',
      'z-index': 1,
      // height: 32,
    },
    '&.disabled': {
      pointerEvents: 'none',
      opacity: 1,
      color: '#aaaaaa',
    },
    [theme.breakpoints.only('xs')]: {
      width: '52px',
      // height: 28,
      minHeight: 28,
    },
  },
  input: {
    position: 'relative',
    display: 'flex',
    width: '100%',
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
});
