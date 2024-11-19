export const styles = theme => ({
  header: {
    background: 'transparent',
    position: 'relative',
    height: theme.spacing(7.5),
    '&.isMobilePortrait': {
      height: theme.spacing(12.5),
      position: 'fixed',
      background: '#fff',
    },
  },
  header_container: {
    '&.MuiGrid-container': {
      width: '100%',
      height: '100%',
      display: 'flex',
      padding: '0 34px 0 16px',
      '&.isMobilePortrait': {
        padding: '0 6px 0 16px',
        height: 40,
      },
    },
  },
  header_title: {
    [theme.breakpoints.only('xs')]: {
      fontSize: 16,
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  header_title_text: {
    fontSize: 18,
    fontWeight: 300,
    marginLeft: 0,
    marginTop: 18,
    color: '#231f20',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: theme.spacing(16.25),
    paddingBottom: 2,

    '&.iOS': {
      marginTop: 15,
    },

    [theme.breakpoints.only('sm')]: {
      width: theme.spacing(15),
    },
  },
  header_tabs: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '85%',
    '& a:hover': {
      backgroundColor: 'rgba(0,0,0, 0.06)',
      borderRadius: '4px',
    },
    '& button:hover': {
      backgroundColor: 'rgba(0,0,0, 0.06)',
      borderRadius: '4px',
    },
    '&.isMobilePortrait': {
      height: 50,
    },
  },
  home_icon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    cursor: 'pointer',

    '&.iOS': {
      marginBottom: 4,
    },
  },
  account_icon_wrapper: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-end',
  },
  account_icon: {
    width: theme.spacing(3.2),
    height: theme.spacing(3.2),
  },
  group_select_input: {
    fontSize: 17,
    paddingRight: 22,
    [theme.breakpoints.only('xs')]: {
      paddingRight: 25,
    },
  },
  mobile_header_wrapper: {
    display: 'block',
    paddingTop: '10px',
  },
  tabs_fixed: {
    fontSize: 15,
    height: 40,
  },
  tooltip: {
    borderRadius: '4px',
    fontSize: 11,
    fontWeight: 300,
    textAlign: 'center',
  },
  arrow: {
    color: 'rgba(80, 80, 80, 0.98)',
  },
});
