export const styles = () => ({
  root: {
    position: 'relative',
    background: 'white',
    width: '100%',
    height: 38,
    padding: '2px 2px 1px 8px',
    borderColor: '#cccccc',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,

    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&.Mui-focused': {
      borderColor: '#6399cb !important',
      boxShadow: 'inset 0 0 0 1px #6399cb',
      '-webkit-box-shadow': 'inset 0 0 0 1px #6399cb',
      'z-index': 1,
    },
  },
  error: {
    margin: '2px 0px',
    fontSize: 14,
    color: 'red',
    position: 'absolute',
  },
});
