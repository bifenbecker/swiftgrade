export const styles = theme => ({
  fib_text_field: {
    background: 'white',
    width: '100%',
    borderRadius: theme.spacing(0.5),
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#CCCCCC',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6399cb',
      },
    },
  },
  fib_root: {
    maxHeight: 38,
    width: '100%',
  },
  fib_input: {
    padding: `${theme.spacing(1.25)}px ${theme.spacing(1.125)}px`,
    [theme.breakpoints.only('xs')]: {
      fontSize: 12,
      '@media (max-width: 355px) and (orientation: portrait)': {
        fontSize: 10,
      },
    },
  },
});
