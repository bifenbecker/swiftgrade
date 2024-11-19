import { LightenDarkenColor } from 'lighten-darken-color';

export const styles = theme => ({
  root: {
    width: '100%',
  },
  item: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    boxShadow: '0 0 2px 2px #cccaca',
    color: 'black',
    background: '#f6f6f6',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    outline: 'none !important',
    userSelect: 'none',

    [theme.breakpoints.down('md')]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },

    '&:hover': {
      backgroundColor: LightenDarkenColor('#f6f6f6', 10),
    },

    '&.active': {
      color: 'white',
      backgroundColor: '#589c4f',
    },

    '&.disabled': {
      opacity: 0.7,
      pointerEvents: 'none',
    },
  },
});
