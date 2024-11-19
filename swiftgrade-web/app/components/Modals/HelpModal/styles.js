import { has } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { FONT_SIZE_TEXT } from './config';

export const useStyles = makeStyles({
  modal_option: props => {
    const color = has(props, 'color') && props.color ? props.color : '#000';

    return {
      fontSize: FONT_SIZE_TEXT,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0px 18px 2px',
      cursor: 'pointer',
      '&:hover': {
        color,
      },
    };
  },
  movies_icon: { fontSize: 26, transition: 'all .3s' },
  help_modal_body_icon_wrapper: {
    marginRight: 20,
  },
  help_modal_title: { fontSize: FONT_SIZE_TEXT },
  help_modal_close_icon_wrapper: {
    position: 'absolute',
    top: 8,
    right: 11,
  },
  help_modal_close_icon: {
    color: '#bfbfc6',
    cursor: 'pointer',
    fontSize: FONT_SIZE_TEXT,
  },
  help_modal_body: { padding: '8px !important' },
});
