import { LightenDarkenColor } from 'lighten-darken-color';

const HEIGHT = 197;

export const styles = theme => ({
  input: {
    [theme.breakpoints.between('xs', 'sm')]: {
      paddingLeft: 2,
      width: 30,
      fontSize: 12,
    },
    [theme.breakpoints.only('sm')]: {
      width: 50,
      paddingLeft: 2,
    },
    borderRadius: 6,
    position: 'relative',
    background: 'white',
    width: '100%',
    height: 25,
    ontSize: 14,
    paddingLeft: 6,
    borderColor: '#cccccc',
    borderStyle: 'solid',
    borderWidth: 1,

    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&.Mui-focused': {
      borderColor: '#6399cb !important',
      boxShadow: 'inset 0 0 0 1px #6399cb',
      '-webkit-box-shadow': 'inset 0 0 0 1px #6399cb',
      'z-index': 1,
    },
  },
  root: {
    minWidth: 235,
    height: HEIGHT,
    margin: 0,
    padding: 0,
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
  },
  dropdown: {
    zIndex: 10000,
    position: 'absolute',
    width: 235,
    border: '1px solid #212121',
    borderRadius: 2,
    background: 'white',
  },
  positive: {
    background: '#E5EEDD',

    '&.MuiGrid-grid-xs-1': {
      flexGrow: 0,
      maxWidth: '14%',
      flexBasis: '14%',
    },
  },
  negative: {
    background: '#F9E6D9',
    '&.MuiGrid-grid-xs-1': {
      flexGrow: 0,
      maxWidth: '14%',
      flexBasis: '14%',
    },
  },
  zero: {
    '&.MuiGrid-grid-xs-1': {
      flexGrow: 0,
      maxWidth: '16%',
      flexBasis: '16%',
    },
  },
  number: {
    textAlign: 'center',
    padding: `${theme.spacing(0.25)}px 0px`,
    outline: 'none !important',
    fontSize: 14,
    cursor: 'pointer',

    '&.positive': {
      '&:hover': {
        background: LightenDarkenColor('#E5EEDD', 15),
      },
    },
    '&.negative': {
      '&:hover': {
        background: LightenDarkenColor('#F9E6D9', 15),
      },
    },
  },
  active: {
    background: '#77D3FB',
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 18,

    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 10,
    },
  },
  scientific_notation_input_field: {
    background: 'white',
    borderRadius: 4,
    '& .MuiOutlinedInput-root': {
      height: theme.spacing(3.25),
      '&:hover fieldset': {
        borderColor: '#CCCCCC',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6399cb',
      },
    },
  },
  textfield_input: {
    padding: '9px 5px 6px',
    fontSize: 12,
  },
  incorrect_sn_view: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  incorrect_sn_view_button: {
    alignSelf: 'flex-end',
  },
});
