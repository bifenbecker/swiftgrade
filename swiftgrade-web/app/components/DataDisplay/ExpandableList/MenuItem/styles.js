import { makeStyles } from '@material-ui/core/styles';
import { FONT_SIZE_TEXT } from '../config';

export const useStyles = makeStyles({
  titleContainer: {
    fontSize: FONT_SIZE_TEXT,
    fontWeight: '400',
  },

  itemWrapper: {
    width: '70%',
    margin: '0 auto',
  },
});
