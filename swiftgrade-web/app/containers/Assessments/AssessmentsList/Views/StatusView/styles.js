import { COLORS } from 'globalConstants';
import { LightenDarkenColor } from 'lighten-darken-color';

export const styles = theme => ({
  icon_wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    margin: 'auto',
    width: 50,
    '&.disabled': {
      cursor: 'default',
    },
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
      opacity: '60%',
    },
  },
  icon_text: {
    display: 'grid',
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontSize: 12,
    marginTop: -4,
    '&.button_text': {
      cursor: 'pointer',
      margin: 'auto',
      marginTop: -4,
      width: 80,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  pulse: {
    borderRadius: '50%',
    animation: 'pulse 1.7s infinite',
    '&:hover': {
      animation: 'none',
    },
  },
  assigned_icon: {
    marginTop: -7,
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  completed_unassigned_icon: {
    marginTop: -7,
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  ready_for_generation_icon: {
    marginTop: 2,
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  ready_for_download_icon: {
    marginTop: 2,
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  scanned_icon: {
    marginTop: -7,
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  scanning_icon: {
    marginTop: -7,
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  ready_to_start_icon: {
    transform: 'rotate(45deg)',
  },
});
