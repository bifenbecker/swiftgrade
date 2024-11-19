import { LightenDarkenColor } from 'lighten-darken-color';
import { COLORS } from 'globalConstants';
import { has, isNull } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  default: props => {
    const backgroundColor = has(COLORS, props.backgroundColor)
      ? COLORS[props.backgroundColor][400]
      : props.backgroundColor;
    const color = has(COLORS, props.color) ? COLORS[props.color][900] : props.color;

    const defaultHoverStyle = {
      backgroundColor: backgroundColor === 'transparent' ? 'transparent' : LightenDarkenColor(backgroundColor, 50),
      boxShadow: 'none',
    };
    const hover = has(props, 'hoverStyle') && !isNull(props.hoverStyle) ? props.hoverStyle : defaultHoverStyle;
    return {
      [theme.breakpoints.down('xs')]: {
        margin: '0 5px',
      },
      backgroundColor: 'transparent',
      borderRadius: has(props, 'borderRadius') ? props.borderRadius : 0,
      color,
      fontSize: 14,
      margin: '0 10px',
      padding: 5,

      '&:hover': hover,
    };
  },
}));
