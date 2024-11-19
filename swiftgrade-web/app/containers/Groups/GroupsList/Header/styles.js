export const styles = theme => ({
  header: {
    background: 'white',
    position: 'relative',
    height: theme.spacing(7.5),
  },
  header_container: {
    '&.MuiGrid-container': {
      width: '100%',
      height: '100%',
      display: 'flex',
      padding: '0px 20px 0px 16px',
      [theme.breakpoints.down('xs')]: {
        paddingRight: 0,
      },
    },
  },
  header_title: {
    fontSize: 20,
    alignItems: 'flex-end',
    display: 'flex',
    height: '80%',
    justifyContent: 'flex-start',
  },
  header_title_text: {
    marginLeft: 10,
    marginTop: 11,
    fontSize: 20,
    fontFamily: 'Gordita',
    '@media (max-width: 333px)': {
      fontSize: 18,
      marginLeft: 8,
    },
  },
  header_icons: {
    alignItems: 'flex-end',
    display: 'flex',
    height: '80%',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  header_item_left: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    '& div:first-child': {
      padding: '3px 5px',
      '&:hover': {
        backgroundColor: 'rgb(239, 239, 239)',
        borderRadius: '50%',
      },
    },
  },
  header_item_rigth: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
  },
  home_icon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    cursor: 'pointer',

    '&.iOS': {
      marginBottom: 4,
    },
  },
  plus_icon: {
    color: 'black',
    fontSize: 32,
  },
  player_icon: {
    color: 'black',
    width: 27,
    height: 23,
    fontSize: 32,
  },
  logo: {
    height: theme.spacing(8),
    margin: '6px 0px 10px 0px',
  },
  generate_sheet_icon: {
    color: 'black',
    width: 32,
    height: 32,
    padding: '3px',
  },
  join_class_btn: {
    background: 'black',
    borderRadius: 20,
    color: 'white',
    margin: `0 ${theme.spacing(2.5)}px`,
    padding: `${theme.spacing(0.75)}px ${theme.spacing(1.5)}px`,
    lineHeight: 'inherit',
    [theme.breakpoints.only('xs')]: {
      margin: `0 ${theme.spacing(0.625)}px`,
      height: 33,
      '@media (max-width: 369px)': {
        margin: 0,
      },
      '@media (max-width: 349px)': {
        lineHeight: '15px',
        textAlign: 'left',
        width: '85px',
      },
    },
    '&:hover': {
      background: 'black',
      opacity: 0.8,
    },
  },
  add_start_icon: {
    marginRight: 4,
  },
  loading: {
    paddingTop: 15,
  },
  loading_container: {
    textAlign: 'center',
  },
  download_container: {
    textAlign: 'center',
    margin: '0 3px',
  },
  generate_mc_title: {
    fontSize: 12,
    width: 63,
    '&.readyForDownload': {
      marginTop: -9,
    },
  },
  ready_for_download_icon: {
    width: 24,
    height: 24,
  },
  add_new_class_note_container: {
    position: 'absolute',
    marginRight: '14rem',
    marginTop: '1rem',
  },
  add_new_class_note_text: {
    position: 'absolute',
    bottom: '-60px',
    left: '-110px',
    width: 'max-content',
    [theme.breakpoints.only('xs')]: {
      bottom: '-71px',
      left: '-78px',
    },
    '@media (max-width: 380px)': {
      left: '58px',
    },
  },
  add_new_class_note_arrow: {
    position: 'relative',
    top: '90px',
    right: '-73px',
    width: '80px',
    height: '140px',
    [theme.breakpoints.only('xs')]: {
      top: 75,
      right: -93,
      width: 70,
      height: 100,
    },
  },
  plus: {
    display: 'flex',
    alignItems: 'center',
  },
  plus_icon_container: {
    [theme.breakpoints.down('xs')]: {
      margin: '0 5px 0 10px',
    },
    width: '2.8rem',
    height: '2.8rem',
  },
  pulse: {
    borderRadius: '50%',
    animation: 'pulse 1.7s infinite',
    '&:hover': {
      animation: 'none',
    },
  },
  player_icon_container: {
    [theme.breakpoints.down('xs')]: {
      margin: '0 5px 0 10px',
    },
    width: '2.6rem',
    height: '2.6rem',
  },
  tooltip: {
    background: 'rgba(80, 80, 80, 0.98)',
    opacity: 0.5,
    borderRadius: '4px',
    fontSize: 11,
    fontWeight: 300,
    width: '100%',
    textAlign: 'center',
  },
  arrow: {
    color: 'rgba(80, 80, 80, 0.98)',
  },
  add_class: {
    width: '120px',
  },
  create_btn: {
    animation: 'pulse 1.3s infinite',
    '&:hover': {
      animation: 'none',
    },
  },
  print_mc_answer_sheet_modal: {
    display: 'block',
  },
  okay_btn_container: {
    marginTop: 20,
    textAlign: 'end',
  },
  okay_button: {
    borderRadius: 4,
    color: '#3367d6',

    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: 'max-content',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },

    '&.Mui-disabled': {
      backgroundColor: 'transparent',
    },
    '&.MuiButton-root:hover': {
      textDecoration: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
});
