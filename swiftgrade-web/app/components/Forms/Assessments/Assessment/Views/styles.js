export const styles = theme => ({
  multiple_select_value: {
    fontSize: 13,
    margin: '0px -10px',
  },
  rows_content: {
    width: 'calc(100vw - 60px)',
    minHeight: 'calc(100vh - 334px)',
    margin: `${theme.spacing(1.9)}px ${theme.spacing(3.5)}px`,
    '&.itemsExist': {
      marginTop: 0,
    },
    '&.isMC': {
      minHeight: 'calc(100vh - 274px)',
    },
    [theme.breakpoints.only('sm')]: {
      width: 'calc(100vw - 16px)',
      margin: `${theme.spacing(2)}px auto`,
      '&.itemsExist': {
        marginTop: 0,
      },
    },
    [theme.breakpoints.only('xs')]: {
      width: 'calc(100vw - 10px)',
      margin: '10px auto',
      minHeight: 'calc(100vh - 240px)',
    },
  },
  add_row_wrapper: {
    width: '100vw',
    [theme.breakpoints.between('xs', 'sm')]: {
      left: theme.spacing(1),
      right: theme.spacing(1),
    },
    position: 'relative',
    padding: `0px ${theme.spacing(3.5)}px`,

    [theme.breakpoints.between('xs', 'sm')]: {
      left: 0,
      right: 0,
    },
    [theme.breakpoints.only('sm')]: {
      padding: `0px ${theme.spacing(1)}px`,
    },
    [theme.breakpoints.only('xs')]: {
      padding: '0 5px',
    },
    marginBottom: 120,
    '&.itemsExist': {
      marginBottom: 0,
    },
    '&.isMobileWithoutItems': {
      marginBottom: 175,
    },
  },
  add_row: {
    background: '#e0e0e0',
    border: '1px solid #424242',
    outline: 'none !important',
    minHeight: 60,
  },
  assessment_item: {
    background: '#fafafa',
    border: '1px solid #d4d4d4',
    borderBottom: 'none',
    minHeight: 60,

    '&.lastItem': {
      borderBottom: '1px solid #d4d4d4',
    },
  },
  assessment_items_title: {
    background: '#fafafa',
    marginTop: theme.spacing(4),
    border: '1px solid #d4d4d4',
    fontWeight: 'bold',
    height: 40,
    borderBottom: 'none',
    [theme.breakpoints.only('xs')]: {
      '@media (orientation: portrait)': {
        marginTop: 18,
      },
    },
  },
  assessment_item_content: {
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
      '@media (max-width: 355px) and (orientation: portrait)': {
        fontSize: 10,
      },
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRight: '1px solid #d4d4d4',

    '&:last-child': {
      borderRight: 'none',
    },

    '&.answer': {
      padding: 0,
    },
  },
  add_row_content: {
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRight: '1px solid #9e9e9e',

    '&:last-child': {
      borderRight: 'none',
    },

    '&.answer': {
      padding: 0,
    },
  },
  assessment_item_add: {
    [theme.breakpoints.up('md')]: {
      '&.MuiGrid-grid-xs-1': {
        flexGrow: 0,
        maxWidth: '4.0211%',
        flexBasis: '4.0211%',
      },
    },
    color: 'white',
    backgroundColor: '#595959',
    fontSize: 18,
    fontWeight: 300,

    '@media (max-width: 1000px)': {
      fontSize: 16,
    },
    '&.multiple': {
      alignItems: 'flex-start',
      paddingTop: theme.spacing(1.625),
    },
    '&.multiple_with_setting': {
      alignItems: 'flex-start',
      paddingTop: theme.spacing(3.375),
    },
    [theme.breakpoints.only('xs')]: {
      fontSize: 11,
      '&.MuiGrid-grid-xs-1': {
        flexGrow: 0,
        maxWidth: '7.7%',
        flexBasis: '7.7%',
      },
      '@media (max-width: 355px) and (orientation: portrait)': {
        fontSize: 9,
      },
    },
    [theme.breakpoints.only('sm')]: {
      fontSize: 14,
      maxWidth: '6%',
      flexBasis: '6%',
    },
  },
  assessment_item_index: {
    fontSize: 18,
    '&.multiple': {
      alignItems: 'flex-start',
      paddingTop: theme.spacing(1.625),
    },
    '&.multiple_with_setting': {
      alignItems: 'flex-start',
      paddingTop: theme.spacing(3.375),
    },
    [theme.breakpoints.up('md')]: {
      '&.MuiGrid-grid-xs-1': {
        flexGrow: 0,
        maxWidth: '4.0211%',
        flexBasis: '4.0211%',
      },
    },
    [theme.breakpoints.only('sm')]: {
      maxWidth: '6%',
      flexBasis: '6%',
    },
    [theme.breakpoints.only('xs')]: {
      fontSize: 13,
      '&.MuiGrid-grid-xs-1': {
        flexGrow: 0,
        maxWidth: '7.7%',
        flexBasis: '7.7%',
      },
      '@media (max-width: 355px) and (orientation: portrait)': {
        fontSize: 10,
      },
    },
  },
  assessment_item_type: {
    maxWidth: '13.25972%',
    flexBasis: '13.25972%',
    '&.fib': {
      background: '#29b6f6',
    },
    '&.numeric': {
      background: '#ff924a',
    },
    '&.mc': {
      background: '#78d56c',
    },
    '&.mf': {
      background: '#F2575F',
    },
    '&.multiple': {
      alignItems: 'flex-start',
      paddingTop: theme.spacing(0.625),
    },
    '&.multiple_with_setting': {
      alignItems: 'flex-start',
      paddingTop: theme.spacing(2.5),
    },
    [theme.breakpoints.only('xs')]: {
      maxWidth: '10%',
      flexBasis: '10%',
    },
    [theme.breakpoints.only('sm')]: {
      maxWidth: '8%',
      flexBasis: '8%',
    },
  },
  assessment_item_answer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('md')]: {
      '&.MuiGrid-grid-md-5': {
        flexGrow: 0,
        maxWidth: '64%',
        flexBasis: '64%',
      },
    },

    [theme.breakpoints.between('xs', 'sm')]: {
      paddingLeft: 3,
    },
    [theme.breakpoints.only('sm')]: {
      maxWidth: '64%',
      flexBasis: '64%',
    },
    [theme.breakpoints.only('xs')]: {
      '&.MuiGrid-grid-xs-6': {
        maxWidth: '62.3%',
        flexBasis: '62.3%',
      },
    },
  },
  assessment_item_setting: {
    '&.multiple': {
      alignItems: 'flex-start',
      paddingTop: theme.spacing(1.875),
    },
    '&.multiple_with_setting': {
      alignItems: 'flex-start',
      paddingTop: 29,
    },
    [theme.breakpoints.up('md')]: {
      '&.MuiGrid-grid-md-2': {
        flexGrow: 0,
        maxWidth: '11.461%',
        flexBasis: '11.461%',
      },
    },
    [theme.breakpoints.only('sm')]: {
      '&.MuiGrid-grid-xs-2': {
        maxWidth: '14%',
        flexBasis: '14%',
      },
    },
    [theme.breakpoints.only('xs')]: {
      '&.MuiGrid-grid-xs-2': {
        maxWidth: '10%',
        flexBasis: '10%',
      },
      '&.multiple_with_setting': {
        paddingTop: 19,
      },
      '&.multiple': {
        paddingTop: 5,
      },
    },
  },
  assessment_item_content_height: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  assessment_item_action: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '8%',
      flexBasis: '8%',
    },
    [theme.breakpoints.only('xs')]: {
      maxWidth: '10%',
      flexBasis: '10%',
    },
    margin: 'auto',
    maxWidth: '7.1%',
    flexBasis: '7.1%',
    '&.multiple': {
      marginTop: theme.spacing(1.875),
    },
    '&.multiple_with_setting': {
      marginTop: theme.spacing(3.5),
    },
  },
  assessment_item_action_button: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    marginLeft: -1,

    '&.disabled': {
      cursor: 'url(/block.png) 18 18, not-allowed',
    },

    '&:hover': {
      '& div': {
        [theme.breakpoints.between('sm', 'md')]: {
          width: 30,
          height: 30,
        },

        [theme.breakpoints.only('xs')]: {
          width: 25,
          height: 25,
          top: -6,
        },
        position: 'absolute',
        top: -8,
        border: '1px solid #efefef',
        width: 35,
        height: 35,
        borderRadius: '50%',
        background: '#efefef',
        zIndex: -1,
      },
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      margin: '7px 0',
    },
  },
  action_buttons: {
    '@media (max-width: 600px)': {
      padding: '1em',
      margin: '-1em',
    },
  },
  assessment_item_action_select: {
    width: '75%',
    [theme.breakpoints.only('sm')]: {
      margin: 'auto',
    },
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  assessment_item_action_minus_btn: {
    width: 15,
    height: 15,

    '&:hover': {
      color: 'red',
    },
  },
  active_row_buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.between('xs', 'sm')]: {
      flexDirection: 'column',
    },
  },
  option: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer',
    outline: 'none !important',
    zIndex: 1,

    '&.disabled': {
      cursor: 'url(/block.png) 18 18, not-allowed',
      opacity: 1,
      color: '#aaaaaa',
      '&.active': {
        color: '#c2e9f1',
      },
    },
    '&.disabled:active': {
      pointerEvents: 'none',
    },

    '&:hover': {
      '& div': {
        position: 'absolute',
        top: -8,
        left: -7,
        border: '1px solid #efefef',
        width: 35,
        height: 35,
        borderRadius: '50%',
        background: '#efefef',
        zIndex: -1,

        '&.unit': {
          left: -12,
        },

        '&.significant_figure': {
          left: -8,
        },

        [theme.breakpoints.between('sm', 'md')]: {
          width: 30,
          height: 30,
          left: -6,

          '&.unit': {
            left: -10,
          },

          '&.significant_figure': {
            left: -7,
          },
        },

        [theme.breakpoints.only('xs')]: {
          width: 20,
          height: 20,
          top: -3,
          left: 6,

          '&.unit': {
            left: 6,
          },

          '&.significant_figure': {
            left: 6,
          },
        },
      },
    },
  },
  active_option: {
    fontWeight: 'bold',
    color: '#2196f3',
  },
  add_multiple_rows_options: {
    padding: 0,
    [theme.breakpoints.only('sm')]: {
      fontSize: 11,
      lineHeight: '23px',
    },
    [theme.breakpoints.only('xs')]: {
      fontSize: 10,
      lineHeight: '30px',
      minHeight: '30px',
    },
  },
  no_content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto Light',
    color: '#C3C3C4',
    fontWeight: 300,
    userSelect: 'none',
    height: 'calc(100vh - 280px)',
    minHeight: 250,
    [theme.breakpoints.only('xs')]: {
      height: 'calc(100vh - 338px)',
      margin: 'auto',
      // '&.isVirtualKeyboardOpened': {
      //   height: 'calc(100vh - 338px)',
      // },
    },
    '@media (max-height: 500px) and (orientation: landscape)': {
      display: 'block',
      textAlign: 'center',
    },
  },
  no_content_image: {
    width: theme.spacing(54),
    height: theme.spacing(18.5),
    userSelect: 'none',
    [theme.breakpoints.only('xs')]: {
      width: '90vw',
    },
  },
  settings_container: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: '100%',
      maxHeight: '50px',
      '&.numeric': {
        maxHeight: '150px',
      },
    },
  },
  popper_select: {
    zIndex: 2,
    '& .MuiAutocomplete-option': {
      minHeight: 'auto',
      paddingLeft: 10,
      paddingRight: 10,
    },

    '@media (max-width: 1180px)': {
      minWidth: 140,
    },
  },
  assessment_item_type_input: {
    paddingLeft: 10,
  },
  action_icon: {
    width: 15,
    height: 15,
    [theme.breakpoints.only('xs')]: {
      width: 12,
      height: 12,
    },
  },
  assessment_item_answer_title: {
    textAlign: 'center',
    width: '77%',
    [theme.breakpoints.only('sm')]: {
      width: '77%',
    },
    [theme.breakpoints.only('xs')]: {
      width: '79%',
    },
  },
  assessment_item_marks_title: {
    alignItems: 'center',
    borderLeft: '1px solid #d4d4d4',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '23%',
    [theme.breakpoints.only('sm')]: {
      width: '23%',
    },
    [theme.breakpoints.only('xs')]: {
      width: '21%',
    },
  },
  paper: {
    [theme.breakpoints.only('xs')]: {
      width: 36,
      marginLeft: -3,
      '@media (max-width: 350px) and (orientation: portrait)': {
        marginLeft: -6,
      },
    },
  },
  info_icon_wrapper: {
    display: 'flex',
    [theme.breakpoints.only('xs')]: {
      display: 'block',
      textAlign: 'center',
    },
    '@media (max-height: 500px) and (orientation: landscape)': {
      justifyContent: 'center',
    },
  },
  answers: {
    textDecoration: 'underline',
  },
});
