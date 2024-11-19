import { COLORS } from 'globalConstants';
import { LightenDarkenColor } from 'lighten-darken-color';

export const styles = theme => ({
  select_icon_wrapper: {
    cursor: 'pointer',
    outline: 'none !important',

    '&.disabled': {
      cursor: 'url(/block.png) 18 18, auto',
    },
  },
  select_icon: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    borderRadius: '50%',
    position: 'relative',
  },
  select_icon_content: {
    bottom: 0,
    height: theme.spacing(2.4),
    left: 0,
    margin: 'auto',
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    top: 0,
    width: theme.spacing(2.4),
  },
  icon: {
    borderRadius: '50%',

    '&.select': {
      width: theme.spacing(5),
      height: theme.spacing(5),
      padding: 6,
    },

    '&.action': {
      width: theme.spacing(6),
      height: theme.spacing(6),
      padding: '6px 0px',
    },

    '&:hover': {
      backgroundColor: LightenDarkenColor(COLORS.grey[400], 40),
    },
    '&.disabled': {
      pointerEvents: 'none',
    },
  },
});
