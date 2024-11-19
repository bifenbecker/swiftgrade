export const styles = theme => ({
  calculator: {
    backgroundColor: '#EDEDED',
    width: '70%',
    minWidth: '620px',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'fixed',
    bottom: 0,
    zIndex: 10000,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px 8px 0 0',
    left: '0',
    right: '0',
    '&.mf': {
      minWidth: 700,
    },
  },
  mobile_calculator: {
    backgroundColor: '#e0e0e0',
    bottom: 0,
    display: 'flex',
    position: 'fixed',
    width: '100%',
    fontSize: 11,
    zIndex: 10000,
  },
  unit_calculator: {
    backgroundColor: '#EDEDED',
    width: '36%',
    height: 77,
    position: 'fixed',
    bottom: 0,
    zIndex: 10000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px 8px 0 0',
    left: '32%',

    [theme.breakpoints.down('sm')]: {
      position: 'initial',
      width: '100%',
      left: 'auto',
      height: 30,
      fontSize: 12,
      borderRadius: 0,
      backgroundColor: 'inherit',
    },
  },
  calculator_container: {
    width: '100%',
  },
  option: {
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    border: '1px solid #D8D8D8',
    borderRadius: 2,
    color: '#555555',
    display: 'flex',
    height: theme.spacing(4),
    justifyContent: 'center',
    margin: theme.spacing(0.2),
    padding: `${theme.spacing(1)}px ${theme.spacing(0)}px`,
    outline: 'none !important',
    fontFamily: 'inherit',

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
      margin: theme.spacing(0.1),
      height: theme.spacing(3),
      width: '18%',
    },

    '&.number': {
      background: '#CACACA',
    },
    '&.move': {
      background: '#CACACA',
      color: '#049EE1',
    },
    '&.unit': {
      padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,

      [theme.breakpoints.down('sm')]: {
        padding: `${theme.spacing(1)}px ${theme.spacing(0.8)}px`,
      },
    },
    '&:hover': {
      backgroundColor: '#F5F5FB',
      border: '1px solid #D8D8D8',
      cursor: 'pointer',
    },
  },
});
