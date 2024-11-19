import { InputBase } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';

export const CustomSelectInput = withStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: 'white',
      fontSize: 14,
      padding: '8px 12px 10px',
      borderColor: 1,
      cursor: 'pointer',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      textAlign: 'left',
      '&:focus': {
        borderRadius: 4,
        boxShadow: 'none',
        backgroundColor: 'white',
      },
      '&::placeholder': {
        color: '#00000',
        opacity: 1,
      },
      '&:disabled': {
        cursor: 'url(/block.png) 18 18, auto',
      },
      '&::selection': {
        background: 'transparent',
      },
      '@media(max-width: 1024px)': {
        paddingRight: '20px',
      },
      '@media(max-width: 450px)': {
        fontSize: 12,
        paddingRight: '18px',
      },
      '@media(max-width: 355px)': {
        fontSize: 10,
        paddingRight: '10px',
        paddingLeft: 5,
      },
    },
  }),
)(InputBase);

export const styles = () => ({
  paper: {
    margin: '0px 2px',
  },
  paper_with_max_width: {
    margin: '0px 2px',
    width: 'max-content',
  },
  paper_with_expended_width: {
    margin: '0px 2px',
    width: '64px',
  },
  add_row_option: {
    padding: 2,
    textAlign: 'center',
    width: '100%',

    '&.active': {
      backgroundColor: '#64b5f6',
    },
  },
  icon_wrapper: {
    position: 'absolute',
    right: 2,
    cursor: 'pointer',
    '& svg:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
    },
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  answer_sheet_preview_option: {
    margin: 'auto',
  },
  marks_option_with_scroll: {
    height: 18,
  },
  marks_narrow_option: {
    marginLeft: -1,
    marginRight: -1,
  },
});
