import { COLORS } from 'globalConstants';
import { LightenDarkenColor } from 'lighten-darken-color';

export const styles = theme => ({
  actions_view: {
    position: 'fixed',
    maxWidth: 460,
    width: '90%',
    margin: '1% auto',
    height: theme.spacing(8),
    borderRadius: 10,
    zIndex: 1,
    backgroundColor: '#e4e6ec',
    padding: '0px 20px',
    bottom: 0,
    left: 0,
    right: 0,

    '&.with_custom': {
      maxWidth: 680,
    },

    '&.with_scanning': {
      maxWidth: 755,
    },
    [theme.breakpoints.only('xs')]: {
      '&.with_custom': {
        padding: '0px 4px',
      },

      '&.with_scanning': {
        padding: '0px 4px',
        width: '100%',
      },
      '@media (orientation: portrait)': {
        borderRadius: 0,
        margin: 0,
        width: '100%',
        padding: 0,
      },
    },
  },
  action_items: {
    maxWidth: '100%',
    justifyContent: 'space-around',
    margin: '0px 10px',
    width: 'max-content',
    [theme.breakpoints.only('xs')]: {
      '@media (orientation: portrait)': {
        width: '100%',
        justifyContent: 'space-evenly',
        '@media (max-width: 363px)': {
          width: '62%',
        },
      },
    },
  },
  selected_item: {
    [theme.breakpoints.only('xs')]: {
      fontSize: 14,
      padding: 0,
      margin: 5,
    },

    fontSize: 18,
    padding: '10px 20px',
  },
  selected_item_color: {
    backgroundColor: '#673ab7',

    '&:hover': {
      backgroundColor: '#5e35b1',
    },
  },
  action_view_wrapper: {
    paddingLeft: 40,
    [theme.breakpoints.only('xs')]: {
      fontSize: 12,
      padding: 0,
    },

    cursor: 'pointer',

    '&.disabled': {
      cursor: 'url(/block.png) 18 18, auto',
    },
  },
  action_view: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '&.disabled': {
      pointerEvents: 'none',
      '&.disabled': {
        color: 'rgba(0, 0, 0, 0.38)',
      },
    },
  },
  action_icon_wrapper: {
    [theme.breakpoints.only('xs')]: {
      padding: 4,
    },

    padding: 6,
    borderRadius: '50%',

    '&:hover': {
      backgroundColor: LightenDarkenColor(COLORS.grey[400], 50),
    },
    '&.disabled': {
      cursor: 'url(/block.png) 18 18, auto',
    },
  },
  action_icon: {
    [theme.breakpoints.only('xs')]: {
      width: theme.spacing(2),
      height: theme.spacing(2),
    },

    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  close_icon: {
    [theme.breakpoints.only('xs')]: {
      width: theme.spacing(2),
      height: theme.spacing(2),
    },

    color: 'white',
    '&.MuiChip-deleteIcon:hover': {
      color: 'white',
    },
  },
});
