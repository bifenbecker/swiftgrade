import { LightenDarkenColor } from 'lighten-darken-color';
import { COLORS } from 'globalConstants';
import { has } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  default: props => {
    const backgroundColor = has(COLORS, props.backgroundColor)
      ? COLORS[props.backgroundColor][400]
      : props.backgroundColor;
    const color = has(COLORS, props.color) ? COLORS[props.color][50] : props.color;

    return {
      backgroundColor,
      borderColor: LightenDarkenColor(backgroundColor, -10),
      borderRadius: has(props, 'borderRadius') ? props.borderRadius : 0,
      color,
      fontSize: 14,
      padding: '6px 20px',
      textTransform: 'none',

      '&:hover': {
        backgroundColor: LightenDarkenColor(backgroundColor, 15),
        borderColor: LightenDarkenColor(backgroundColor, 5),
        boxShadow: 'none',
      },
      '&:disabled': {
        backgroundColor: LightenDarkenColor(backgroundColor, 40),
        borderColor: LightenDarkenColor(backgroundColor, 40),
        color,
        boxShadow: 'none',
      },
    };
  },
});
