export const styles = theme => ({
  scientific_notation_number: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scientific_notation_field_wrapper: {
    flexGrow: 0,
    maxWidth: `${theme.spacing(6.25)}px`,
    flexBasis: `${theme.spacing(6.25)}px`,
    [theme.breakpoints.up('xl')]: {
      '&.MuiGrid-grid-xl-1': {
        marginRight: 2,
      },
    },
    [theme.breakpoints.only('lg')]: {
      '&.MuiGrid-grid-lg-1': {
        marginRight: 1,
      },
    },
    [theme.breakpoints.only('sm')]: {
      '&.withSF': {
        marginTop: 10,
      },
    },
    [theme.breakpoints.only('xs')]: {
      '&.mathWithSetting': {
        maxWidth: 40,
        flexBasis: 40,
      },
    },
  },
  answers_field_container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    [theme.breakpoints.between('xs', 'sm')]: {
      '&.mathWithSetting': {
        flexWrap: 'wrap',
      },
    },
  },
  math_with_setting_answer: {
    [theme.breakpoints.only('xs')]: {
      padding: '3px 0',
    },
  },
  unit_field: {
    paddingLeft: 3,
    [theme.breakpoints.up('md')]: {
      '&.MuiGrid-grid-md-2': {
        flexGrow: 0,
        maxWidth: 76,
        flexBasis: '11.3%',
      },
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
    },
    [theme.breakpoints.only('sm')]: {
      '&.MuiGrid-grid-sm-4': {
        maxWidth: '75px',
      },
    },
    [theme.breakpoints.only('xs')]: {
      '&.MuiGrid-grid-xs-4': {
        flexGrow: 0,
        maxWidth: '30%',
        flexBasis: '30%',
        marginRight: '2px',
        '@media (max-width: 370px) and (orientation: portrait)': {
          maxWidth: '36%',
          flexBasis: '36%',
        },
        '@media (max-height: 370px) and (orientation: landscape)': {
          maxWidth: '23%',
          flexBasis: '23%',
        },
      },
    },
  },
  tolerance_field: {
    flexGrow: 0,
    maxWidth: `${theme.spacing(7.5)}px`,
    flexBasis: `${theme.spacing(7.5)}px`,
    [theme.breakpoints.only('xs')]: {
      minWidth: '48px',
      '&.MuiGrid-grid-xs-4': {
        flexGrow: 0,
        maxWidth: '49px',
        flexBasis: '49px',
        marginLeft: 2,
        marginRight: 1,
      },
    },
    [theme.breakpoints.only('sm')]: {
      marginRight: 1,
    },
    [theme.breakpoints.only('md')]: {
      '&.MuiGrid-grid-md-1': {
        flexGrow: 0,
        minWidth: '60px',
        maxWidth: '12%',
        flexBasis: '12%',
        marginLeft: 3,
        marginRight: 2,
      },
    },
  },
  scientific_notation_field: {
    width: theme.spacing(4.625),
    [theme.breakpoints.between('xs', 'sm')]: {
      width: 30,
    },
  },
  scientific_notation_e: {
    fontSize: 14,
    paddingLeft: theme.spacing(0.25),
    width: '21%',

    [theme.breakpoints.only('xs')]: {
      paddingLeft: 0,
    },
    [theme.breakpoints.only('sm')]: {
      width: '31%',
    },
    [theme.breakpoints.only('md')]: {
      paddingLeft: 0,
    },
  },
  include_sig_figs: {
    minHeight: theme.spacing(8),
    [theme.breakpoints.only('xs')]: {
      minHeight: 58,
      marginTop: '-13px',
    },
    [theme.breakpoints.only('sm')]: {
      minHeight: 54,
    },
  },
  mc_answer: {
    [theme.breakpoints.up('md')]: {
      '&.MuiGrid-grid-md-6': {
        flexGrow: 0,
        maxWidth: '45%',
        flexBasis: '45%',
      },
    },
    [theme.breakpoints.only('sm')]: {
      '&.MuiGrid-grid-sm-8': {
        flexGrow: 0,
        maxWidth: '70%',
        flexBasis: '70%',
      },
    },
    [theme.breakpoints.only('xs')]: {
      '&.MuiGrid-grid-xs-11': {
        flexGrow: 0,
        maxWidth: '100%',
        flexBasis: '100%',
      },
    },
  },
  fib_answer: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: '66.666667%',
      '&.MuiGrid-grid-md-6': {
        flexGrow: 0,
        maxWidth: '47.5%',
        flexBasis: '47.5%',
      },
    },
    [theme.breakpoints.only('sm')]: {
      '&.MuiGrid-grid-sm-8': {
        flexGrow: 0,
        maxWidth: '80%',
        flexBasis: '80%',
      },
    },
    [theme.breakpoints.only('xs')]: {
      maxWidth: '100%',
      '&.MuiGrid-grid-xs-11': {
        flexGrow: 0,
        maxWidth: '78%',
        flexBasis: '78%',
      },
    },
  },
  tolerance_container: {
    [theme.breakpoints.between('xs', 'sm')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.only('sm')]: {
      paddingLeft: 3,
    },
  },
  add_btn: {
    '&.MuiGrid-grid-xs-1': {
      flexGrow: 0,
      maxWidth: 15,
      flexBasis: 15,
    },
    cursor: 'pointer',

    '&.disabled': {
      cursor: 'url(/block.png) 18 18, auto',
    },
  },
  add_btn_icon: {
    width: 19,
    height: 19,
    border: '1px solid #CCCCCC',
    padding: 4,
    margin: '4px 8px',
    borderRadius: 2,
    background: 'white',
    '&.disabled': {
      background: '#fafafa',
      border: '1px solid #e0e0e0',
      fill: '#d4d4d4',
    },
    [theme.breakpoints.only('sm')]: {
      margin: 2,
    },
    [theme.breakpoints.only('xs')]: {
      margin: '2px 0 2px 1px',
    },
  },
  minus_icon: {
    '&:hover': {
      color: 'red',
    },
    '&.disabled': {
      background: '#fafafa',
      border: '1px solid #e0e0e0',
      fill: '#d4d4d4',
      cursor: 'url(/block.png) 18 18, auto',
    },
  },
  answer_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  answer: {
    width: '77%',
    padding: 10,

    [theme.breakpoints.between('xs', 'sm')]: {
      width: '66.67%', // remove?
      padding: 4,
    },
    [theme.breakpoints.only('sm')]: {
      width: '77%',
    },
    [theme.breakpoints.only('xs')]: {
      width: '79%',
    },

    '&.multiple': {
      padding: '4px 10px 4px 10px',
      [theme.breakpoints.between('xs', 'sm')]: {
        padding: 4,
      },
    },
  },
  or_wrapper: {
    display: 'flex',
    width: '100%',
  },
  or: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3px 0px',
    color: 'rgb(74, 74, 74)',

    '&.answer': {
      width: '77%',
      paddingLeft: theme.spacing(2),
      justifyContent: 'flex-start',

      [theme.breakpoints.only('xs')]: {
        width: '79%',
      },
    },
    '&.mark': {
      width: '23%',
      '&.isAddRow': {
        borderLeft: '1px solid #9e9e9e',
      },
      borderLeft: '1px solid #d4d4d4',

      [theme.breakpoints.only('xs')]: {
        width: '21%',
      },
    },
  },
  answers_mark: {
    width: '23%',
    marginLeft: '77%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeft: '1px solid #d4d4d4',
    fontSize: 14,

    '&.isAddRow': {
      borderLeft: '1px solid #9e9e9e',
    },

    [theme.breakpoints.only('xs')]: {
      fontSize: 12,
      width: '21%',
      marginLeft: '79%',
      textAlign: 'center',
    },
  },
  numeric_answer: {
    [theme.breakpoints.only('sm')]: {
      '&.MuiGrid-grid-sm-10': {
        maxWidth: '76%',
        flexBasis: '76%',
        margin: '2px 0',
      },
    },
    '&.MuiGrid-grid-xs-8': {
      maxWidth: '60%',
      flexBasis: '60%',
      flexGrow: 0,
    },
    '&.MuiGrid-grid-xs-12': {
      '@media (max-width: 370px) and (orientation: portrait)': {
        maxWidth: '60%',
        flexBasis: '60%',
        flexGrow: 0,
      },
    },
  },
  mf_answer: {
    [theme.breakpoints.only('sm')]: {
      '&.MuiGrid-grid-sm-10': {
        '&.mathWithSetting': {
          maxWidth: '65%',
          flexBasis: '65%',
          margin: '3px 3px 3px 0',
        },
      },
    },
    [theme.breakpoints.only('xs')]: {
      '&.MuiGrid-grid-xs-12': {
        maxWidth: '88%',
        flexBasis: '88%',
      },
    },
  },
});
