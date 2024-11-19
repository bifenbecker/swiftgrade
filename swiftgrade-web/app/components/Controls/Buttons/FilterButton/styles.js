export const styles = () => ({
  extended: {
    padding: 0,
    paddingLeft: 12,
    background: '#ffffff',
    border: '1px solid #e5e5e5',
    height: 30,
    boxShadow: 'none',
    '&:hover': {
      background: '#e5e5e5',
    },
  },
  label: {
    padding: '2px 6px 0px 0px',
    textTransform: 'capitalize',
    fontSize: 12,
  },
  icon_wrapper: {
    margin: '1px -1px 0px 0px',
    width: 28,
    height: 28,
    borderRadius: '50%',
    position: 'relative',

    '@media not all and (min-resolution:.001dpcm)': {
      '@media': {
        margin: '-1px -1px 0px 0px',
      },
    },
  },
  icon: {
    bottom: 0,
    height: 24,
    left: 0,
    margin: 'auto',
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    top: 0,
    width: 24,
    color: '#ffffff',

    '&.filter': {
      top: 3,
      width: 18,
      height: 18,
    },
  },
  pulse: {
    animation: 'pulse 1.7s infinite',
    '&:hover': {
      animation: 'none',
    },
  },
});
