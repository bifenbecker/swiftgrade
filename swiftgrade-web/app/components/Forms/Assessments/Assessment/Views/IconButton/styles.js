import { COLORS } from 'globalConstants';
import { has, isNull } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  default: props => {
    const defaultHoverStyle = {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      borderRadius: 0,
      padding: 0,
      margin: 0,
    };
    const hover = has(props, 'hoverStyle') && !isNull(props.hoverStyle) ? props.hoverStyle : defaultHoverStyle;
    return {
      [theme.breakpoints.down('xs')]: {
        margin: 'auto',
      },
      backgroundColor: 'transparent',
      color: COLORS[props.color][900],
      fontSize: 14,
      borderRadius: 0,
      padding: 0,
      margin: 0,

      '&:hover': hover,
    };
  },
}));
